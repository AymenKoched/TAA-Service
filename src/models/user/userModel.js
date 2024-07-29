import { sequelize } from "@/utils";

const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static associate(models) {
    this.belongsToMany(models.Role, {
      through: "UserRoles",
      as: "roles",
      foreignKey: "userId"
    });
  }
}
User.init(
  {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordDecrypt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true
  }
);

// eslint-disable-next-line no-console
console.log(User === sequelize.models.User); // true
// eslint-disable-next-line import/prefer-default-export
export { User as UserModel };
