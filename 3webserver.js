const http = require('http');
 const server = http.createServer((req, res) => {
    console.log(req)
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello World\n')
})
server.listen(8080,'127.0.0.1',()=>{
    console.log("Server running at http://localhost:8080/")
})

