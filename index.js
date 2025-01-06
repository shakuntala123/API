const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}:${req.url}: New Request Received \n`;
    
    // Log request to a file (non-blocking)
    fs.appendFile('log.txt', log, (err) => {
        if (err) {
            console.error("Error writing to log file", err);
        }
    });

    if (req.url === "/favicon.ico") {
        return res.end(); 
    }

    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    switch (myUrl.pathname) {
        case '/':
            res.end("Home Page");
            break;
        case '/about':
            const username = myUrl.query.myname || "Guest";
            res.end(`Hello, ${username}`);
            break;
        case '/search':
            const search = myUrl.query.search_query || "nothing"; 
            res.end('Here are your results for ' + search);
            break;
        default:
            res.statusCode = 404; 
            res.end("404 Not Found!!!!");
    }
});

myServer.listen(8000, () => console.log("Server started on port 8000!!!"));
