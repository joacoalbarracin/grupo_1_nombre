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
        
    }
    
    const config = {
        tableName : "users",
        timestamps: false,
    

    }
    
    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
      User.belongsTo(models.UserCategory, {
        as: 'category',
        foreignKey: 'userCategoryId'
      });

      User.hasMany(models.Purchase, {
        as: 'purchases',
        foreignKey: 'userId'
      });
    }

    return User;
}