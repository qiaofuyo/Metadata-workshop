// 代码被修改
const data = require('./secondaryClassify.json')

// 分类一级导航
// data.forEach((item,index)=>{
// 	let	temporary = {}

// 	temporary._id = item.id
// 	temporary.name = item.name
// 	temporary.primary_classify = String.fromCharCode((65+index))
// 	temporary.timestamp = parseInt(new Date().getTime()/1000)

// 	Arr.push(temporary)
// })


// 写入文件系统
// let fs = require('fs')
// let originData = JSON.stringify(object)
// fs.writeFile('secondaryClassify_data.json',originData,err=>{
// 	if(err) return console.log(err)
// 	console.log('saved.')
// })
