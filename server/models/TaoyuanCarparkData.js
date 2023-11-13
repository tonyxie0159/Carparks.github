const mongoose = require('mongoose')

const CarParkSchema = new mongoose.Schema({
    APIUpdateTime: String,
    APIUpdateInterval: Number,
    CarParkID: String,
    CarParkName: String,
    Telephone: String,
    CarParkType: Number,
    CarParkPosition: {
      type: [Number],  
      index: '2dsphere'  // 建立2dsphere索引
    },
    Address: String,
    FareDescription: String,
    SpecialOfferDescription: String,
    VehicleRestriction: String,
    updatedTime: {
      type: Date,
      default: Date.now
    }
});



exports.TYcarpark = mongoose.model('TYcarpark', CarParkSchema);
/*
"UpdateTime": "date-time",                                                      //TDX停車場基本資料更新時間
"UpdateInterval": int32,                                                        //14400秒   
"CarParkID": "string",                                                          //停車場代碼  **DataKey
"CarParkName": "string",                                                        //停車場名稱  
"Telephone": "string",                                                          //停車場連絡電話
"CarParkType": "int32",                                                         //停車場類型 [1:'平面',2:'立體',3:'地下',4:'立體停車塔',5:'立體機械式',6:'同時涵蓋2種以上',254:'其他',255:'未知']
"CarParkPosition": {"PositionLat": "PointType","PositionLon": "PointType"},     //停車場經緯度  Lat緯度  Lon經度
"Address": "string",                                                            //停車場地址
"FareDescription": "string",                                                    //票價資訊文字描述
"SpecialOfferDescription": "string"                                             //優惠費率文字說明
"VehicleRestriction": "string",                                                 //車輛限制文字描述
*/