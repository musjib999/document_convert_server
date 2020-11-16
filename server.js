const express = require('express');
const app = express();

var fs = require('fs');
var path = require('path');


// app.post('/convert', upload.single("file"), function (req, res) {
//     console.log("Received file " + req.file.originalname);
//     var file = fs.createReadStream(req.file.path);
//     var dest = fs.createWriteStream('uploads/' + req.file.originalname);
//     file.pipe(dest);


//     file.on('end', function () {
//         fs.unlinkSync(req.file.path);
//         let convertedFile = Date.now() + 'download.pdf';
//         libreofficeConvert.convert(file, '.pdf', undefined, (err, done) => {
//             if (err) {
//                 fs.unlinkSync(req.file.path);
//                 console.log(`Error converting file: ${err}`);
//             }
//             let convert = fs.writeFileSync(convertedFile, done);
//             // res.json(convert);
//             console.log(done);
//         });
//         res.json({ status: 'success', message: 'OK: received ' + req.file.originalname });
//     });

//     file.on('error', function (err) { res.json('Something went wrong!', err); });

// });


app.post('/convert', (req, res) => {
    var filePath = path.join(__dirname, 'file.pdf');
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'file/pdf',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});



app.listen(3000, () => {
    console.log('Doc convertion server listening on port 3000')
});