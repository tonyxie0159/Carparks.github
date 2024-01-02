const express = require('express');
const router = express.Router();
const TDX = require("../funtions/TDXapi");
const { TYcarpark } = require("../models/TaoyuanCarparkData");
const { TYavailability } = require("../models/TaoyuanParkingAvailability");

//將距離結果改為公里單位
function toFix(radians) {
  const kilometer = radians / 1000
  return kilometer.toFixed(1); //四捨五入到小數點第一位
}

router.post('/location', async function (req, res) {

  const geolocation = req.body;
  let userLat = geolocation.latitude; //緯度
  let userLon = geolocation.longitude; //經度
  console.log(userLon,userLat );


  //使用者定位，查詢最近距離停車場
  const nearCarpark = async () => {
    try {
      await TDX.UpdateAvailabilityData(); //更新及時車位資訊
      const nears = await TYcarpark.aggregate([
        {
          $geoNear: {
             near: { type: "Point", coordinates: [ userLon , userLat ] },
             distanceField: "dist.calculated", // 將計算出的距離存入dist.calculated字段
             maxDistance: 100000, //距離以內的資料，單位公尺
             spherical: true
          }
        }
     ]).limit(30);  //只存取前三十筆資料

      // 使用 map 函數遍歷每一筆資料
    const results = await Promise.all(nears.map(async (carpark) => {
      // 查詢 TYavailability 資料表
      const availability = await TYavailability.findOne({ CarParkID: carpark.CarParkID });

      //檢查 availability 是否為 null
      if (!availability) {
        //console.log(`No availability found for CarParkID: ${carpark.CarParkID}`);
        return null;
      }

      //else 建立新的物件並返回
      return {
        CarParkName: carpark.CarParkName,
        Address: carpark.Address,
        Telephone: carpark.Telephone,
        AvailableSpaces: availability.AvailableSpaces,
        TotalSpaces: availability.TotalSpaces,
        ServiceStatus: availability.ServiceStatus,
        CarParkDistance: toFix(carpark.dist.calculated)
      };   
    }));

      // 過濾掉 null 的結果
      const filteredResults = results.filter(result => result !== null);
      return filteredResults;
    } 
    catch (error) {
      res.status(500).send('server error');
      console.log('throw Error', error);}
  }
  const filteredResults = await nearCarpark();
  console.log('success');
  //console.log(filteredResults);
  res.status(200).json(filteredResults);
});



router.post('/search', async (req, res) => {

  const geolocation = req.body.data;
  let userLat = geolocation.latitude; //緯度
  let userLon = geolocation.longitude; //經度
  console.log(userLon,userLat );
  
  // 檢查字串是否只包含中文、英文和數字
  function isValidInput(input) {
    const regex = /^$|^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
    return regex.test(input);
  }

  

  const findCarpark = async () => {
    try {
      const keyword = req.query.keyword;

      if (!isValidInput(keyword)) {
        res.status(400)
      }
      
      let selectedOption;
      if (req.body.selectedOption === "請選擇行政區") {
         selectedOption = "";
      } else {selectedOption = req.body.selectedOption}

      console.log(keyword,selectedOption);
      await TDX.UpdateAvailabilityData(); //更新及時車位資訊
      const carparkData = await TYcarpark.aggregate([
        {
          $geoNear: {
             near: { type: "Point", coordinates: [ userLon , userLat ] },
             distanceField: "dist.calculated", // 將計算出的距離存入dist.calculated字段
             spherical: true 
          }
        },
        {
          $match: {
            $or: [
              {
                $and: [
                  { CarParkName: { $exists: true } },
                  { CarParkName: new RegExp(keyword, 'i') },
                  { Address: { $exists: false } }
                ]
              },
              {
                $and: [
                  { Address: { $exists: true } },
                  { Address: new RegExp(selectedOption, 'i') },
                  { CarParkName: { $exists: false } }
                ]
              },
              {
                $and: [
                  { CarParkName: { $exists: true } },
                  { Address: { $exists: true } },
                  { CarParkName: new RegExp(keyword, 'i') },
                  { Address: new RegExp(selectedOption, 'i') }
                ]
              }
            ]
          }
        }
      ]).limit(50);


      const results = await Promise.all(carparkData.map(async (carpark) => {
        const availability = await TYavailability.findOne({ CarParkID: carpark.CarParkID });

        //檢查 availability 是否為 null
        if (!availability) {
        //console.log(`No availability found for CarParkID: ${carpark.CarParkID}`);
          return null;
        }

        //else 建立新的物件並返回
        return {
          CarParkName: carpark.CarParkName,
          Address: carpark.Address,
          Telephone: carpark.Telephone,
          AvailableSpaces: availability.AvailableSpaces,
          TotalSpaces: availability.TotalSpaces,
          ServiceStatus: availability.ServiceStatus,
          CarParkDistance: toFix(carpark.dist.calculated)
        }; 
      }));

        // 過濾掉 null 的結果
      const filteredResults = results.filter(result => result !== null);
      return filteredResults;
    } catch (err) {
      res.status(500).send('server error');
      console.log('throw Error', err);
    }
  }
  const filteredResults = await findCarpark();
  console.log('success');
  res.status(200).json(filteredResults);
});








module.exports = router;