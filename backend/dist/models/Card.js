"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Card = db_1.sequelize.define("Card", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "cards",
    timestamps: false,
});
exports.Card = Card;
