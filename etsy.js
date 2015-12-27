//
var async = require('async');
// user logining data
var user = require('./user'),
	User = new user();
//selenium
var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
//db mysql
var mysql       = require('mysql'),
	db_data		= [];
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : User.data().name,
  password : User.data().passw,
  database : 'etsy',
  charset: 'utf8'
});

//site data
var	url = 'https://www.etsy.com';

etsy(url, driver, By, User, db_data,connection);
objUrl = {urls:url}
function etsy(url, driver, By, user, db_data, connection) {
	function init(connection) {
		connection.connect(function(err) {
		  if (err) {
		    console.error('error connecting: ' + err.stack);
		    return;
		  }
		 
		  console.log('connected as id ' + connection.threadId);
		});

		connection.query('SELECT * from links where count = 0', function(err, rows, fields) {
		  if (err) throw err;
		 
		   console.log('The solution is: ', rows);
		  return rows;
		});

		connection.end();

		return rows;
	}
/*	
	driver.findElement(By.name('q')).sendKeys('webdriver');
	driver.findElement(By.name('btnG')).click();
	driver.wait(until.titleIs('webdriver - Google Search'), 1000);
*/
/*async.series(logining, function (err, results) {
    // Результат будет массивом
    console.log(results); // [231, 24]
});*/
/*async.series(taskNamed, function (err, results) {
    // Результат будет объектом 
    console.log(results); // {viewsNumber: 231, growFactor: 24}
});*/
// async.waterfall()

	// logining(driver,user,url);
	// game(driver,db_data);

/*	async.series({
	        one: function(callback) {
	                callback(null,logining(driver,user,url) );
	            },
	        two: function(callback) {
	                callback(null, game());
	            },
	    },
	    function(err, response) {
	        // console.log('response:',response);
	        // response == {one: 'Node.js', two: 'JavaScript'}
	    }
	);*/

	async.waterfall(
	    [
	        function(callback) {
	            callback(null, logining(driver,user,url));
	        },
	        function(driver, callback) {
	            callback(null, driver);
	        },
	    ],
	    function (err, caption) {
	        console.log(caption);
	        // Node.js and JavaScript Rock!
	    }
	);

	driver.sleep(5000);
	driver.quit();
	
	function logining(driver,users, url,db_data) {
		var user = users.data(),
			open_login__form 		= '#sign-in',
			input_username__form 	= '#username-existing',
			input_passw__form 		= '#password-existing',
			submit_button__form		= '#signin-button'
			;

		driver.get(url);
		driver.findElement({css:open_login__form}).click();
		driver.sleep(1000);
		driver.findElement({css:input_username__form}).sendKeys(user.name);
		driver.findElement({css:input_passw__form}).sendKeys(user.passw);
		driver.findElement({css:submit_button__form}).click();

		return driver;
	}

	/**/
	function game(driver,db_data) {
		console.log('db_data:',db_data);
	}
}