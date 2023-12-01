//設定啟動模式
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require("express");
const db = require('./server/mongodb');
const router = require('./server/router/router');
const cors = require("cors");
const path = require("path");
const cron = require('node-cron');
const TDX_api = require("./server/middleware/TDXapi");
const createError = require("http-errors");

const app = express();

// 設置 Pug 作為視圖引擎
app.set('views', path.join(__dirname, 'views')); // 設置視圖模板的目錄路徑
app.set('view engine', 'pug');


//解析請求內的JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client')));

//解決跨域問題
app.use(cors());



// // 使用 node-cron 設定每週一的定時任務
// cron.schedule('0 0 * * 1', () => {
//   // 在每週一的凌晨（00:00:00）執行資料更新
//   TDX_api.updateCarparkData();
// }, {
//   timezone: 'Asia/Taipei' // 設定時區，根據你的需要調整
// });


app.use('/api', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app listening on ${port}.`)
  }) 