// models/WeighmentData.js
const { DataTypes } = require("sequelize");
const sequelize = require("../sequelizeConfig");

const WeighmentData = sequelize.define(
  "WeighmentData",
  {
    ticket_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    vehicle_no: { type: DataTypes.STRING },
    material_code: { type: DataTypes.STRING },
    material_name: { type: DataTypes.STRING },
    veh_type: { type: DataTypes.STRING },
    gweight: { type: DataTypes.FLOAT },
    tweight: { type: DataTypes.FLOAT },
    gdate: { type: DataTypes.DATE },
    gtime: { type: DataTypes.STRING },
    operator: { type: DataTypes.STRING },
    tdate: { type: DataTypes.DATE },
    tmode: { type: DataTypes.STRING },
    ttime: { type: DataTypes.STRING },
    wtdate: { type: DataTypes.DATE },
    customer_code: { type: DataTypes.STRING },
    customer_name: { type: DataTypes.STRING },
    noofbags: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING },
    Desig: { type: DataTypes.INTEGER },
    grossortare: { type: DataTypes.STRING },
    TCNo: { type: DataTypes.STRING },
    godown: { type: DataTypes.STRING },
    ndate: { type: DataTypes.DATE },
    ntime: { type: DataTypes.STRING },
    runningsno: { type: DataTypes.INTEGER },
    status1: { type: DataTypes.STRING },
    shift: { type: DataTypes.STRING },
    weight: { type: DataTypes.FLOAT },
    first_wt: { type: DataTypes.FLOAT },
    second_wt: { type: DataTypes.FLOAT },
    phone1: { type: DataTypes.STRING },
    phone2: { type: DataTypes.STRING },
    imgPath: { type: DataTypes.STRING },
    company: { type: DataTypes.STRING },
  },
  {
    tableName: "weighment_data",
    timestamps: false,
  }
);

module.exports = WeighmentData;
