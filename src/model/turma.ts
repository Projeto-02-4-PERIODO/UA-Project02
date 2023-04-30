import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export interface TurmaAttributes {
  id?: number;
  semestre: string;
  ano: number;
}

export class Turma extends Model<TurmaAttributes> implements TurmaAttributes {
  public id!: number;
  public semestre!: string;
  public ano!: number;

}

Turma.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    semestre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'turmas',
    timestamps: false,
  }
);
