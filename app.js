const express = require("express");
const db = require('./server/mongodb');
const router = require('./server/router/router');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const cron = require('node-cron');
const TDX_api = require("./server/middleware/TDXapi");


//解析請求內的JSON
app.use(bodyParser.json());

//解決跨域問題
app.use(cors());


// 使用 node-cron 設定每週一的定時任務
cron.schedule('0 0 * * 1', () => {
  // 在每週一的凌晨（00:00:00）執行資料更新
  TDX_api.updateCarparkData();
}, {
  timezone: 'Asia/Taipei' // 設定時區，根據你的需要調整
});


app.use('/api', router);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app listening on ${port}.`)
  }) 