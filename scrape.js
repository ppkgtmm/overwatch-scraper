const fs = require('fs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const url = 'https://overwatch.guide/stats/';
let html = '';
let data = []
let $ = '';

async function fetchData()
{
   let data = await fetch(url);
   if(data.status===200 && !data.error){
       data = await data.text();
   }
   else if(data.error){
        console.log(data.error);
        data = undefined;
   }
   else{
        data = undefined;
   }
   return data;    
}
function getFromtable(className,key,isFirst) {
    $('#tablepress-1 > tbody > tr >' + className).each((index, element) =>{
        if(isFirst){
            
            data.push({ 
                [key] : $(element).text() 
            });

        }
        else{
            if(index<data.length)
            {
                data[index][key] = $(element).text(); 
            }
        }
    });
}
async function scrapeStats()
{
    html = await fetchData();
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

scrapeStats();



