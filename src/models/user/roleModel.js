import { sequelize } from "@/utils";

const { DataTypes, Model } = require("sequelize");

const ALLOWED_ROLES = Object.freeze({
  ADMIN : 'admin',
  MEMBER : 'member',
  SUBSCRIBER : 'subscriber'
})

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
      type: DataTypes.ENUM,
      values: Object.values(ALLOWED_ROLES),
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    modelName: "Roles",
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
);

export default Role;
