module.exports = (sequelize, DataTypes) => {
    const alias = "ProductCategory";
    const cols =  {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING(50),
            allowNull: false,
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    }
    const config = {
        tableName : "product_categories",
        timestamps: false
    }
    // Definir la relación con la tabla 
 
    const ProductCategory = sequelize.define(alias, cols, config);

    ProductCategory.associate = (models) => {
      ProductCategory.hasMany(models.Product, {
        as: 'products',
        foreignKey: 'productCategory'
      });
  


    }
   

  

    return ProductCategory;
}