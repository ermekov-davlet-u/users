import Sequelize from "sequelize";
const sequelize = new Sequelize("users", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
  logging: true,
  operatorsAliases: 1,
  define: {
    timestamps: false,
  }
});




export { Sequelize, sequelize }
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db