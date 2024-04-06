// app.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8080;

app.use(express.static('public'));

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function (req, file, cb, res) {
        let originalFileName = req.body.fileName || file.originalname;

        // Extract file name without extension
        const fileNameWithoutExtension = originalFileName.replace(/\.[^/.]+$/, "");

        // Determine file extension from original file name
        let fileExtension = path.extname(file.originalname);

        // Ensure file extension is supported, if not default to txt
        const supportedExtensions = ['.log', '.txt', '.json', '.yaml', '.xml', '.js'];
        if (!supportedExtensions.includes(fileExtension)) {
            return cb(new Error('File type not supported. Supported file extensions are: .log, .txt, .json, .yaml, .xml, .js'));
        }

        // Append extension to file name
        const newFileName = fileNameWithoutExtension + fileExtension;

        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });

// POST endpoint for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});

app.get('/', (req, res) => {
    res.send('Hello VINAY CHINDUKURI 2100032064!')
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
