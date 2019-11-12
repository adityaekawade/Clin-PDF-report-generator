#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplate = require('./documents');

const app = express();

const port = process.env.PORT || 4046;

app.use(cors());
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json({limit: '10mb', extended: true}));

app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {"orientation": "landscape", "border": {"top":"0.5in", "bottom": "0.5in"}}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

const args = process.argv.slice(2)
var data = args[0];
console.log(data)
// createPDF(data);


function createPDF(data){
  pdf.create(pdfTemplate(data), {"orientation": "landscape", "border": {"top":"0.5in", "bottom": "0.5in"}}).toFile('result.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }

      res.send(Promise.resolve());
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
