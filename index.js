const fs = require('fs');
const fetch = require('node-fetch');
const statsScraper = require('./scrapeStats');
const optionScraper = require('./scrapeOptions');
let options = [];
async function getStats(){
    const stats = await statsScraper.getStats();
    fs.writeFileSync('stats.json', JSON.stringify(stats,null,2));
}
async function getOptions(){
    return await optionScraper.getOptions();
    
}
// getStats();
async function main()
{
    options = await getOptions();
    // console.log(options);

}
main();
