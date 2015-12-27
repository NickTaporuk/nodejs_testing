var user = require('./user');
var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
var	url = 'https://www.etsy.com',
	User = new user();
etsy(url, driver, By, User);
//console.log('UserData', User.data().name);

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