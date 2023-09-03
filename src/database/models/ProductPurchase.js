module.exports = (sequelize, DataTypes) => {
    const alias = "ProductPurchase";
    const cols =  {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
          },
          product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: false,
            allowNull: false,
          },
          purchase_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: false,
            allowNull: false,
          },
          purchase_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: false,
            allowNull: false,
          },
          precio: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
    }
    const config = {
        tableName : "products_purchases",
        timestamps: false
    }
    
 
    const ProductPurchase = sequelize.define(alias, cols, config);
    return ProductPurchase;
}