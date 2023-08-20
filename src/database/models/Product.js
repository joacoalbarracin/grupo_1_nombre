module.exports = (sequelize, DataTypes) => {
    const alias = "Product";
    const cols =  {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
          },
          productName: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          productDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          title: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          location: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
          },
          discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
          },
          time: {
            type: DataTypes.TIME,
            allowNull: false,
          },
          maximumCapacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          imagesId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
          },
          productCategory: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
          },
    }
    const config = {
        tableName : "products",
        timestamps: false
    }
    // Definir la relación con la tabla 'user_category'
    //user.belongsTo(UserCategory, { foreignKey: 'userCategoryId', as: 'category' });

    const product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
      product.belongsTo (models.productCategory, {
        as: 'product_categories',
        foreignKey: 'productCategory'
      })
    }

    Product.associate = (models) => {
      product.belongsTo (models.Image, {
        as: 'products',
        foreignKey: 'imagesId'
      })
    }


    return product;
}