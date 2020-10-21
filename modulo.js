var dashboard = require('./dashboard.js');
 
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));


//Llama a función que procesa archivo principal

app.post('/Procesar/', function (req, res) {
    let recibeFormu = req.body
    //console.log(dias);
    dashboard.Principal(recibeFormu.diasParaAtras);
    })
  
//Llama a función que backupea archivo principal 
  app.post('/Backupear/', function (req, res) {
    dashboard.Backupear()
    
  })

//Llama a función que backupea archivo principal en disco local
app.post('/BackupearLocal/', function (req, res) {
  dashboard.BackupearLocal()
  
})
  

app.listen(8000)