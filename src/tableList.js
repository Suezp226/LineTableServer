const express = require('express');
const mongoose  = require('mongoose');

// 该页面路由输出
const router = express.Router();

// Schema
let Schema = mongoose.Schema;
let tableInfo = new Schema({
  initDate: Number,    //  创建时间
  name: String,        //  表面名称
  nameStr: String,     //  中文名称
  tableTags: Array,      // 列表数据项
  toolTags: Array,  // 工具栏
  keywordsList: Array  //  关键字包含的字段
})

// Model 对应数据库中 表名

let table = mongoose.model("table",tableInfo);

// 路由拦截器

router.all('*',(req,res,next)=>{
  next();
})

// 获取列表
router.get('/',(req,res,next)=>{
  let query = req.query;
  //  第一个参数控制 查找条件 第二个控制返回参数  不传就是所有字段 包括_id
  table.find({},{},(err,docs)=>{
    if(!err) {
      res.send({code:200,list:docs})
    }
  })
});



// Post 请求处理
router.use(express.json());
router.use(express.urlencoded({extended:true}));


// 新增列表
router.post('/addTable',function(req,res,next){
  let query = req.body;
  table.find({name:query.name},{},(err,docs)=>{
    if(docs.length === 0) {
      table.create([query], (err)=>{
        if(!err) {
          console.log('添加成功');
          table.find({...query},{},(err,docs)=>{
            res.send({docs,code:200});
          })
        } else {
          throw err;
        }
      })
    } else {
      res.send({code:302,msg:'已有 该名字的表格！'})
    }
  })
})

module.exports = {router}