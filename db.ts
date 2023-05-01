import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  password: 'meutel8414',
  host: 'localhost',
  port: 5432,
  database: 'turma',
});