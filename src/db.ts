import { Pool } from 'pg';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('project2', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
});

export const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  port: 5432,
  database: 'project2',
});