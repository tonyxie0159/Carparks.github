const db = require("mongoose");
const { TYcarpark } = require("../server/models/TaoyuanCarparkData");
const { TYavailability } = require("../server/models/TaoyuanParkingAvailability");

db.set("strictQuery", true);

db.connect("mongodb://127.0.0.1:27017/CarParking")

        .then(() => console.log('資料庫連線成功！'))
        .catch(err => console.error('資料庫連線失敗！', err));

