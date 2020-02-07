// // 原生js写法
// // 使用http模块, 发出http请求
// const http=require('http')
// // 爬 http://www.baidu.com
// http.get('http://www.baidu.com',(response)=>{
// 	response.setEncoding('utf8')
// 	// 请求成功时
// 	response.on('data',(response)=>{
// 		console.log(response)
// 	})
// })

// 使用封装 hhtp 的 request
// var request = require('request');
// request('http://www.baidu.com', function (error, response, body) {
//   console.log('error:\n', error);
//   console.log('statusCode:\n', response && response.statusCode);
//   console.log('body:\n', body);
// });


let request = require("request");
let fs = require("fs");
const data = require('./homeHomeList_data.json')

for (let value of data) {
	let url = value.image_url;
	let time = new Date().getTime();
	// let path = "./imgs/0000" + i + ".jpg";
	let path = "./imgs/"+time+".jpg";
	request.get(url).pipe(fs.createWriteStream(path))
}
