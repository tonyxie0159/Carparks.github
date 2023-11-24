const mongoose = require('mongoose')

const availabilitySchema = new mongoose.Schema({
  APISrcUpdateInterval: String,
  CarParkID: String,
  CarParkName: String,
  TotalSpaces: Number,
  AvailableSpaces: Number,
  ServiceStatus: Number,
  FullStatus: Number,
  updatedTime: {
    type: Date,
    default: Date.now
  }
});

exports.TYavailability = mongoose.model('TYavailability', availabilitySchema); 

/*
"UpdateTime": "date-time",                                  //TDX停車場剩餘位更新時間 "format": "date-time"
"SrcUpdateInterval": "int32",                               //60秒
"CarParkID": "string",                                      //停車場代碼  **DataKey
"CarParkName": "string",                                    //停車場名稱
"TotalSpaces": "int32",                                     //停車位總數
"AvailableSpaces": "int32",                                 //剩餘停車位數
"ServiceStatus": "int32",                                   //停車場營業狀態(以小客車為主) : [0:'休息中',1:'營業中',2:'暫停營業']
"FullStatus": "int32",                                      //停車場格位狀態 : [0:'尚有空位',1:'車位將滿',2:'車位已滿',3:'過度擁擠']
*/