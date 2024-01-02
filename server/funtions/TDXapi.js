const axios = require('axios');
const { TYcarpark } = require("../models/TaoyuanCarparkData");
const { TYavailability } = require("../models/TaoyuanParkingAvailability");
require('dotenv').config();

//GET TDX_API Token
async function getAccessToken() {
    const {TDX_CLIENTID, TDX_CLIENTSERET} = process.env;
    const clientId = encodeURIComponent(TDX_CLIENTID);
    const clientsecret = encodeURIComponent(TDX_CLIENTSERET);
    const tokenUrl = 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token';
  
    const authData = {
      grant_type: 'client_credentials',
      client_id: clientId, 
      client_secret: clientsecret,
    };
  
    const authHeader = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  
    try {
      const response = await axios.post(tokenUrl, authData, { headers: authHeader });
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      console.log('Error fetching access token:', error);
      throw error;
    }
}

//獲取即時更新車位資料
async function GetAvailabilityDataAPI() {
    try {
      const accessToken = await getAccessToken();
      const apiUrl = 'https://tdx.transportdata.tw/api/basic/v1/Parking/OffStreet/ParkingAvailability/City/Taoyuan?%24format=JSON';
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
  
      const response = await axios.get(apiUrl, { headers });
      const Availability = response.data;
      return Availability;
    } catch (error) {
        console.error('API request error:', error);
      }
}

//獲取停車場資本資料
async function GetCarparkDataAPI() {
    try {
      const accessToken = await getAccessToken();
      const apiUrl = 'https://tdx.transportdata.tw/api/basic/v1/Parking/OffStreet/CarPark/City/Taoyuan?%24count=true&%24format=JSON';
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
  
      const response = await axios.get(apiUrl, { headers });
      const CarPark = response.data;
      console.log(CarPark);
      return CarPark;
    } catch (error) {
        console.error('API request error:', error);
      }
}


//儲存TYavailability資料
async function SaveAvailabilityData() {
  try{
    const Availability = await GetAvailabilityDataAPI();
    Availability.ParkingAvailabilities.forEach(async (park) => {
      let newAvailability = new TYavailability({
        APISrcUpdateInterval: Availability.UpdateTime,
        CarParkID: park.CarParkID,
        CarParkName: park.CarParkName.Zh_tw,
        TotalSpaces: park.TotalSpaces,
        AvailableSpaces: park.AvailableSpaces,
        ServiceStatus: park.ServiceStatus,
        FullStatus: park.FullStatus,
      });
      await newAvailability.save();
    });
  }catch (err) {
    console.log('Error:', err);
  }
}

//儲存TYcarpark資本資料
async function SaveCarparkData() {
  try {
    const CarPark = await GetCarparkDataAPI();
    CarPark.CarParks.forEach(async (park) => {
      let newCarPark = new TYcarpark({
        APIUpdateTime: CarPark.UpdateTime,
        APIUpdateInterval: CarPark.UpdateInterval,
        CarParkID: park.CarParkID,
        CarParkName: park.CarParkName.Zh_tw,
        Telephone: park.Telephone,
        CarParkType: park.CarParkType,
        CarParkPosition: [park.CarParkPosition.PositionLon,park.CarParkPosition.PositionLat
        ],
        Address: park.Address,
        FareDescription: park.FareDescription,
        SpecialOfferDescription: park.SpecialOfferDescription,
        VehicleRestriction: park.VehicleRestriction,
      });
      await newCarPark.save();
    });
  } catch (err) {
    console.log('Error:', err);
  }
};


//刷新及時車位資訊
async function UpdateAvailabilityData() {
  try{
    const Availability = await GetAvailabilityDataAPI();
    let bulkOps = [];


    Availability.ParkingAvailabilities.forEach(async (park) => {
      let updateData = {
        APISrcUpdateInterval: Availability.UpdateTime,
        CarParkID: park.CarParkID,
        CarParkName: park.CarParkName.Zh_tw,
        TotalSpaces: park.TotalSpaces,
        AvailableSpaces: park.AvailableSpaces,
        ServiceStatus: park.ServiceStatus,
        FullStatus: park.FullStatus,
        updatedTime: new Date()
      };
      
      bulkOps.push({
        updateOne: {
          filter: { CarParkID: park.CarParkID },
          update: { $set: updateData },
          upsert: true,
        },
      });
    });

    await TYavailability.bulkWrite(bulkOps, {});
    console.log('及時車位資料更新成功!');
  } catch (err) {
    console.log('Error:', err);
  }
}

/*更新停車場資訊
資料來源
carpark:{
  ..
  ..
  carparks:{
    ..
    ..
  }
}*/
async function updateCarparkData() {
  try{
    const CarPark = await GetCarparkDataAPI();
    let bulkOps = [];


    CarPark.CarParks.forEach(async (park) => {
      let updateData = {
        APIUpdateTime: CarPark.UpdateTime,
        APIUpdateInterval: CarPark.UpdateInterval,
        CarParkID: park.CarParkID,
        CarParkName: park.CarParkName.Zh_tw,
        Telephone: park.Telephone,
        CarParkType: park.CarParkType,
        CarParkPosition: [park.CarParkPosition.PositionLon,park.CarParkPosition.PositionLat
        ],
        Address: park.Address,
        FareDescription: park.FareDescription,
        SpecialOfferDescription: park.SpecialOfferDescription,
        VehicleRestriction: park.VehicleRestriction,
        updatedTime: new Date()
      };

      bulkOps.push({
        updateOne: {
          filter: { CarParkID: park.CarParkID },
          update: { $set: updateData },
          upsert: true
        }
      });
    });
    await TYcarpark.bulkWrite(bulkOps, {});
    console.log('停車場資料更新成功!');
  } catch (error) {
    console.log('Error:', error);
  }
}




module.exports = {
  UpdateAvailabilityData,
  updateCarparkData,
  SaveCarparkData,
  SaveAvailabilityData
};