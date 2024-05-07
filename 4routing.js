const http = require('http');
const url= require('url');

const server = http.createServer((req, res) => {
   // console.log(req.url)
   const pathName = req.url;
   if(pathName ==='/overview'){
    res.end('This is the overview page') 
   }else if (pathName === '/contacts'){
    res.end('This is the contacts page') 
   } else {
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
