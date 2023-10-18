const { Sequelize, DataTypes } = require('sequelize');

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
});

// Definindo o modelo
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Sincronizando o modelo com o banco de dados
sequelize.sync();

module.exports = { User, sequelize };