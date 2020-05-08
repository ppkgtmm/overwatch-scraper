const fetch = require('node-fetch');
const statsScraper = require('./scrapeStats');
const optionScraper = require('./scrapeOptions');

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
statsScraper.getStats();