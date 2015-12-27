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
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : User.data().name,
  password : User.data().passw,
  database : 'etsy',
  charset: 'utf8'
});

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
});

connection.end();
//site data
var	url = 'https://www.etsy.com';

etsy(url, driver, By, User);

function etsy(url, driver, By, user) {

/*	
	driver.findElement(By.name('q')).sendKeys('webdriver');
	driver.findElement(By.name('btnG')).click();
	driver.wait(until.titleIs('webdriver - Google Search'), 1000);
*/
	logining(driver,user,url);
	driver.sleep(5000);
	// driver.quit();
	
	function logining(driver,users, url) {
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

	}


}