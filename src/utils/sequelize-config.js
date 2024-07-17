const { Sequelize } = require("sequelize");
require("dotenv").config();

const { URI_DATABASE: uri } = process.env;
const sequelize = new Sequelize(uri, {
  define: {
    timestamps: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    socketTimeoutMS: 30000,
    keepAlive: true,
    useUnifiedTopology: true,
    logging: false,
    freezeTableName: true,
    raw: true
  }
});

export default sequelize;
