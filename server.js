const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer  = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var fs = require('fs');
var path = require('path');
var upload = multer({ dest: 'uploads/' });

app.post('/convert', upload.single("file"), (req, res) => {

    console.log("Received file " + req.file.originalname);
    var src = fs.createReadStream(req.file.path);
    var dest = fs.createWriteStream('uploads/' + req.file.originalname);
    src.pipe(dest);
    src.on('end', function() {
    	fs.unlinkSync(req.file.path);        
        //sending file as a response
        var filePath = path.join(__dirname, 'file.pdf');
        var stat = fs.statSync(filePath);
    
        res.writeHead(200, {
            'Content-Type': 'file/pdf',
            'Content-Length': stat.size
        });
    
        var readStream = fs.createReadStream(filePath);
        var str = readStream.pipe(res);
        console.log(str);
    });
    src.on('error', function(err) { res.json('Something went wrong!', err); });
   
});



app.listen(3000, () => {
    console.log('Doc convertion server listening on port 3000')
});