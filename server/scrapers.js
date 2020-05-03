const puppeteer = require ('puppeteer');

async function scrapeChannel(url){
    
    const browser = puppeteer.launch();
    const page = (await browser).newPage();
    (await page).goto(url);

    const [e1] = (await page).$('/html/body/ytd-app/div/ytd-page-manager/ytd-browse[2]/div[3]/ytd-c4-tabbed-header-renderer/app-header-layout/div/app-header/div[2]/div[2]/div/div[1]/div/div[1]/ytd-channel-name/div/div/yt-formatted-string');
    const text = e1.getProperty('textContent');
    const name = await text.jsonValue();

    const [e12] = (await page).$('//*[@id="img"]');
    const src = await e12.getProperty('src');
    const avatarURL = await src.jsonValue();

    (await browser).close();

    console.log({name,avatarURL});
    
    return {name,avatarURL};

}


scrapeChannel('http://www.youtube.com/c/codedrip');
