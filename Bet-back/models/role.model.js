module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        validate: { in: ["ADMIN", "MODERATOR", "USER"] },
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Role;
};
