var express=require('express')
var path=require('path')
var router=require('./router')

var app=express()

app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))


// 模板引擎
app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views/'))

// 把路由挂到app中
app.use(router)

app.listen(5000,function(){
	console.log('running...')
})