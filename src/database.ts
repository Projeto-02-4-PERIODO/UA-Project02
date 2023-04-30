import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('Turma', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
});
