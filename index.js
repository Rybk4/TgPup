const puppeteer = require('puppeteer');
const readline = require('readline');

async function login() {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://web.telegram.org/k/');

  await page.waitForSelector('.btn-primary.btn-secondary.btn-primary-transparent.primary.rp');
  await page.waitForTimeout(1000);
  await page.click('.btn-primary.btn-secondary.btn-primary-transparent.primary.rp');

  console.log ('Кнопка нажата');

  page.waitForSelector('.input-field-input');
  await page.waitForTimeout(1000);
  const inputElements = await page.$$('.input-field-input');
  const inputElement = inputElements[1];
   
  await inputElement.type('+7 747 308 12 68')

  console.log('Номер ввели');             



  await page.waitForSelector('.btn-primary.btn-color-primary.rp');
  await page.waitForTimeout(1000);
  await page.click('.btn-primary.btn-color-primary.rp');

  console.log('Последнюю кнопку нажали');


  const pass = await new Promise((resolve) => {
    rl.question('Enter a value: ', (answer) => {
      resolve(answer);
    });
  });
                                  
  await page.waitForSelector('.input-field-input');
  await page.waitForTimeout(1000);
  
 

  const password = await page.$('input[class="input-field-input"]');
  await password.type(pass);

  await page.waitForTimeout(5000);
  await page.screenshot({path:'start.png'})

  const search = await page.$('input[class="input-field-input i18n input-search-input"]');
  await search.type('дкал')
  await page.waitForTimeout(5000);
  await page.screenshot({path:'final.png'})

  await browser.close();

}

login();