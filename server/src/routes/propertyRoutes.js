import express from 'express';
import properties from '../data/properties.json' with { type: 'json' };

const router = express.Router();
const useDB = process.env.USE_DB === 'true';

let db;
if (useDB) {
  const { default: pool } = await import('../db/db.js');
  db = pool;
}

router.get('/kpis', async (req, res) => {
  const { tenant } = req.query;
  try {
    if (useDB) {
      let query = `
        SELECT
          COUNT(*) AS total_properties,
          COUNT(CASE WHEN status = 'Approved' THEN 1 END) AS approved,
          COUNT(CASE WHEN status = 'Rejected' THEN 1 END) AS rejected,
          COALESCE(SUM(collection_inr), 0) AS total_collection
        FROM properties
      `;
      const values = [];
      if (tenant) { query += ' WHERE tenant = $1'; values.push(tenant); }
      const result = await db.query(query, values);
      return res.json(result.rows[0]);
    }

    const data = tenant ? properties.filter(p => p.tenant === tenant) : properties;
    res.json({
      total_properties: data.length,
      approved: data.filter(p => p.status === 'Approved').length,
      rejected: data.filter(p => p.status === 'Rejected').length,
      total_collection: data.reduce((sum, p) => sum + p.collection_inr, 0).toFixed(2),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch KPIs' });
  }
});

router.get('/collection-by-city', async (req, res) => {
  try {
    if (useDB) {
      const result = await db.query(`
        SELECT tenant, SUM(collection_inr) AS total_collection
        FROM properties
        GROUP BY tenant
        ORDER BY total_collection DESC
      `);
      return res.json(result.rows);
    }

    const map = {};
    for (const p of properties) {
      map[p.tenant] = (map[p.tenant] || 0) + p.collection_inr;
    }
    res.json(
      Object.entries(map)
        .map(([tenant, total_collection]) => ({ tenant, total_collection: +total_collection.toFixed(2) }))
        .sort((a, b) => b.total_collection - a.total_collection)
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch collection by city' });
  }
});

router.get('/status-by-city', async (req, res) => {
  try {
    if (useDB) {
      const result = await db.query(`
        SELECT
          tenant,
          COUNT(CASE WHEN status = 'Approved' THEN 1 END) AS approved,
          COUNT(CASE WHEN status = 'Rejected' THEN 1 END) AS rejected,
          COUNT(CASE WHEN status = 'Pending'  THEN 1 END) AS pending
        FROM properties
        GROUP BY tenant
        ORDER BY tenant
      `);
      return res.json(result.rows);
    }

    const map = {};
    for (const p of properties) {
      if (!map[p.tenant]) map[p.tenant] = { tenant: p.tenant, approved: 0, rejected: 0, pending: 0 };
      if (p.status === 'Approved') map[p.tenant].approved++;
      else if (p.status === 'Rejected') map[p.tenant].rejected++;
      else if (p.status === 'Pending') map[p.tenant].pending++;
    }
    res.json(Object.values(map).sort((a, b) => a.tenant.localeCompare(b.tenant)));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch status by city' });
  }
});

export default router;
