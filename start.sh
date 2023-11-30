#!/bin/bash

# 執行 npm run deployDB
npm run deployDB

# 等待5秒
sleep 10

# 執行 pm2-runtime app.js
pm2-runtime app.js
