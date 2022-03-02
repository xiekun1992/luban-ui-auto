const {Builder, By, Key, until} = require('selenium-webdriver');
// const { Options } = require('selenium-webdriver/chrome');

(async function test() {
    const fs = require('fs')
    fs.unlinkSync('C:\\Users\\xk\\.snapmaker-luban.json')

    // const options = new Options()
    // options.addArguments('user-data-dir=C:\\Users\\xk\\AppData\\Roaming\\snapmaker-luban1')
    // options.addArguments("profile-directory=Profile 1")

    const driver = await new Builder()
        .usingServer('http://localhost:9515')
        .withCapabilities({
            'goog:chromeOptions': {
                binary: 'C:\\Program Files\\Snapmaker Luban\\Snapmaker Luban.exe'
            }
        })
        .forBrowser('chrome')
        // .setChromeOptions(options)
        .build();

    try {
        await driver.wait(until.titleContains('Snapmaker Luban'))
        await driver.wait(until.elementLocated(By.css('body div[class*="ui-views-AppBar-appbar"]')))

        // set language
        await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath('//*[@id="modalFooter"]/div[1]/button')))).click()
        // enter 3dp
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[2]/div[1]/div[1]/div/div[2]/div/div[1]/a'))).click()
        // hide tutorial
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]'))).click()
        // show material settings
        await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div[2]/div[1]/div[2]/div[1]/div/div[1]/div/div[1]/div[2]/div/div[2]/div/span/div/div'))).click()
        // switch petg
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="modalBody"]/div/div[1]/ul/li[3]/a'))).click()
        // const els = await driver.findElements(By.xpath('//*[@id="modalBody"]/div/div[1]/ul/li'))
        // console.log(els)

        // const petgMenuItem = await els.find(async el => {
        //     const text = await el.getText()
        //     console.log(text === 'PETG')
        //     return text === 'PETG'
        // })
        // console.log(await petgMenuItem.getText())
        // await petgMenuItem.click()
        // create
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="modalBody"]/div/div[1]/div/div[2]/span[1]'))).click()
        // save
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="modalFooter"]/div[2]/button'))).click()
        // select newly added material
        await driver.sleep(2000);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="modalBody"]/div/div[1]/ul/li[4]/ul/li[1]'))).click()
        // change input value
        await driver.sleep(100);
        // printing temperature
        await driver.findElement(By.xpath('//*[@id="modalBody"]/div/div[2]/div[2]/div/div[2]/div[2]/div[1]/div/div/span/span/input')).sendKeys(222)
        // initial layer printing temperature
        await driver.findElement(By.xpath('//*[@id="modalBody"]/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/div/div/span/span/input')).sendKeys(223)
        // build plate temperature
        await driver.findElement(By.xpath('//*[@id="modalBody"]/div/div[2]/div[2]/div/div[2]/div[2]/div[5]/div/div/span/span/input')).sendKeys(77)
        // initial build plate temperature
        await driver.findElement(By.xpath('//*[@id="modalBody"]/div/div[2]/div[2]/div/div[2]/div[2]/div[6]/div/div/span/span/input')).sendKeys(77)
        
        // select
        await driver.wait(until.elementLocated(By.xpath('//*[@id="modalFooter"]/div[2]/button'))).click()
        
        // open file
        const uploadInput = await driver.findElement(By.xpath('/html/body/div[1]/div/div[2]/div[1]/div[2]/div[2]/div[1]/div[2]/div/div/div/div[1]/input'))
        await uploadInput.sendKeys('C:\\Users\\xk\\Downloads\\box4.stl')
        
        // gen gcode
        await driver.sleep(5000)
        await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div[2]/div[1]/div[2]/div[1]/div/div[2]/div[1]/div/button'))).click()

        await driver.sleep(5000);
    } catch (e) {
        console.log(e);
    } finally {
        await driver.quit();
    }
})();