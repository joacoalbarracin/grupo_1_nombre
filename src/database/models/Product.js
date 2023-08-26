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
      
      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      },
      deleted_at: {
        type: DataTypes.DATE
      }
    }
    const config = {
        tableName : "products",
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'

    }
    // Definir la relación con la tabla 'user_category'
   

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
      Product.belongsTo(models.ProductCategory, {
        as: 'product_categories',
        foreignKey: 'productCategory'
      });
    
      Product.belongsTo(models.Purchase, {
        as: 'products_purchases',
        foreignKey: 'productId'
      });

      Product.belongsTo(models.Image, {
        as: 'products_images',
        foreignKey: 'imagesId'
      });

    
  
    }
    return Product;
}