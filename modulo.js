var dashboard = require('./dashboard.js');
 
const express = require('express')
const app = express()
const fs = require("fs")


app.get('/', function (req, res) {
  res.send('Principal ejecutado')
  res.send(dashboard.Principal())
})


app.listen(3000)