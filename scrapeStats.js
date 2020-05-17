const cheerio = require('cheerio');
const utils = require('./utils');
const fs = require('fs');
let html = '';
let data = []
let $ = '';

function getFromtable(className,key,isFirst) {
  $('#tablepress-1 > tbody > tr >' + className).each((index, element) => {
        if(isFirst) {
            data.push({ 
                [key] : $(element).text() 
            });
        }
        else {
            if(index<data.length) {
                data[index][key] = $(element).text(); 
            }
        }
    });
}

exports.getStats = async function scrapeStats() {
    const url = 'https://overwatch.guide/stats/';
    html = await utils.getHTML(url);
    if(html!==undefined && html.length>0) {
        $ = cheerio.load(html);
        getFromtable('.column-1','name',true);
        getFromtable('.column-2','role',false);
        getFromtable('.column-3','totalHP',false);
        getFromtable('.column-4','health',false);
        getFromtable('.column-5','armor',false);
        getFromtable('.column-6','sheild',false);
        getFromtable('.column-7','ultimate_charge',false);
        const stats = {
            stats: data
        };
        fs.writeFileSync('stats.json', JSON.stringify(stats,null,2));
    }
    else {
        console.log('Unable to scrape data');
    }
}



