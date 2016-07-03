var http = require("http");
http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("爸爸我回来啦！");
    response.end();
}).listen(8000);