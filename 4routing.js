const http = require('http');
const fs =require('fs');
const url= require('url');
const replaceTemplate= require('./replaceTemplate');
//const { log } = require('console');



//SERVER


const tempOverview =fs.readFileSync(`${__dirname}/template/template-overview.html`,'utf-8');
const tempCard =fs.readFileSync(`${__dirname}/template/template-card.html`,'utf-8');
const tempProduct =fs.readFileSync(`${__dirname}/template/template-product.html`,'utf-8');


const data =fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj=JSON.parse(data);
     

const server = http.createServer((req, res) => {
    
    const {query,pathname}=(url.parse(req.url,true));
    // console.log(req.url);
    
//Overview page
   if(pathname ==='/'||pathname ==='/overview'){
    res.writeHead(200,{'Content-type':'text/html'});

    const cardsHtml =dataObj.map(el=> replaceTemplate(tempCard,el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
    res.end(output) 
   }
   //Product page
   else if (pathname=== '/product'){
    res.writeHead(200,{
        'Content-type':'text/html'});
        const product =dataObj[query.id];
        const output = replaceTemplate(tempProduct,product);
        res.end(output);
   }
   //API
   else if(pathname ==='/api'){

     res.writeHead(200,{
            'Content-type':'application/json'});
        res.end(data);  
        //NOT FOUND 
}else {
    res.writeHead(404,{
        'Content-type':'text/html',
        'my-own-header': 'Hello World'
    });
    res.end('<h1>Page not found!</h1>')
   }

})
server.listen(8080,'127.0.0.1',()=>{
    console.log("Server running at http://localhost:8080/")
})
