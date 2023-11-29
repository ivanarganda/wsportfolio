const express = require('express'),
app = express(),
server = require('http').createServer(app)

app.use(express.json())

let pathFound = true;

if ( app.mountpath  != '/download' || app.mountpath  != '/sendemail' ){ 

    pathFound = false;

}

if ( !pathFound ){

    app.get(app.mountpath , ( req , res)=>{
        res.send({
            'Error':404,
            'Msg':'Not found services path: /download or /sendemail'
        })
    }) 

}

app.get('/download',( req , res )=>{

    res.download( __dirname+'/documents/cv.pdf' )
    
})

server.listen(3000)
