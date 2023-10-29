const {Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../conn/conn')

const Lschema = sequelize.define('Datalist', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    listitem: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
    },
});




module.exports = Lschema;