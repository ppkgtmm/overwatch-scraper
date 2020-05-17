const fetch = require('node-fetch');
exports.getHTML = async function(url)
{
   let data = await fetch(url);
   if(data.status===200 && !data.error)
     {
          data = await data.text();
     }
   else if(data.error)
     {
          console.log(data.error);
          data = undefined;
     }
   else
     {
          data = undefined;
     }
   return data;    
}