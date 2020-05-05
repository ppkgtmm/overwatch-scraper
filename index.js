const cors = require('cors')({origin:true});
const fetch = require('node-fetch');
const statsScraper = require('./scrapeStats');
const optionScraper = require('./scrapeOptions');
statsScraper.getStats();
optionScraper.getOptions();
