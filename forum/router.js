var express=require('express')

var router=express.Router()

router.get('',function(req,res){
	res.render('index.html')
})

// 登录
router.get('/login',function(req,res){
	res.render('login.html')

})

router.post('/login',function(req,res){
	
})


// 注册
router.get('/register',function(req,res){
	res.render('register.html')
})

router.post('/register',function(req,res){
	
})



module.exports=router