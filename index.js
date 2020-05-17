const statsScraper = require('./scrapeStats');
const optionScraper = require('./scrapeOptions');
const utils = require('./utils');
const cheerio = require('cheerio');
const readline = require('readline');
const readlineSync = require('readline-sync');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let heroes = [];
let data = [];
async function getOptions() {
    return await optionScraper.getOptions();   
}

function parseOccupation(text) {
    const pattern = /Occupation:(.*)/
    const occupation  = text.match(pattern);
    if(occupation && occupation.length>=2)
    {
        return occupation[1].trim();
    }
    return null;
}

function parseBase(text) {
    const pattern = /Base of Operations:(.*)/
    const base  = text.match(pattern);
    if(base && base.length>=2)
    {
        return base[1].trim();
    }
    return null;
}

function parseAffiliation(text) {
    const pattern = /Affiliation:(.*)/
    const affiliation  = text.match(pattern);
    if(affiliation && affiliation.length>=2)
    {
        return affiliation[1].trim();
    }
    return null;
}

async function scrapeHero(heroData) {
    heroData = heroData[0];
    const html = await utils.getHTML(heroData.link);
    const $ = cheerio.load(html);
    let hero = {};
    hero.name = heroData.name;
    hero.image = heroData.imgUrl;
    hero.link = heroData.link;
    hero.role = $('.h2.hero-detail-role-name').text();
    hero.difficulty = $('.hero-detail-difficulty > span').not('.star.m-empty').length;
    hero.ability = [];
    $('.hero-detail-wrapper.m-same-pad').find('.hero-ability').each((index,element) => {
        hero.ability.push($(element).find('.hero-ability-descriptor > .h5').text());
    })
    hero.occupation = parseOccupation($('.occupation > .hero-bio-copy').text());
    hero.base = parseBase($('.base > .hero-bio-copy').text());
    hero.affiliation = parseAffiliation($('.affiliation > .hero-bio-copy').text());
    console.log(hero);
    data.push(hero);
}

function getChoice() {
    console.log('Available heroes to scrape');
    heroes.forEach(hero => console.log(`${hero.id} ${hero.name}`));
    let choice = readlineSync.question('Which hero(es) would you like to scrape? (enter -1 to exit)"\n');
    choice = parseInt(choice,10);
    return choice;
}

function validateChoice(choice) {
    if(!isNaN(choice)) {
            if(choice===-1) {
                return choice;
            }
            else if(choice<1 || choice>heroes.length) {
                console.log('You have entered invalid integer');
                return undefined;
            }
            else {
                return choice;
            }
        }
    else {
            console.log('Please enter an integer');
            return undefined;
        }
}

async function main() {
    heroes = await getOptions();
    const menu = 'Welcome!\nWhat would you like to scrape?\nA: stats\nB: heroData';
    console.log(menu);
    rl.on('line', async function(choice) {
        if(choice.toLocaleLowerCase().startsWith('A'.toLocaleLowerCase())) {
            await statsScraper.getStats();
        }
        else if(choice.toLocaleLowerCase().startsWith('B'.toLocaleLowerCase())) {
            while(true) {
                choice = getChoice();
                choice = validateChoice(choice);
                if(choice!==undefined && choice !==-1) {
                    let hero = heroes.filter(hero =>hero.id === choice);
                    await scrapeHero(hero);
                }
                else if(choice === -1) {
                    break;
                }
                readlineSync.keyIn('Press any key to continue...');
            }
        }
        else {
            console.log('Invalid option');
            rl.close();
            process.exit(1);
        }
        rl.close();
        process.exit(0);    
    });
}

main();
