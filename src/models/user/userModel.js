import { sequelize } from "@/utils";

const { DataTypes, Model } = require("sequelize");

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  // eslint-disable-next-line no-unused-vars
  static associate(models) {
    // define association here
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
    modelName: "User"
  }
);

// eslint-disable-next-line no-console
console.log(User === sequelize.models.User); // true
// eslint-disable-next-line import/prefer-default-export
export { User as UserModel };
