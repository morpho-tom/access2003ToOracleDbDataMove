const express = require("express");
const ADODB = require("node-adodb");
const path = require("path");
const WeighmentData = require("./models/WeighmentData"); // Import the model
const sequelize = require("./sequelizeConfig"); // Import Sequelize connection
const cron = require("node-cron"); // Import node-cron for scheduling tasks
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

// Access database path and password
const databasePath = path.resolve("D:/DharmDB.mdb");
const accessPassword = "weigh";
const accessConnection = ADODB.open(
  `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${databasePath};Jet OLEDB:Database Password=${accessPassword};`
);

// Function to retrieve data from Access database
async function getAccessData() {
  try {
    const result = await accessConnection.query("SELECT * FROM weighment");
    console.log("Data retrieved from Access:", result);
    return result;
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
  }
}

// Ensure Oracle table exists and create it if it doesn't
async function ensureTableExists() {
  try {
    await WeighmentData.sync({ force: false });
    console.log("Oracle table 'weighment_data' ensured to exist!");
  } catch (error) {
    console.error("Error ensuring table:", error);
    throw error;
  }
}

// Function to prepare and insert or update data in Oracle
async function insertOrUpdateData(accessData) {
  const insertData = accessData.map((row) => ({
    ticket_no: row.ticket_no,
    vehicle_no: row.vehicle_no,
    material_code: row.material_code,
    material_name: row.material_name,
    veh_type: row.veh_type,
    gweight: row.gweight,
    tweight: row.tweight,
    gdate: row.gdate,
    gtime: row.gtime,
    operator: row.operator,
    tdate: row.tdate,
    tmode: row.tmode,
    ttime: row.ttime,
    wtdate: row.wtdate,
    customer_code: row.customer_code,
    customer_name: row.customer_name,
    noofbags: row.noofbags,
    status: row.status,
    Desig: row.Desig,
    grossortare: row.grossortare,
    TCNo: row.TCNo,
    godown: row.godown,
    ndate: row.ndate,
    ntime: row.ntime,
    runningsno: row.runningsno,
    status1: row.status1,
    shift: row.shift,
    weight: row.weight,
    first_wt: row.first_wt,
    second_wt: row.second_wt,
    phone1: row.phone1,
    phone2: row.phone2,
    imgPath: row.imgPath,
    company: row.company,
  }));

  for (const record of insertData) {
    const existingRecord = await WeighmentData.findOne({
      where: { ticket_no: record.ticket_no },
    });

    if (existingRecord) {
      await existingRecord.update(record); // Update existing record
      // console.log(`Record with ticket_no ${record.ticket_no} updated.`);
    } else {
      await WeighmentData.create(record); // Insert new record
      console.log(`New record with ticket_no ${record.ticket_no} inserted.`);
    }
  }
}

// API endpoint to retrieve data from Access
app.get("/getAccessData", async (req, res) => {
  try {
    const accessData = await getAccessData();
    res.status(200).json(accessData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Error retrieving data from Access.");
  }
});

// API endpoint to manually insert data into Oracle (POST request)
app.post("/insertDataToOracle", async (req, res) => {
  try {
    const accessData = req.body; // Assuming data is sent in request body

    await ensureTableExists(); // Ensure the Oracle table exists
    await insertOrUpdateData(accessData); // Insert or update data
    res.status(200).send("Data successfully processed in OracleDB.");
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).send("Error processing data.");
  }
});

// Schedule the cron job to run every 15 minutes
cron.schedule("*/15 * * * *", async () => {
  try {
    console.log("Running cron job: Transferring data from Access to Oracle...");

    const accessData = await getAccessData(); // Retrieve data from Access
    await ensureTableExists(); // Ensure Oracle table exists
    await insertOrUpdateData(accessData); // Insert or update data in Oracle

    console.log("Cron job completed successfully: Data processed in OracleDB.");
  } catch (error) {
    console.error("Error running cron job:", error);
  }
});

// Start the Express server

app.listen(async () => {
  try {
    await sequelize.authenticate(); // Test Oracle connection
    console.log("Connected to OracleDB successfully using Sequelize.");
  } catch (error) {
    console.error("Unable to connect to OracleDB:", error);
  }
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 3000}`
  );
});
