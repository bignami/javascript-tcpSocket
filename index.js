'use strict';

const { Console } = require('console');
const net = require('net');

const res = "HTTP/1.1 200 OK\r\n"+
"Content-Type: text/html\r\n"+
"Content-Length: 11\r\n"+
"\r\n"
+"Hello,world";

const err = "HTTP/1.1 404 Not Found\r\n"+
"Content-Type: text/html\r\n"+
"Content-Length: 11\r\n"+
"\r\n"
+"404Not Found";





const server = net.createServer(function(socket) {
    
    console.log('클라이언트 접속');


    socket.on('data', function(chunk) {
        
        const data = chunk.toString();
        
        console.log(data);

        const methodAndResource =data.substring(0,data.indexOf("HTTP")).split(" ") ;
        const method = methodAndResource[0];
        const resource = methodAndResource[1];
        const welcome = " welcome";

        let path = "";
        let param ="";
        let key = "";
        let value = "";
        let leftKey = "";
        let leftValue = "";
        let rightKey = "";
        let rightValue = "";
        let entityBodyLeft = "";
        let entityBodyRight="";

        let paramObj = {};
        let entityBobyLeftObj = {};
        let entityBobyRightObj = {};

        let contentLength = 0;
        let muitlyBobyRes = 0;

        if(resource.indexOf("?")>0){

            path = resource.substring(0,resource.indexOf("?"));
            param = resource.substring(resource.indexOf("?")+ 1);
            console.log(path, param,"PATH랑 Param");
            key = param.substring(0,param.indexOf("="));
            value = param.substring(param.indexOf("=")+1);

            paramObj.key = value;
            
            contentLength = paramObj.key.length + welcome.length;

        }
        else {
            path = resource;
        }
        
        if(data.indexOf("&")>0) {

            path = resource;
            
            entityBodyLeft = data.substring(data.indexOf("a=1"),data.indexOf("&"));
            entityBodyRight = data.substring(data.indexOf("&")+1);

            leftKey = entityBodyLeft.substring(0,entityBodyLeft.indexOf("="));
            leftValue = entityBodyLeft.substring(entityBodyLeft.indexOf("=") + 1);
            rightKey = entityBodyRight.substring(0,entityBodyRight.indexOf("="));
            rightValue = entityBodyRight.substring(entityBodyRight.indexOf("=") + 1);

            entityBobyLeftObj.leftKey = leftValue;
            entityBobyRightObj.rightKey = rightValue;
            
            muitlyBobyRes = entityBobyLeftObj.leftKey * entityBobyRightObj.rightKey;
            contentLength = muitlyBobyRes.toString().length;

            console.log(contentLength);
            
        }
        
        if(method === 'GET'){
            switch(path){
                case "/":
                    socket.write(res);
                    console.log(path);
                    break;  
                
                case "/Profile":
                    socket.write("HTTP/1.1 200 OK\r\n"+
                    "Content-Type: text/html\r\n"+
                    "Content-Length: "+contentLength+"\r\n"+
                    "\r\n"
                    +paramObj.key+ welcome);
                    break;
                    
                default :
                    socket.write(err);
                    break;

            }
        }
        if(method === 'POST'){
            switch(path){
                case "/calculator":
                    socket.write("HTTP/1.1 200 OK\r\n"+
                    "Content-Type: text/html\r\n"+
                    "Content-Length: "+contentLength+"\r\n"+
                    "\r\n"
                    +muitlyBobyRes);
                    console.log(path);
                    
                    break;

            }
        }
        
       
        console.log(method,path);

        console.log("HTTP/1.1 200 OK\r\n"+
        "Content-Type: application/x-www-form-urlencoded\r\n"+
        "Content-Length: "+contentLength+"\r\n"+
        "\r\n"
        +muitlyBobyRes);
        
    });
    ;
     
    socket.on('end', function() {
        console.log('클라이언트 접속 종료');
    });
    
});

server.listen({
    host: 'localhost',
    port: 80
},function() {
    const address = server.address();
    console.log(address);
})

/*server.on('close', function() {
    console.log('Server closed');
});
*/