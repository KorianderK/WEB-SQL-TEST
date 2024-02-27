// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Strix777@',
  port: 5432, // default PostgreSQL port
});

app.get('/api/car/:purchase_id', async (req, res) => {
  const { purchase_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM cars WHERE purchase_id = $1', [purchase_id]);
    const car = result.rows[0];
    res.json(car);
  } catch (error) {
    console.error('Error fetching car information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
