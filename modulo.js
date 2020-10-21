var dashboard = require('./dashboard.js');
 
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));



app.post('/Procesar/', function (req, res) {
    
    let recibeFormu = req.body
    //console.log(dias);
    dashboard.Principal(recibeFormu.diasParaAtras);
    
  })
  

  //res.send(dashboard.Backupear())
  


app.listen(8000)