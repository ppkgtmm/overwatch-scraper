const cheerio = require('cheerio');
const utils = require('./utils');
let html = '';
let data = []
let $ = '';
function extractOptions(){
    $('#menu-item-378 > ul > li > a').each((index, element)=>{
        if(index!==0)
        {
            // console.log($(element).attr('href'));
            data.push({
                name: $(element).text(),
                link: $(element).attr('href')
            })
        }
    })
}
exports.getOptions = async function scrapeOptions() {
    const url  = "https://overwatch.guide";
    html =  await utils.getHTML(url)
    // console.log(html);
    $ = cheerio.load(html);
    extractOptions();
    // console.log(data);
}
