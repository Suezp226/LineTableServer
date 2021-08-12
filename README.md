# LineTableServer
平平无奇表格的 node后台服务


# TODO BUG1 
    目前有个 Bug  就是 新增 数据项之后 无法正常添加数据 应为 model 没有更新; 
    --- 已修复 再二层的 Schema中 第二个选项配置 {strict:false}  则 不在Schema 中的 键值对也会储存再 列表中

  
# TODO BUG2
  目前二级 数据库中  如果再外层表格参数删除数据项 二层中的数据还会保留  新增之后会出现冗余 
  思路：  通过 自动生成的 perkey 修改 每个key 没有独立性
  --- 已修复  手段： 原来的key 是根据上一个key 值 递增的 删除会出现bug  现在使用时间戳 精确到 秒  10位