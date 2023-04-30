"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turma = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
class Turma extends sequelize_1.Model {
}
exports.Turma = Turma;
Turma.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    semestre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ano: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'turmas',
    timestamps: false,
});
