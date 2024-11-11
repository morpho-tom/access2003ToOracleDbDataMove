const { Sequelize } = require("sequelize");
const oracledb = require("oracledb");
const dotenv = require("dotenv");

dotenv.config();

oracledb.initOracleClient({ libDir: "C:/oracle/instantclient" });

const sequelize = new Sequelize(
  process.env.SID,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "oracle",
    dialectOptions: {
      connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${process.env.HOST})(PORT=1521))(CONNECT_DATA=(SID=${process.env.SID})))`,
    },
    logging: false,
  }
);

module.exports = sequelize;
