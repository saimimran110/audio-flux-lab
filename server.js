const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS for frontend
app.use(cors());

// Serve static files from output directory
app.use('/output', express.static('output'));

const upload = multer({ dest: 'uploads/' });

app.post('/separate', upload.single('audio'), (req, res) => {
    console.log('Received file:', req.file.originalname);
    
    const inputPath = path.resolve(req.file.path);
    const outputPath = path.resolve('output', req.file.filename);

    console.log('Processing audio file with Spleeter...');
    
    // Run Spleeter separation
    exec(`spleeter separate -i ${inputPath} -o output/`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error processing audio');
        }

        console.log('Spleeter processing completed');
        console.log('Vocals and instrumental tracks generated');

        res.json({
            message: 'Separation done',
            vocalsPath: `/output/${req.file.filename}/vocals.wav`,
            accompanimentPath: `/output/${req.file.filename}/accompaniment.wav`
        });
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
    console.log('Make sure you have Spleeter installed: pip install spleeter');
});