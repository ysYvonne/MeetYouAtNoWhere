var http = require("http");
http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8";pageEncoding="utf-8"});
    response.write("王爸爸回来啦！");
    response.end();
}).listen(8000);
