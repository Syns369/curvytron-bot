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

    const url = await page.url();

    console.log(url);
    
    console.log('ready');
    
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
        
        console.log(playerNumber + " " + ready);
    }
    await browser.close();
}

start();
