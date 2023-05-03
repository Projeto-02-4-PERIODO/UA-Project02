import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

export interface TurmaAttributes {
  id?: number;
  semestre: number;
  ano: number;
}

export class Turma extends Model<TurmaAttributes> implements TurmaAttributes {
  public id!: number;
  public semestre!: number;
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'turma',
    timestamps: false,
  }
);
