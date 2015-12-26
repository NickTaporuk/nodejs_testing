var user = require('user');
var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
var url = 'http://etsy.com'
etsy(url,driver,By);

function etsy(url, driver, By) {
	driver.get(url);
	driver.findElement(By.name('q')).sendKeys('webdriver');
	driver.findElement(By.name('btnG')).click();
	driver.wait(until.titleIs('webdriver - Google Search'), 1000);
	driver.quit();		
}