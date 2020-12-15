'use strict';

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
        let path = "";
        let param ="";
        let key = "";
        let value = "";
        let paramObj = {};

        if(resource.indexOf("?")>0){
            path = resource.substring(0,resource.indexOf("?"));
            param = resource.substring(resource.indexOf("?")+ 1);
            console.log(path, param,"PATH랑 Param");
            key = param.substring(0,param.indexOf("="));
            value = param.substring(param.indexOf("=")+1);

            paramObj.key = value;
            
            
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
                    "Content-Length: 14\r\n"+
                    "\r\n"
                    +paramObj.key+" welcome");
                    break;

                case "/calculator":
                    socket.write(res);
                    break;
                default :
                    socket.write(err);
                    break;

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