const statsScraper = require('./scrapeStats');
const optionScraper = require('./scrapeOptions');
const utils = require('./utils');
const cheerio = require('cheerio');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let heroes = [];
async function getOptions(){
    return await optionScraper.getOptions();
    
}
async function scrapeHero(hero){
    const html = await utils.getHTML(hero.link);
    const $ = cheerio.load(html);
    hero.role = $('.h2.hero-detail-role-name').text();
    
    return hero;
}

    
async function main()
{
    heroes = await getOptions();
    const menu = 'Welcome!\nWhat would you like to scrape?\nA: stats\nB: heroData';
    console.log(menu);
    rl.on('line', async function(choice){
        if(choice.toLocaleLowerCase().startsWith('A'.toLocaleLowerCase())){
            await statsScraper.getStats();
        }
        else if(choice.toLocaleLowerCase().startsWith('B'.toLocaleLowerCase())){
            console.log('Which hero(es) would you like to scrape?');
            heroes.forEach(hero => console.log(`${hero.id} ${hero.name}`));
        }
        else{
            console.log('Invalid option');
            process.exit(1);
        }
        process.exit(0);
    })
    
}
main();
// statsScraper.getStats();