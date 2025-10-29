const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cliente = sequelize.define('Cliente', {
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
    telefono: {
      type: DataTypes.STRING
    },
    correo: {
      type: DataTypes.STRING
    },
    rfc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'clientes', // Nombre de la tabla en tu BD existente
    timestamps: false // Desactiva los campos 'createdAt' y 'updatedAt'
  });

return Cliente;
};