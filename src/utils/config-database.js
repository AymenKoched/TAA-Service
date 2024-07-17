import sequelize from "./sequelize-config";

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return error;
  }
};

export default initializeDatabase;
