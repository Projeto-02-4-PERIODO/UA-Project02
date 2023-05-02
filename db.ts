import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  password: 'pgadmin4',
  host: 'localhost',
  port: 5432,
  database: 'Project2',
});