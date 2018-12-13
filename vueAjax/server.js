var http=require("http");
var strs=require("querystring");
let list=["./img/1.png","./img/2.png","./img/3.png"]
var server=http.createServer(function (req,res) {
    var data="";
    req.on("data",function (d) {
       data+=d
    });
    req.on("end",function () {
        resObj=list;
        res.writeHead(200,{"Content-Type":"text/html","Access-Control-Allow-Origin":"*"});
        res.end(JSON.stringify(list));
    })
});
server.listen(3003,"10.9.48.134",function () {
    console.log("开启服务")
});
