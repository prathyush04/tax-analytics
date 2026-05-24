import express from 'express';
import axios from 'axios';
import properties from '../data/properties.json' with { type: 'json' };

const router = express.Router();
const useDB = process.env.USE_DB === 'true';

let db;
if (useDB) {
  const { default: pool } = await import('../db/db.js');
  db = pool;
}

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    let collectionSummary;

    if (useDB) {
      const result = await db.query(`
        SELECT tenant, SUM(collection_inr) AS total_collection
        FROM properties
        GROUP BY tenant
        ORDER BY total_collection DESC
      `);
      collectionSummary = result.rows
        .map(r => `${r.tenant}: ₹${r.total_collection}`)
        .join('\n');
    } else {
      const map = {};
      for (const p of properties) {
        map[p.tenant] = (map[p.tenant] || 0) + p.collection_inr;
      }
      collectionSummary = Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .map(([tenant, total]) => `${tenant}: ₹${total.toFixed(2)}`)
        .join('\n');
    }

    const prompt = `
You are a property tax analytics assistant.

Dataset summary:
${collectionSummary}

Answer the user's question ONLY using the dataset provided above.

User question:
${message}
`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful property tax analytics assistant.' },
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });

  } catch (error) {
    console.error('OpenRouter Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

export default router;
