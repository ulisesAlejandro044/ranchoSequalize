const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Leche = sequelize.define('Leche', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    densidad: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    tanque_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ganado_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'leches', // Nombre de la tabla en tu BD existente
    timestamps: false // Desactiva los campos 'createdAt' y 'updatedAt'
  });

return Leche;
};