module.exports = (sequelize, DataTypes) => {
    const alias = "Image";
    const cols =  {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          extension: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          title: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
    }
    const config = {
        tableName : "images",
        timestamps: false
    }
    // Definir la relación con la tabla 'user_category'
    //user.belongsTo(UserCategory, { foreignKey: 'userCategoryId', as: 'category' });

    const image = sequelize.define(alias, cols, config);
    return image;
}