const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
// 各级路由
const table = require("./src/tableList");



const app = express();

app.use(cors());

// 链接数据库 
mongoose.connect('mongodb://localhost/lineTable',{useNewUrlParser:true, useUnifiedTopology:true});
mongoose.connection.once("open",()=>{
  console.log('数据库连接成功， 库名: lineTable');
})

// 开放首页资源
app.use(express.static(path.join(__dirname,'pages')));

app.get('/api',(req,res)=>{
  res.send('数据库连接成功')
})
app.use('/table',table.router)


app.listen('1113',()=>{
  console.log('服务端口启动成功， 端口号:1113');
})



