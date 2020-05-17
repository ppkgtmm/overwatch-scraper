const cheerio = require('cheerio');
const utils = require('./utils');
let html = '';
let data = []
let $ = '';

function extractOptions() {
    $('.hero-portrait-detailed').each((index, element)=> {
            data.push({
                id: index+1,
                name: $(element).find('.container > .portrait-title').text(),
                link: 'https://playoverwatch.com'+ $(element).attr('href'),
                imgUrl: $(element).find('img').attr('src'),
            })
    })
}

exports.getOptions = async function scrapeOptions() {
    const url  = "https://playoverwatch.com/en-us/heroes";
    html = await utils.getHTML(url);
    $ = cheerio.load(html);
    extractOptions()
    return data;  
}


