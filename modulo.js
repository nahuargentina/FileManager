
// Cargar el modulo HTTP
var http = require('http');

var dashboard = require('./dashboard.js');
 
// Configurar una respuesta HTTP para todas las peticiones
function onRequest(request, response) {
  console.log("Peticion Recibida.");
  console.log(response);
  dashboard.Principal()
  response.end();
}
 

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Data received');
})


var server = http.createServer(onRequest);



// Escuchar al puerto 8080
server.listen(8080);
 
// Poner un mensaje en la consola
console.log("Servidor funcionando en http://localhost:8080/");