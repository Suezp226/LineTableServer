const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const request  =  require("request");


// 各级路由
const table = require("./src/tableList");
const insideTable = require("./src/insideTable");



const app = express();

app.use(cors());

// 链接数据库 连接时就确定了当前数据库名称
mongoose.connect('mongodb://localhost/lineTable',{useNewUrlParser:true, useUnifiedTopology:true});
mongoose.connection.once("open",()=>{
  console.log('数据库连接成功， 库名: lineTable');
})

// 开放首页资源
app.use(express.static(path.join(__dirname,'pages')));

app.get('/api',(req,res)=>{
  res.send('数据库连接成功')
})

app.get('/wxJsAccesToken',(req,res)=>{
  request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx908e307ce8863893&secret=f7127c00bee2837aa0a4ee1a9e0c348f',(err,resp,body)=>{
    res.send(resp);
  })

})

// 首页表
app.use('/table',table.router)
// 内部表数据
app.use('/insideTable',insideTable.router);


app.listen('1113',()=>{
  console.log('服务端口启动成功， 端口号:1113');
})



