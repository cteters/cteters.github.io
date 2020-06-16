require('dotenv').config();
const express = require('express');
const path = require('path');
const sendMail = require('./mail');
const { log } = console;
const app = express();

const PORT = 8080;


// Data parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());



// email, subject, text
app.post('/', (req, res) => {
    const { subject, email, text } = req.body;
    log('Data: ', req.body);

    sendMail(email, subject, text, function(err, data) {
        if (err) {
            log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        log('Email sent');
        return res.json({ message: 'Email sent' });
    });
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


// Render home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

//app.get('/:response-message', (req, res) => {
//    res.sendFile(path.join(__dirname, 'views', 'index.html'));
//});

app.use(express.static(__dirname));

//const server = app.listen(process.env.PORT || 8080, () => {
//    const host = server.address().address;
//    const port = server.address().port;
//});


// Start server
app.listen(PORT, () => log('Server is starting on PORT, ', 8080));