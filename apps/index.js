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

 const User = sequelize.define("User", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userName: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      password: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
    });

    const Record = sequelize.define("Record", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
    });




const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db