const Sequelize = require('sequelize');
const db = require('../config/database');

const Game = db.define('games', {
    label: {
        type: Sequelize.STRING,
        allowNull: false
    },
    white: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    black: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    komi: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    size: {
        type: Sequelize.ENUM,
        values: ['9x9', '13x13', '19x19']
    },
    rules: {
        type: Sequelize.ENUM,
        values: ['japanese', 'chinese']
    }
}, {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'games'
});

module.exports = Game;