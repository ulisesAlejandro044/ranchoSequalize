const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Ganado = sequelize.define('Ganado', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    proveedor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    peso: {
      type: DataTypes.DECIMAL(10, 2), // Usamos DECIMAL para pesos
      allowNull: false
    },
    origen: {
      type: DataTypes.STRING
    },
    altura: {
      type: DataTypes.DECIMAL(10, 2)
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING // Guarda la ruta del archivo de la imagen
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    raza_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    corral_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'ganados', // Nombre de la tabla en tu BD existente
    timestamps: false // Desactiva los campos 'createdAt' y 'updatedAt'
  });

// Nota: Aquí se definirían las asociaciones si tuviéramos los otros modelos listos
// Ganado.belongsTo(db.Raza, { foreignKey: 'raza_id' }); 
// etc.

return Ganado;
};