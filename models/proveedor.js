const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Proveedor = sequelize.define('Proveedor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING
    },
    categoria: {
      type: DataTypes.STRING // El tipo de proveedor (ej. alimento, ganado, medicina)
    },
    estado: {
      type: DataTypes.STRING, // Activo / Inactivo
      allowNull: false
    }
  }, {
    tableName: 'proveedores', // Nombre de la tabla en tu BD existente
    timestamps: false // Desactiva los campos 'createdAt' y 'updatedAt'
  });

return Proveedor;
};