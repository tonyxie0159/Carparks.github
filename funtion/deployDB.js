const mongoose = require('mongoose');
const TDX_api = require("../server/middleware/TDXapi");
require('dotenv').config();


const {MONGO_PASSWORD, MONGO_USERNAME, MONGO_dbName,MONGO_HOST,MONGODB_PORT} = process.env;
const username = encodeURIComponent(MONGO_USERNAME);
const password = encodeURIComponent(MONGO_PASSWORD);
const dbName = encodeURIComponent(MONGO_dbName);
const host = encodeURIComponent(MONGO_HOST);
const port = encodeURIComponent(MONGODB_PORT);

const url = process.env.MONGODB_URI || `mongodb://${username}:${password}@${host}:${port}/${dbName}`;

async function updateDB() {
    try{
        await TDX_api.SaveCarparkData();
        TDX_api.SaveAvailabilityData();
    } catch (error) {
        console.log('資料庫更新失敗:',error);
    } 
}

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 180000, // 3分鐘
    socketTimeoutMS: 180000, // 3分鐘
  };

mongoose.connect(url, connectOptions);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('成功連接到 MongoDB 資料庫');
    updateDB();
  });





