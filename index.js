const fs = require('fs');
const fetch = require('node-fetch');
const statsScraper = require('./scrapeStats');
const optionScraper = require('./scrapeOptions');
async function getStats(){
    const stats = await statsScraper.getStats();
    fs.writeFileSync('stats.json', JSON.stringify(stats,null,2));
}
async function getOptions(){
    return await optionScraper.getOptions();
    
}
async function scrapeHeros()
{
    const heroes = await getOptions();
    heroes.forEach(hero => {

    });
    
}
scrapeHeros();
// getStats();