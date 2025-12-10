import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Connect to default postgres database to list all databases
const defaultPool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: 'postgres', // Connect to default database
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function checkDatabases() {
  try {
    console.log('Connecting to database server...');
    const result = await defaultPool.query(`
      SELECT datname FROM pg_database 
      WHERE datistemplate = false 
      ORDER BY datname;
    `);
    
    console.log('\nAvailable databases:');
    result.rows.forEach(row => {
      console.log(`  - ${row.datname}`);
    });
    
    // Now try to connect to the target database and list tables
    const targetDb = process.env.DB_NAME;
    console.log(`\nTrying to connect to: ${targetDb}`);
    
    const targetPool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: targetDb,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    
    const tablesResult = await targetPool.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);
    
    console.log(`\nTables in ${targetDb}:`);
    tablesResult.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });
    
    await targetPool.end();
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await defaultPool.end();
  }
}

checkDatabases();
