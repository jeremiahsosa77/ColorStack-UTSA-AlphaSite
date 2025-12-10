import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const { Pool } = pg;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false, // For development only
  },
});

// Test database connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// List all databases (for debugging)
app.get('/api/databases', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT datname FROM pg_database 
      WHERE datistemplate = false 
      ORDER BY datname;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching databases:', error);
    res.status(500).json({ error: error.message });
  }
});

// Submit member form
app.post('/api/members', async (req, res) => {
  const { firstName, lastName, email, ulsaId, major, graduationYear } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !ulsaId || !major || !graduationYear) {
    return res.status(400).json({ 
      error: 'All fields are required' 
    });
  }

  // Email format validation (supports @utsa.edu and @my.utsa.edu)
  const emailRegex = /^[^\s@]+@(my\.)?utsa\.edu$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Please use your UTSA email (john.doe@my.utsa.edu or abc123@utsa.edu)' 
    });
  }

  // UTSA ID format validation (abc123)
  const ulsaIdRegex = /^[a-z]{2,3}\d{3,4}$/i;
  if (!ulsaIdRegex.test(ulsaId)) {
    return res.status(400).json({ 
      error: 'Please enter a valid UTSA ID (e.g., abc123)' 
    });
  }

  try {
    // Check for duplicate email or UTSA ID
    const duplicateCheck = await pool.query(
      'SELECT id FROM members WHERE email = $1 OR school_id = $2',
      [email, ulsaId]
    );

    if (duplicateCheck.rows.length > 0) {
      return res.status(409).json({
        error: 'This email or UTSA ID is already registered',
      });
    }

    const query = `
      INSERT INTO members (first_name, last_name, email, school_id, major, grad_year, position, date_joined)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING id, date_joined;
    `;

    const values = [
      firstName, 
      lastName, 
      email, 
      ulsaId,
      major, 
      parseInt(graduationYear), 
      'Member'
    ];
    
    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: 'Member registered successfully!',
      memberId: result.rows[0].id,
      dateJoined: result.rows[0].date_joined,
    });
  } catch (error) {
    console.error('Database error:', error);
    
    res.status(500).json({
      error: 'Failed to register member. Please try again.',
    });
  }
});

// Get all members (for admin/dashboard)
app.get('/api/members', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM members ORDER BY date_joined DESC;');
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
