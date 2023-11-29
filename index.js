const express = require('express'),
app = express(),
server = require('http').createServer(app)

app.use(express.json())

if ( app.mountpath  != '/download' ){
    app.get(app.mountpath , ( req , res)=>{
        res.send({
            'Error':404,
            'Msg':'Not found download path'
        })
    })  

}

app.get('/download',( req , res )=>{
    res.download( __dirname+'/documents/cv.pdf' )
    
})


server.listen(3000)