// models/categoria.js

const { DataTypes } = require('sequelize'); 

module.exports = (sequelize) => {
  const Categoria = sequelize.define('Categoria', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'categorias', // Especifica el nombre de tu tabla
    timestamps: false // Si no tienes campos `createdAt` y `updatedAt`
  });

return Categoria;
};