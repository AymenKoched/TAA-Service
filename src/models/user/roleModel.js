import { sequelize } from "@/utils";

const { DataTypes, Model } = require("sequelize");

class Role extends Model {
  static associate(models) {
    this.belongsToMany(models.User, {
      through: "UserRoles",
      as: "users",
      foreignKey: "roleId"
    });
  }
}

Role.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    modelName: "Roles",
    timestamps: true
  }
);

// eslint-disable-next-line import/prefer-default-export
export { Role as RoleModel };
