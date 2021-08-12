const express = require('express');
const mongoose = require('mongoose');

// 该页面路由输出
const router = express.Router();

// Schema
let Schema = mongoose.Schema;
let tableInfo = new Schema({
  initDate: Number, //  创建时间
  name: String, //  表面名称
  nameStr: String, //  中文名称
  tableTags: Array, // 列表数据项
  toolTags: Array, // 工具栏
  keywordsList: Array, //  关键字包含的字段
  tagSchema: Object // 存储对应的 schema
})

// Model 对应数据库中 表名
let table = mongoose.model("table", tableInfo);

// 路由拦截器

router.all('*', (req, res, next) => {
  next();
})

// 获取列表
router.get('/', (req, res, next) => {
  let query = req.query;
  //  第一个参数控制 查找条件 第二个控制返回参数  不传就是所有字段 包括_id
  table.find({ ...query }, { initDate: 1, name: 1, nameStr: 1, tableTags: 1, toolTags: 1, keywordsList: 1 }, (err, docs) => {
    if (!err) {
      res.send({ code: 200, list: docs })
    } else {
      console.log(err)
    }
  })
});



// Post 请求处理
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// 新增列表  创建一个新列表的时候 --> 应该要同步的创建一个表格的表
router.post('/addTable', function (req, res, next) {
  let query = req.body;
  let sche = {};
  if (query.tableTags) {
    query.tableTags.forEach(ele => {
      sche[ele.key] = String
    })
  }
  query.initDate = new Date().valueOf();  //创建时间
  query.tagSchema = Object.keys(sche);    
  // let insideTableInfo = new Schema(sche);

  table.find({ name: query.name }, {}, (err, docs) => {
    if (docs.length === 0) {
      table.create([query], (err) => {
        if (!err) {
          console.log('添加成功');
          table.find({ ...query }, {}, (err, docs) => {
            res.send({ docs, code: 200 });

            // 创建表格数据 
            // let insideTable = mongoose.model('lineTableData' + docs[0]._id, insideTableInfo)
            // insideTable.create([{}], (err) => {
            //   if (!err) {
            //     res.send({ docs, code: 200 });
            //   }
            // })
          })
        } else {
          throw err;
        }
      })
    } else {
      res.send({ code: 302, msg: '已有 该名字的表格！' })
    }
  })
})


// 修改 表格参数 
router.post('/editTable', function (req, res, next) {
  let query = req.body;
  table.find({ _id: query._id }, {}, (err, docs) => {
    if (docs.length !== 0) {
      let sche = {};
      if (query.tableTags) {
        query.tableTags.forEach(ele => {
          sche[ele.key] = String
        })
      }
      query.tagSchema = Object.keys(sche); 
      table.updateOne({ _id: query._id }, { ...query }, (err, resp) => {
        if (!err) {
          console.log('修改成功');
          table.find({ ...query }, {}, (err, docs) => {
            res.send({ docs, code: 200 });
          })
        } else {
          throw err;
        }
      })
    } else {
      res.send({ code: 302, msg: '未查询到该条数据' })
    }
  })
})

//删除 
// Model.deleteOne(conditions,callback);

router.post('/deleteTable', function (req, res, next) {
  let query = req.body;
  table.find({ _id: query._id }, {}, (err, docs) => {
    if (docs.length < 1) {
      res.send({ code: 200, msg: '删除失败，未找到该数据' });
      return
    }
    if (!err) {
      table.deleteOne({ _id: query._id }, (err) => {
        if (!err) {
          res.send({ code: 200, msg: '删除成功' })
        }
      })
    }
  })
})


module.exports = { router, table }