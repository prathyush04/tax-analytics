import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from './db/db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const properties = JSON.parse(readFileSync(join(__dirname, 'data/properties.json'), 'utf-8'));

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const p of properties) {
      await client.query(
        `INSERT INTO properties (
          property_id, tenant, owner_name, property_type, ward,
          area_sqft, status, annual_tax_inr, collection_inr,
          registration_date, floor_count, address
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        ON CONFLICT (property_id) DO NOTHING`,
        [
          p.property_id, p.tenant, p.owner_name, p.property_type, p.ward,
          p.area_sqft, p.status, p.annual_tax_inr, p.collection_inr,
          p.registration_date, p.floor_count, p.address
        ]
      );
    }
    await client.query('COMMIT');
    console.log(`Seeded ${properties.length} records successfully.`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
