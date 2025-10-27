const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Raza = sequelize.define('Raza', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    origen: {
      type: DataTypes.STRING
    },
    descripcion: {
      type: DataTypes.STRING
    },
    estado: {
      type: DataTypes.STRING, // Activo / Inactivo
      allowNull: false
    }
  }, {
    tableName: 'razas', // Nombre de la tabla en tu BD existente
    timestamps: false // Desactiva los campos 'createdAt' y 'updatedAt'
  });

return Raza;
};