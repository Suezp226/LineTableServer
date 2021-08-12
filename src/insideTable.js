// 二级表格真实数据
const mongoose = require('mongoose');
const express = require('express');
const tableObj = require('./tableList')

const router = express.Router();

const table = tableObj.table;


//  以下两个都是需要考 传参来搜索表格的id来实现

const getInsideTableSchema = function (schemaList) {

  let sche = {};
  schemaList.forEach(ele => {
    sche[ele] = String;
  })

  return mongoose.Schema(sche,{ strict: false })
}

/*    ----------请求处理--------- */

// 路由拦截器

router.all('*', (req, res, next) => {
  next();
})

// 用来保存insideTable model   因为 同一个model 不能重复定义
let insideTable = {};

// ------ GET 请求 
// 获取表格数据
router.get('/getInsideData', (req, res, next) => {
  let query = req.query;
  table.findOne({ ...query }, {}, (err, docs) => {
    let insideTableInfo = getInsideTableSchema(docs.tagSchema);
    let nowModel = insideTable[('lineTableData' + docs._id)];
    
    // 不存在这个 model 的时候 添加
    if(!nowModel) {
      insideTable[('lineTableData' + docs._id)] = mongoose.model('lineTableData' + docs._id, insideTableInfo);
      nowModel = insideTable[('lineTableData' + docs._id)];
    };
    nowModel.find({}, {}, (err, docs) => {
      if(err) {
        console.log(err)
      }
      res.send({ code: 200, docs })
    })
  })
})


// ------ POST 请求传参处理
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ------- POST 请求

//新增数据
router.post('/addInsideData', (req, res, next) => {
  let query = req.body;
  let id = query._id;  // 总表id
  table.findOne({ _id: id }, {}, (err, docs) => {
    let insideTableInfo = getInsideTableSchema(docs.tagSchema)
    let nowModel = insideTable[('lineTableData' + docs._id)];
    // 不存在这个 model 的时候 添加
    if(!nowModel) {
      insideTable[('lineTableData' + docs._id)] = mongoose.model('lineTableData' + docs._id, insideTableInfo);
      nowModel = insideTable[('lineTableData' + docs._id)];
    };
    let param = {...query};
    delete param._id;   //删掉该表的 id
    nowModel.create([param], (err) => {
      if(!err) {
        res.send({code:200,msg:'添加成功'})
      } else {
        res.send({code:301,msg:err});
      }
    })
  })

})

// 编辑数据
router.post('/editInsideData', (req, res, next) => {
  // table_id //总表的id    _id 该条数据的id
  let query = req.body;

})


module.exports = { router }