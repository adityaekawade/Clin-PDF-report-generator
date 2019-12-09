#!/usr/bin/env node

const pdf = require('html-pdf');

const pdfTemplate = require('./documents');

const fs = require('fs');


const args = process.argv.slice(2)
var fileName = args[0];
console.log(fileName)
// createPDF(data);

fs.readFile(fileName, 'utf-8', (error, data) => {
    if (error) throw error;
    console.log("fileName is :", fileName, "data is ", typeof data);
    var jsn = JSON.parse(data);
    console.log("typeof ", typeof jsn);
    createPDF(jsn);
});


function createPDF(data){
  pdf.create(pdfTemplate(data), {"orientation": "landscape", "border": {"top":"0.5in", "bottom": "0.5in"}}).toFile('result.pdf', (err) => {
  });
}
