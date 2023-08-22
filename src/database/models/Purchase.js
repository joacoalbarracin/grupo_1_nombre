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
          userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
          },
          productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
          },
    }
    const config = {
        tableName : "purchases",
        timestamps: false
    }
    // Definir la relación con la tabla 'user_category'
    //user.belongsTo(UserCategory, { foreignKey: 'userCategoryId', as: 'category' });

    const Purchase = sequelize.define(alias, cols, config);

    Purchase.associate = (models) => {
      Product.belongsTo (models.User, {
        as: 'purchases',
        foreignKey: 'UserId'
      })
    }

    Purchase.associate = (models) => {
      Product.belongsTo (models.Product, {
        as: 'purchases_products',
        foreignKey: 'productId'
      })
    }

    return purchase;
}