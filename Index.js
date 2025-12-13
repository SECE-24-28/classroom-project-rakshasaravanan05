const http = require('http');

const server = http.createServer((req, res) =>{
    //set the content type to HTML
    res.writeHead(200, {'content-Type': 'text/html'});
    //write your HTML content
    res.write('<h1>Hello World</h1>');
    res.write('<p>This is HTML content served from Node.js</p>');
    res.end();
});

server.listen(3000, ()=>{
    console.log('Server running at http://localhost:3000/');
});