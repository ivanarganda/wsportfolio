const express = require('express'),
cors = require('cors'),
app = express(),
server = require('http').createServer(app);

const allowedOrigins = [ 'https://igvdeveloper.com' , 'http://localhost:5173', 'https://igvdeveloper-ws-com.onrender.com' ];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));


let pathFound = true;

if ( app.mountpath  != '/download' || app.mountpath  != '/sendemail' ){ 

    pathFound = false;

}

if ( !pathFound ){

    app.use(express.json())

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
