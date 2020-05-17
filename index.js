const statsScraper = require('./scrapeStats');
const optionScraper = require('./scrapeOptions');
const utils = require('./utils');
const cheerio = require('cheerio');
var readline = require('readline');
var readlineSync = require('readline-sync');
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

function getChoice(){
    console.log('Available heroes to scrape');
    heroes.forEach(hero => console.log(`${hero.id} ${hero.name}`));
    let choice = readlineSync.question('Which hero(es) would you like to scrape? (enter -1 to exit)"\n');
    choice = parseInt(choice,10);
    return choice;
}

function validateChoice(choice) {
    if(!isNaN(choice))
                {
                    if(choice===-1)
                    {
                        return choice;
                    }
                    else if(choice<1 || choice>heroes.length)
                    {
                        console.log('You have entered invalid integer');
                        return undefined;
                    }
                    else{
                        return choice;
                    }
                }
                else{
                    console.log('Please enter an integer');
                    return undefined;
                }
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
            while(true)
            {
                let choice = getChoice();
                choice = validateChoice(choice);
                if(choice!==undefined)
                {
                    console.log('choice');
                }
                readlineSync.keyIn('Press any key to continue...');
            }
        }
        else{
            console.log('Invalid option');
            rl.close();
            process.exit(1);
        }
        rl.close();
        process.exit(0);
    })
    
}
main();
