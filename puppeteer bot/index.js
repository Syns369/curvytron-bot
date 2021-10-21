const puppeteer = require("puppeteer");
const fs = require('fs/promises');

async function start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://www.curvytron.com/#/"); //navigate to curvyton website
    await new Promise(r => setTimeout(r, 500));
    
    await page.click("#submit"); //create room
    await new Promise(r => setTimeout(r, 500));
    
    await page.type("#profile-name", "VFX-BOT"); //set profile name
    await new Promise(r => setTimeout(r, 500));
    
    await page.click("#profile > div.profile-form.ng-scope > div > div > button"); //confirm profile
    await new Promise(r => setTimeout(r, 500));
    
    await page.click(".icon-params"); //open settings
    await new Promise(r => setTimeout(r, 500));
    
    await page.click("#open"); //set room as private
    await new Promise(r => setTimeout(r, 500));

    const url = await page.url();
    console.log(url);

    // const password = url.split("=").pop();
    // console.log(password);

    // await page.screenshot({path: 'test.png', fullPage:true}); //screenshot
    
    console.log('Ready, waiting for players ...');
    
    while (true) {
        const playerNumber = await page.$$eval(".player-name", (players) => {
            return players.length - 1;
        })
        
        const ready = await page.$$eval(".ready", (ready) => {
            return ready.length;
        })
        
        if (playerNumber > 1 && playerNumber === ready) {
            break
        }
        
        // console.log(playerNumber + " " + ready);
    }
    
    console.log("Party launch !");

    await browser.close();

}

start();