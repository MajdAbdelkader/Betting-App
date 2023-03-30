module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        isAlphanumeric: true,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING(64),
      },
      role: {
        type: DataTypes.STRING,
        validate: { isIn: ["USER", "ADMIN", "MODERATOR"] },
      },
    },
    {
      freezeTableName: true,
    }
  );

  return User;
};
