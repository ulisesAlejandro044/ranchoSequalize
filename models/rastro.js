const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Rastro = sequelize.define('Rastro', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATEONLY, // Usamos DATEONLY para solo la fecha
      allowNull: false
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING, // Por ejemplo: 'PENDIENTE', 'ENVIADO', 'COMPLETADO'
      allowNull: false
    },
    ganado_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'rastros', // Nombre de la tabla en tu BD existente
    timestamps: false // Desactiva los campos 'createdAt' y 'updatedAt'
  });

return Rastro;
};