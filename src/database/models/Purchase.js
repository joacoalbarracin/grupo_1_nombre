module.exports = (sequelize, DataTypes) => {
  const alias = "Purchase";
  const cols =  {
      id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        address: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        deliveryDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        totalPrice: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        unitQuantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        
  }
  const config = {
      tableName: "purchases",
      timestamps: false
  }
  
  const Purchase = sequelize.define(alias, cols, config);

  Purchase.associate = (models) => {
    Purchase.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });

    Purchase.hasMany(models.Product, {
      as: 'product',
      foreignKey: 'productId'
    });
  }

  return Purchase;
}