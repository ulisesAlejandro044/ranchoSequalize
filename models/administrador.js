const { DataTypes } = require('sequelize'); 

module.exports = (sequelize) => {
  const Administrador = sequelize.define('Administrador', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rfc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nss: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING // Guarda la ruta del archivo de la imagen
    },
    rol : {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    tableName: 'administradores', // Especifica el nombre de tu tabla
    timestamps: false // Si no tienes campos `createdAt` y `updatedAt`
  });

return Administrador;
};