module.exports = (sequelize, DataTypes) => {
  const alias = "UserCategory";
  const cols =  {
      id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
      },
      category: {
          type: DataTypes.STRING(255),
          allowNull: false,
      },
  }
  const config = {
      tableName : "user_category",
      timestamps: false
  }

  const UserCategory = sequelize.define(alias, cols, config);

  UserCategory.associate = (models) => {
    UserCategory.hasMany(models.User, {
      as: 'user',
      foreignKey: 'userCategoryId'
    });
  }

  return UserCategory;
}