// 提取请求一级分类时响应的数据

let generate = function (classify, classify_index, DirtyData) {
	function extract(classify_name, classify_index, DirtyData) {
		const data = require(DirtyData).data.cate // 脏数据源
		if (data === null) return console.log('脏数据文件为空')
		let object = {}
		// 1
		object.name = classify_name // 根据不同的一级分类修改
		// 2
		object.primary_classify = classify_index // 根据不同的一级分类号修改
		// 3 生成 cate
		let cate = []
		data.forEach((item, index) => {
			let temporary = {}
			// 3-1
			temporary.name = item.name
			// 3-2
			if (index < 9) {
				temporary.secondaryClassify = object.primary_classify + '0' + (index + 1)
			} else {
				temporary.secondaryClassify = object.primary_classify + (index + 1)
			}
			// 3-3 提取源数据生成 products
			let products = []
			for (let value of item.products) {
				let temp = {} // 提取单件商品信息

				temp.secondaryClassify = temporary.secondaryClassify
				temp.name = value.name
				temp.describe = value.spec
				temp.image_url = value.small_image
				temp.price = value.price
				temp.origin_price = value.origin_price
				temp.sold = value.total_sales
				temp.inventory = Math.ceil(value.total_sales / 150)
				temp.timestamp = parseInt(new Date().getTime() / 1000)
				temp.reserved1 = ''
				temp.reserved2 = ''
				temp.reserved3 = ''

				products.push(temp)
			}
			temporary.products = products
			// temporary.products = JSON.stringify(products)
			// 3-4
			temporary.timestamp = parseInt(new Date().getTime() / 1000)
			cate.push(temporary)
		})
		object.cate = cate
		// 4
		object.timestamp = parseInt(new Date().getTime() / 1000)

		// 提取无误,输出
		return object
	}

	// 验证提取的信息
	let object = extract(classify, classify_index, DirtyData)
	// console.log(object)
	// console.log(object.cate[1])
	// console.log(object.cate[1].products[0])

	let fs = require('fs')
	let sourceAddress = '../成品/二级分类/secondaryClassify_' + classify_index + '_data.json'
	let targetAddress = '../入库/二级分类/secondaryClassify_' + classify_index + '_data.json'
	// 写入成品文件系统
	let originData = JSON.stringify(object)
	fs.writeFile(sourceAddress, originData, err => {
		if (err) return console.log(err)
		console.log('saved.')
		// 从成品中拷贝至入库文件系统
		fs.copyFile(sourceAddress, targetAddress, function(err) {
			if (err) console.log('something wrong was happened')
			else console.log('copy file succeed');
		})
	})

}

const primaryClassify_data = require('../成品(封装前)/一级分类/primaryClassify_data.json')

primaryClassify_data.forEach(( item ) => {
	let classify = item.name	// 一级分类
	let classify_index = item.primary_classify  // 一级分类号
	let DirtyData = '../脏数据/secondaryClassify_' + classify_index+ '_data.json' // 脏数据地址
	generate(classify, classify_index, DirtyData)
})