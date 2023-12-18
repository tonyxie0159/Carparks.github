const db = require("mongoose");
const { TYcarpark } = require("../server/models/TaoyuanCarparkData");
const { TYavailability } = require("../server/models/TaoyuanParkingAvailability");
require('dotenv').config();
const dbupdate = require("./middleware/TDXapi");


const {MONGO_URL} = process.env;


const url = decodeURIComponent(MONGO_URL);


db.connect(url)
        .then(() => console.log('資料庫連線成功！'))
        .catch(err => console.error('資料庫連線失敗！', err));


