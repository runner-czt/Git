var express = require('express');
var mysql = require('mysql');
var connection = require('../public/js/connet');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('login', { title: '教材征订管理系统' });
});

//	欢迎页面
router.get('/welcome', function (req, res) {
	res.render('welcome',{
		h:"欢迎来到教程征订系统"
	});
});
//	登录
router.post('/login', function (req, res) {
	if (req.body.utype === "学生") {
		console.log('我是学生');
		var selectSQL = 'SELECT `snumber`, `sname`, `ssex`, `sdepartment`, `class`, `spassword` FROM `student` WHERE `snumber` = '+req.body.userName;
		connection.query(selectSQL, function (err, result) {
			if(result.length === 0){
				res.render('login', { title: '教材征订管理系统' });
				return;
			}
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				return;
			}
			else if(result[0].spassword === req.body.password){
				res.render('index', { 
					title: '教材征订管理系统'
				});
			}
			else{
				res.render('login', { title: '教材征订管理系统' });
			}
		})
	}
	else {
		var selectSQL = 'SELECT `tnumber`, `tname`, `tsex`, `tdepartment`, `power`, `tpassword` FROM `teacher` WHERE `tnumber` = '+req.body.userName;
		connection.query(selectSQL, function (err, result) {
			if(result.length === 0)	
				{
					res.render('login', { title: '教材征订管理系统' });
					return;
				}
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				return;
			}
			else if(result[0].tpassword === req.body.password){
				res.render('index', { 
					title: '教材征订管理系统',
					power: result[0].power
				});
			}
			else{
				res.render('login', { title: '教材征订管理系统' });
			}
		})
	}
});
//	查询 课程信息
router.get('/lessonInfo', function (req, res){
	var sql = 'SELECT * FROM lesson';
	var lessons = [];
	connection.query(sql, function (err, result) {
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		if(result){
			for(var i = 0; i < result.length; i++){
				lessons.push({
					lnumber: result[i].lnumber || null,
					lname: result[i].lname || null,
					ltype: result[i].ltype || null,
					credit: result[i].credit || null,
				});
			}
		}
		res.render('lessonInfo',{
			lessons : lessons
		})
	})
})

//	查询 教材信息
router.get('/bookInfo', function (req, res){
	var sql = 'SELECT * FROM teaching';
	var teachings = [];
	connection.query(sql, function (err, result) {
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		if(result){
			for(var i = 0; i < result.length; i++){
				teachings.push({
					isbn: result[i].isbn || null,
					bookname: result[i].bookname || null,
					publish: result[i].publish || null,
					author: result[i].author || null,
					tprice: result[i].tprice || null,
				});
			}
		}
		res.render('bookInfo',{
			teachings : teachings
		})
	})
})

//	查询 征订信息
router.get('/bookingInfo', function (req, res){
	var sql = 'SELECT * FROM booking';
	var bookings = [];
	connection.query(sql, function (err, result) {
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		if(result){
			for(var i = 0; i < result.length; i++){
				bookings.push({
					bname: result[i].bname || null,
					lname: result[i].lname || null,
					tname: result[i].tname || null,
					class: result[i].class || null,
					num: result[i].num || null,
					bprice: result[i].bprice || null,
				});
			}
		}
		res.render('bookingInfo',{
			bookings : bookings
		})
	})
})
//	修改页面获取
//	课程页面
router.get('/addLesson', function (req, res) {
	var sql = 'SELECT * FROM lesson';
	var lessons = [];
	connection.query(sql, function (err, result) {
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		if(result){
			for(var i = 0; i < result.length; i++){
				lessons.push({
					lnumber: result[i].lnumber || null,
					lname: result[i].lname || null,
					ltype: result[i].ltype || null,
					credit: result[i].credit || null,
				});
			}
		}
		res.render('addLesson',{
			lessons : lessons
		})
	})
});
//	教材页面
router.get('/addBook', function (req, res) {
	var sql = 'SELECT * FROM teaching';
	var teachings = [];
	connection.query(sql, function (err, result) {
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		if(result){
			for(var i = 0; i < result.length; i++){
				teachings.push({
					isbn: result[i].isbn || null,
					bookname: result[i].bookname || null,
					publish: result[i].publish || null,
					author: result[i].author || null,
					tprice: result[i].tprice || null,
				});
			}
		}
		res.render('addBook',{
			teachings : teachings
		})
	})
});
//	征订页面
router.get('/addBooking', function (req, res) {
	var sql = 'SELECT * FROM booking';
	var bookings = [];
	connection.query(sql, function (err, result) {
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		if(result){
			for(var i = 0; i < result.length; i++){
				bookings.push({
					bname: result[i].bname || null,
					lname: result[i].lname || null,
					tname: result[i].tname || null,
					class: result[i].class || null,
					num: result[i].num || null,
					bprice: result[i].bprice || null,
				});
			}
		}
		res.render('addBooking',{
			bookings : bookings
		})
	})
});


//	增加课程
router.post('/addLesson', function (req, res){
	var addSQL = 'INSERT INTO lesson(lnumber,lname,ltype,credit) VALUES ('+req.body.lnumber+",'"+req.body.lname+"','"+req.body.ltype+"',"+req.body.credit+')';
	connection.query(addSQL, function (err, result) {
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			res.render('welcome',{
				h:"插入失败：" + err.message
			});
			return;
		}
		if(result){
			res.render('welcome',{
				h:"插入数据成功"
			})
		}
	});
});
//	删除课程
router.get('/deleteLesson', function (req, res){
	var deleteLesson = 'DELETE FROM `book`.`lesson` WHERE `lesson`.`lnumber` = '+ req.query.lnumber;
	connection.query(deleteLesson, function (err, result) {
		if (err) {
			console.log('[DELETE ERROR] - ', err.message);
			res.render('welcome',{
				h:"删除失败：" + err.message
			});
			return;
		}
		if(result){
			res.render('welcome',{
				h:"删除数据成功"
			});
		}
	});
});
//	修改课程
router.get('/updateLesson', function (req, res){
	var selectLesson = 'SELECT `lnumber`, `lname`, `ltype`, `credit` FROM `lesson` WHERE `lesson`.`lnumber` = '+ req.query.lnumber;
	connection.query(selectLesson, function (err, result) {
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			res.render('welcome',{
				h:"查询失败：" + err.message
			});
			return;
		}
		if(result){
			res.render('updateLesson',{
				lesson: result[0]
			});
		}
	});
});
router.post('/updateLesson', function (req, res){
	var updateLesson = "UPDATE `lesson` SET `lname`='"+req.body.lname+"',`ltype`='"+req.body.ltype+"',`credit`="+req.body.credit+" WHERE `lnumber` = "+req.body.lnumber;
	connection.query(updateLesson, function (err, result) {
		if (err) {
			console.log('[UPDATE ERROR] - ', err.message);
			res.render('welcome',{
				h: "修改失败：" + err.message
			});
			return;
		}
		if(result){
			res.render('welcome',{
				h: "修改成功"
			});
		}
	});
});

//	增加教材
router.post('/addBook', function (req, res){
	var addSQL = "INSERT INTO `teaching`(`isbn`, `bookname`, `publish`, `author`, `tprice`) VALUES ("+req.body.isbn+",'"+req.body.bookname+"','"+req.body.publish+"','"+req.body.author+"',"+req.body.tprice+')';
	connection.query(addSQL, function (err, result) {
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			res.render('welcome',{
				h:"插入失败：" + err.message
			});
			return;
		}
		if(result){
			res.render('welcome',{
				h:"插入数据成功"
			})
		}
	});
});
//	删除教材
router.get('/deleteBook', function (req, res){
	var deleteBook = 'DELETE FROM `book`.`teaching` WHERE `teaching`.`isbn` = '+ req.query.isbn;
	connection.query(deleteBook, function (err, result) {
		if (err) {
			console.log('[DELETE ERROR] - ', err.message);
			res.render('welcome',{
				h:"删除失败：" + err.message
			});
			return;
		}
		if(result){
			res.render('welcome',{
				h:"删除数据成功"
			});
		}
	});
});
//	修改教材
router.get('/updateBook', function (req, res){
	var selectBook = 'SELECT `isbn`, `bookname`, `publish`, `author`, `tprice` FROM `teaching` WHERE `isbn` = '+ req.query.isbn;
	connection.query(selectBook, function (err, result) {
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			res.render('welcome',{
				h:"查询失败：" + err.message
			});
			return;
		}
		if(result){
			res.render('updateBook',{
				teaching: result[0]
			});
		}
	});
});
router.post('/updateBook', function (req, res){
	var updateBook = "UPDATE `teaching` SET `bookname`='"+req.body.bookname+"',`publish`='"+req.body.publish+"',`author`='"+req.body.author+"',`tprice`="+req.body.tprice+" WHERE `isbn` = "+req.body.isbn;
	connection.query(updateBook, function (err, result) {
		if (err) {
			console.log('[UPDATE ERROR] - ', err.message);
			res.render('welcome',{
				h: "修改失败：" + err.message
			});
			return;
		}
		if(result){
			res.render('welcome',{
				h: "修改成功"
			});
		}
	});
});

//	删除征订
router.post('/addBooking', function (req, res){
	var addSQL = "INSERT INTO `booking`(`bname`, `lname`, `tname`, `class`, `num`, `bprice`) VALUES ('"+req.body.bname+"','"+req.body.lname+"','"+req.body.tname+"','"+req.body.class+"',"+req.body.num+','+req.body.bprice+')';
	connection.query(addSQL, function (err, result) {
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			res.render('welcome',{
				h:"插入失败：" + err.message
			});
			return;
		}
		if(result){
			res.render('welcome',{
				h:"插入数据成功"
			})
		}
	});
});
//	删除征订
router.get('/deleteBooking', function (req, res){
	var deleteBooking = "DELETE FROM `book`.`booking` WHERE `booking`.`bname` = '"+req.query.bname+"'";
	connection.query(deleteBooking, function (err, result) {
		if (err) {
			console.log('[DELETE ERROR] - ', err.message);
			res.render('welcome',{
				h:"删除失败：" + err.message
			});
			return;
		}
		if(result){
			res.render('welcome',{
				h:"删除数据成功"
			});
		}
	});
});
//	修改征订
router.get('/updateBooking', function (req, res){

	var selectBooking = "SELECT `bname`, `lname`, `tname`, `class`, `num`, `bprice` FROM `booking` WHERE `bname` = '"+req.query.bname+"'";
	connection.query(selectBooking, function (err, result) {
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			res.render('welcome',{
				h:"查询失败：" + err.message
			});
			return;
		}
		if(result){
			res.render('updateBooking',{
				booking: result[0]
			});
		}
	});
});
router.post('/updateBooking', function (req, res){
	var updateBooking = "UPDATE `booking` SET `lname`='"+req.body.lname+"',`tname`='"+req.body.tname+"',`class`='"+req.body.class+"',`num`="+req.body.num+",`bprice`="+req.body.bprice+" WHERE `bname` = '"+req.body.bname+"'";
	connection.query(updateBooking, function (err, result) {
		if (err) {
			console.log('[UPDATE ERROR] - ', err.message);
			res.render('welcome',{
				h: "修改失败：" + err.message
			});
			return;
		}
		if(result){
			res.render('welcome',{
				h: "修改成功"
			});
		}
	});
});

module.exports = router;