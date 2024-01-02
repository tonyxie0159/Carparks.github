## 簡介
基於express+mongodb的桃園市即時剩餘停車位查詢系統，依照用戶定位推薦尚有停車位之停車場

## 流程

建立資料庫
JSON資料存入資料表
要求用戶允許取得定位
依用戶定位查詢鄰近尚有停車位之停車場，將結果傳至前端輸出
當用戶選定停車場後，點選按鈕"前往"後，使用GOOGLEMAP開始導航至目的地 

## MongoDB資料庫

桃園市停車場資訊 //僅有開放查詢即時車位之停車場資料


1.TaoyuanCarparkData //資料表名稱  //桃園市停車場基本資料  **每4天更新

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



2.TaoyuanParkingAvailability  //資料表名稱  //即時剩餘車位資料  **每60秒更新

"UpdateTime": "date-time",                                  //TDX停車場剩餘位更新時間 "format": "date-time"
"SrcUpdateInterval": "int32",                               //60秒
"CarParkID": "string",                                      //停車場代碼  **DataKey
"CarParkName": "string",                                    //停車場名稱
"TotalSpaces": "int32",                                     //停車位總數
"AvailableSpaces": "int32",                                 //剩餘停車位數
"ServiceStatus": "int32",                                   //停車場營業狀態(以小客車為主) : [0:'休息中',1:'營業中',2:'暫停營業']
"FullStatus": "int32",                                      //停車場格位狀態 : [0:'尚有空位',1:'車位將滿',2:'車位已滿',3:'過度擁擠']



## 資料來源 TDX 
https://tdx.transportdata.tw/api/basic/v1/Parking/OffStreet/CarPark/City/Taoyuan?%24count=false&%24format=JSON
取得桃園市停車場基本資料

{
 "UpdateTime": "2023-10-08T13:43:53.528Z",                                  //TDX停車場基本資料更新時間 "format": "date-time"
 "UpdateInterval": 14400,                                                   //更新間隔14400秒=>4天 "format": "int32"
 "SrcUpdateTime": "2023-10-08T13:43:53.529Z",                               //TDX停車場基本資料資料來源更新時間  "format": "date-time"
 "CarParks": [                                                              //"type": "array"
    "CarParkID": "string",                                                  //業管機關訂定之停車場代碼
    "CarParkName": {                                                        //CarParkName.Zh_tw 停車場中文名稱
        "Zh_tw": "string"
      },
    "CarParkType": 0,                                                       //停車場類型 : [1:'平面',2:'立體',3:'地下',4:'立體停車塔',5:'立體機械式',6:'同時涵蓋2種以上',254:'其他',255:'未知']"
    "Telephone": "string",                                                  //停車場連絡電話
    "CarParkPosition": {                                                    //停車場經緯度  "title": "PointType"
        "PositionLat": 0,
        "PositionLon": 0
      },
    "Address": "string",                                                    //停車場地址
    "FareDescription": "string",                                            //票價資訊文字描述
    "SpecialOfferDescription": "string",                                    //優惠費率文字說明
    "VehicleRestriction": "string",                                         //車輛限制文字描述
    "LiveOccuppancyAvailable": 0,                                           //是否有提供動態剩餘車位資訊 : [0:'否',1:'是']"
 ]
}


https://tdx.transportdata.tw/api/basic/v1/Parking/OffStreet/ParkingAvailability/City/Taoyuan?%24top=30&%24format=JSON
取得桃園市停車場剩餘位資料
{
 "UpdateTime": "2023-10-08T13:43:52.906Z",                                  //TDX停車場剩餘位更新時間 "format": "date-time"
 "SrcUpdateInterval": 60,                                                   //更新間隔60秒  "format": "int32"
 "ParkingAvailabilities": [                                                 //"type": "array"
    {
        "CarParkID": "string",                                              //業管機關訂定之停車場代碼
        "CarParkName": { "Zh_tw": "string"},                                //CarParkName.Zh_tw 停車場中文名稱
        "TotalSpaces": 0,                                                   // 停車位總數  "format": "int32"
        "AvailableSpaces": 0,                                               //停車剩餘位總數  "format": "int32"
        "ServiceStatus": 0,                                                 //停車場營業狀態(以小客車為主) : [0:'休息中',1:'營業中',2:'暫停營業']
        "FullStatus": 0,                                                    //停車場格位狀態 : [0:'尚有空位',1:'車位將滿',2:'車位已滿',3:'過度擁擠']
    },
     
 ]
}
