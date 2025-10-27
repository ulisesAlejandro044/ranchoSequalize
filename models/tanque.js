const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tanque = sequelize.define('Tanque', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    capacidad: {
      type: DataTypes.DECIMAL(10, 2), // Capacidad total en litros/galones
      allowNull: false
    },
    temperatura: {
      type: DataTypes.DECIMAL(5, 2) // Temperatura actual
    },
    estado: {
      type: DataTypes.STRING, // Por ejemplo: 'ACTIVO', 'INACTIVO', 'LLENO', 'VACIO'
      allowNull: false
    },
    leche_id: {
      type: DataTypes.INTEGER,
      allowNull: true // Puede que un tanque inactivo no tenga leche_id
    }
  }, {
    tableName: 'tanques', // Nombre de la tabla en tu BD existente
    timestamps: false // Desactiva los campos 'createdAt' y 'updatedAt'
  });

return Tanque;
};