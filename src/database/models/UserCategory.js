module.exports = (sequelize, DataTypes) => {
    const alias = "UserCategory";
    const cols =  {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
          },
          category: {
            type: DataTypes.STRING(50),
            allowNull: false,
          },
    }
    const config = {
        tableName : "user_category",
        timestamps: false
    }
    // Definir la relación con la tabla 'user_category'
    //user.belongsTo(UserCategory, { foreignKey: 'userCategoryId', as: 'category' });

    const UserCategory = sequelize.define(alias, cols, config);

    UserCategory.associate = (models) => {
      UserCategory.hasMany (models.User, {
        as: 'users',
        foreignKey: 'userCategoryId'
      })
    }


    return userCategory;
}