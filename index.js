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
        let entityBodyLeft = "";
        let entityBodyRight="";
        let paramObj = {};
        let contentLength = 0;

        if(resource.indexOf("?")>0){
            path = resource.substring(0,resource.indexOf("?"));
            param = resource.substring(resource.indexOf("?")+ 1);
            console.log(path, param,"PATH랑 Param");
            key = param.substring(0,param.indexOf("="));
            value = param.substring(param.indexOf("=")+1);

            paramObj.key = value;
            
            contentLength = paramObj.key.length + welcome.length;
        }else if(data.indexOf("&")>0) {

            entityBodyLeft = data.substring(data.indexOf("a=1"),data.indexOf("&"));
            console.log(entityBodyLeft,"엔터티 바디 왼쪽입니당.");
        }
        else {
            path = resource;
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

                case "/calculator":
                    socket.write(res);
                    break;
                default :
                    socket.write(err);
                    break;

            }
        }
        if(method == 'POST'){
            switch(path){
                case "/calculator":

            }
        }
        
        console.log(data);
   
        console.log(methodAndResource);
        
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