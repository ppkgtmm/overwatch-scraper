const cors = require('cors')({origin:true});
const fetch = require('node-fetch');
const statsScraper = require('./scrapeStats');
statsScraper.getStats();