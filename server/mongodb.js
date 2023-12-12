const db = require("mongoose");
const { TYcarpark } = require("../server/models/TaoyuanCarparkData");
const { TYavailability } = require("../server/models/TaoyuanParkingAvailability");
require('dotenv').config();

const {MONGO_URL} = "mongodb://localhost:27017";


const url = "mongodb://127.0.0.1:27017/CarParking";




db.connect(url)
        .then(() => console.log('資料庫連線成功！'))
        .catch(err => console.error('資料庫連線失敗！', err));

