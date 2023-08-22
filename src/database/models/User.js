module.exports = (sequelize, DataTypes) => {
    const alias = "User";
    const cols =  {
        id: {
            type:DataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        userCategoryId: {
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    }
    const config = {
        tableName : "users",
        timestamps: false
    }
    // Definir la relación con la tabla 'user_category'
    //user.belongsTo(UserCategory, { foreignKey: 'userCategoryId', as: 'category' });

    User.associate = (models) => {
      User.belongsTo (models.UserCategory, {
        as: 'category',
        foreignKey: 'userCategoryId'
      })
    }

    User.associate = (models) => {
        User.hasMany (models.Purchase, {
          as: 'purchases_users',
          foreignKey: 'UserId'
        })
      }

    const user = sequelize.define(alias, cols, config);
    return user;
}