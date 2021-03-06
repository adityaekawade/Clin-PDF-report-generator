#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplate = require('./documents');

const app = express();

const port = 4046;

app.use(cors());
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json({limit: '10mb', extended: true}));

var pdfId;

app.post('/analysistoreport/create-pdf', (req, res) => {
  pdfId = Math.random().toString(36).substring(7);
    pdf.create(pdfTemplate(req.body), {"orientation": "potrait", "border": {"top":"0.5in", "bottom": "0.5in"}}).toFile(`results/result_${pdfId}.pdf`, (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

app.get('/analysistoreport/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/results/result_${pdfId}.pdf`)
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
