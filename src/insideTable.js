// 二级表格真实数据
const mongoose = require('mongoose');
const express = require('express');
const tableObj = require('./tableList')

const router = express.Router();

const table = tableObj.table;


//  以下两个都是需要考 传参来搜索表格的id来实现

const getInsideTableSchema = function(schemaList) {

    let sche = {};
    schemaList.forEach(ele => {
        sche[ele] = String;
    })

    return mongoose.Schema(sche, { strict: false })
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
    let param = JSON.parse(query.param);
    
    table.findOne({_id: param._id}, {}, (err, docs) => {
        let insideTableInfo = getInsideTableSchema(docs.tagSchema);
        let nowModel = insideTable[('lineTableData' + docs._id)];

        // 不存在这个 model 的时候 添加
        if (!nowModel) {
            insideTable[('lineTableData' + docs._id)] = mongoose.model('lineTableData' + docs._id, insideTableInfo);
            nowModel = insideTable[('lineTableData' + docs._id)];
        };
        let list = [];  // 返回给前端的参数
        let qq = {...param};
        let pages = param.pages; // 分页参数  page当前页 pageSize 每页条数 total 总数
        let {keywords,keywordsList} = qq;
        delete qq.keywords;
        delete qq.keywordsList;
        delete qq._id;
        delete qq.pages;
        for (const key in qq) {
          if(!qq || qq[key].trim() == '') {
            delete qq[key]
          }
        }
        nowModel.find({...qq}, {}, (err, docs) => {
          if (err) {
              console.log(err)
              res.send({code: 555,msg: '服务器错误'});
          }
          if(keywords.trim() !== '') {
            let str = '';
            docs.forEach(ele=>{
              str = '';
              keywordsList.forEach(kw=>{
                str += ele[kw]?ele[kw]:'' + '';
              })
              if(str.indexOf(keywords) !== -1) {
                list.push(ele);
              }
            })
          } else {
            list = docs;
          }
          let returnPages = {...pages};
          returnPages.total = list.length;
          list = list.splice((pages.page-1) * pages.pageSize,pages.pageSize);
          res.send({ code: 200, list:list, pages:returnPages})
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
    let id = query._id; // 总表id
    table.findOne({ _id: id }, {}, (err, docs) => {
        let insideTableInfo = getInsideTableSchema(docs.tagSchema)
        let nowModel = insideTable[('lineTableData' + docs._id)];
        // 不存在这个 model 的时候 添加
        if (!nowModel) {
            insideTable[('lineTableData' + docs._id)] = mongoose.model('lineTableData' + docs._id, insideTableInfo);
            nowModel = insideTable[('lineTableData' + docs._id)];
        };
        let param = {...query };
        delete param._id; //删掉该表的 id
        nowModel.create([param], (err) => {
            if (!err) {
                res.send({ code: 200, msg: '添加成功' })
            } else {
                res.send({ code: 301, msg: err });
            }
        })
    })

})

// 修改数据
router.post('/editInsideData', (req, res, next) => {
    // table_id //总表的id    _id 该条数据的id
    let query = req.body;
    table.findOne({ _id: query.table_id }, {}, (err, docs) => {
        let insideTableInfo = getInsideTableSchema(docs.tagSchema)
        let nowModel = insideTable[('lineTableData' + docs._id)];
        // 不存在这个 model 的时候 添加 model
        if (!nowModel) {
            insideTable[('lineTableData' + docs._id)] = mongoose.model('lineTableData' + docs._id, insideTableInfo);
            nowModel = insideTable[('lineTableData' + docs._id)];
        };
        let param = {...query };
        nowModel.find({ _id: param._id }, {}, (err, docs) => { //先查找是否有该条数据 再进行操作
            if (docs.length !== 0) {
                nowModel.updateOne({ _id: param._id }, {...param }, (err, docs) => {
                    if (!err) {
                        console.log('修改成功');
                        res.send({ code: 200, msg: '修改成功' })
                    } else {
                        res.send({ code: 301, msg: '修改失败' });
                        throw err;
                    }
                })
            }
        })
    })

})

//  删除数据 
router.post('/deleteInsideData', (req, res, next) => {
    // table_id //总表的id    _id 该条数据的id
    let query = req.body;
    table.findOne({ _id: query.table_id }, {}, (err, docs) => {
        let insideTableInfo = getInsideTableSchema(docs.tagSchema)
        let nowModel = insideTable[('lineTableData' + docs._id)];
        // 不存在这个 model 的时候 添加 model
        if (!nowModel) {
            insideTable[('lineTableData' + docs._id)] = mongoose.model('lineTableData' + docs._id, insideTableInfo);
            nowModel = insideTable[('lineTableData' + docs._id)];
        };
        let param = {...query };
        nowModel.find({ _id: param._id }, {}, (err, docs) => { //先查找是否有该条数据 再进行操作
            if (docs.length !== 0) {
                nowModel.deleteOne({ _id: param._id }, (err) => {
                    if (!err) {
                        res.send({ code: 200, msg: '删除' })
                    } else {
                        res.send({ code: 301, msg: '删除失败' });
                        throw err;
                    }
                })
            }
        })
    })
})


module.exports = { router }