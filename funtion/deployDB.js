const mongoose = require('mongoose');
const { TYcarpark } = require("../server/models/TaoyuanCarparkData");
const { TYavailability } = require("../server/models/TaoyuanParkingAvailability");
const TDX_api = require("../server/middleware/TDXapi");
require('dotenv').config();


const { MONGO_PASSWORD, MONGO_USERNAME, MONGO_dbName, MONGO_HOST, MONGODB_PORT } = process.env;
const username = encodeURIComponent(MONGO_USERNAME);
const password = encodeURIComponent(MONGO_PASSWORD);
const dbName = encodeURIComponent(MONGO_dbName);
const host = encodeURIComponent(MONGO_HOST);
const port = encodeURIComponent(MONGODB_PORT);

const url = process.env.MONGODB_URI || `mongodb://${username}:${password}@${host}:${port}`;


async function updateDB() {
    try {
        await TDX_api.SaveCarparkData();
        TDX_api.SaveAvailabilityData();
        console.log('資料庫更新成功');
    } catch (error) {
        console.log('資料庫更新失敗:', error);
    }
}

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 180000, // 3分鐘
    socketTimeoutMS: 180000, // 3分鐘
};


mongoose.connect(url, connectOptions)
        .then(() => console.log('資料庫連線成功！'))
        .catch(err => console.error('資料庫連線失敗！', err));


const db = mongoose.connection;


db.once('connected', () => {
    console.log('成功連接到 MongoDB 資料庫');
    updateDB();
});





