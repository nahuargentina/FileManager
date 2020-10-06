
// cd "C://5 - Power BI"
// node dashboard
// node chrome

//Definificiones
let CRMRoto = false
let GestarRoto = false
let EbookRoto = false
let DiasParaAtras = 3 //Los lunes son 3 hasta el viernes, el resto de los días 1, feriados hay que contar
let EstadoPBI = 'Todo ok || Nro registro: n' // 'Todo ok' es el bien por defecto 

let Debaguear = true

//Fechas
let anio = "2020"
let mes = "10"
let hoy = "05"

//Discos
let Compartido = 'Z:'
let CarpetaCompartido = '//2 - MIS/5 - Power BI/'
let CarpetaEnC = '5 - Power BI/'
let DiscoCC = 'Y://INCIDENTES/' //Control Contable

let dataDiariaConFinde = 
[{Sistema:'Gestar', Posicion: 0, Texto: '2 -- Gestar_/Informe Gestar para PowerBI'},
{Sistema:'CRM', Posicion: 1, Texto: '3 -- CRM_/Informe Detallado CRM'},
{Sistema:'Productividad Real', Posicion: 2, Texto: '6 -- Productividad/Fte Real/FTE Real'},
{Sistema:'Productividad Real por usuario', Posicion:3, Texto: '6 -- Productividad/Productividad por usuario/FTE Real por Usuario'}] 

let dataDiariaSinFinde = [
  {Sistema:'E-book', Posicion: 0, Texto: '1 -- E-Book/E-Book Reestruc y Refinanc'},
  {Sistema:'Incidentes', Posicion: 1, Texto: '8 -- Incidentes/Incidentes Control Contable'}]

let dataMensual =
[{Sistema:'CRM Intervenciones', Posicion: 0, Texto: '3.1 -- CRM Intervenciones_/Intervenciones de Usuarios CRM'},
{Sistema:'Bantotal', Posicion: 1, Texto: '4 -- Bantotal/Reporte de Transacciones Bantotal'}]

let backUpalZ =
[{Sistema:'PBIX', discoOrigen: 'C', completaOrigen: '://5 - Power BI/Dashboard Operaciones', extension: '.pbix', DestinoEnCompartido:'//2 - MIS/6 - BUBU/PBI/Dashboard Operaciones'},
{Sistema:'BaseIncidentes', discoOrigen: DiscoCC, completaOrigen: 'Registro de Incidentes_be', extension: '.accdb', DestinoEnCompartido:'//2 - MIS/6 - BUBU/Base de Incidentes/Base de Incidentes'}]





//"On Error Resume Next"
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);});

const { Debaguear } = require('console')
// Librería FS
let fs = require('fs')
const { COPYFILE_EXCL } = fs.constants.COPYFILE_FICLONE_FORCE
  //Fs. Copia y pega archivos


    function callback(err) {if (err) throw err;
      console.log('Copiado');
    }

  //Fs. Sobrescribe en un txt el estado del PBI.
   function callback(err) {if (err) throw err;
      console.log('Realizado');
    }

    if(Debaguear){console.log(EstadoPBI)} else {fs.writeFile('/5 - Power BI/5 -- Archivos de Soporte/Estado.txt', EstadoPBI, 'utf8', callback)};



// A Procesar
function Procesamiento(){
    
   //Sistemas diarios con datos de fin de semana
  
   let dia;
   let fecha;  
   acumula = DiasParaAtras; 
  
   for (let i = 1; i<=DiasParaAtras;i+=1)
  {
  let di = hoy - acumula;
  dia = di.toString()
  if(dia.length=1){dia = "0"+ dia}
  fecha = anio + mes + dia;
  acumula -=1 

    // Arma el texto y da la orden de copiado
    for (let n=0; n<=(dataDiariaConFinde.length-1); n+=1) 
    {    
    //Si se rompe algun sistema que no se vaya a buscar
    if (dataDiariaConFinde[n].Sistema =='Gestar' && GestarRoto == true){}
    else if (dataDiariaConFinde[n].Sistema =='CRM' && CRMRoto == true){}
    else if (dataDiariaConFinde[n].Sistema =='Productividad Real' && (GestarRoto == true||CRMRoto == true||EbookRoto == true)){}
    else if (dataDiariaConFinde[n].Sistema =='Productividad Real por usuario' && (GestarRoto == true||CRMRoto == true||EbookRoto == true)){}
    else
      {
      let Origen = Compartido + CarpetaCompartido + dataDiariaConFinde[n].Texto + ' ' + fecha + '.txt';
      let Destino = 'C://' + CarpetaEnC + dataDiariaConFinde[n].Texto + ' ' + fecha + '.txt'         

      if(Debuguear){console.log(Origen,Destino)} else {fs.copyFile("\n" + Origen, "\n" + Destino, COPYFILE_EXCL,callback)}

      }
    } 
  }

  //Sistemas mensuales de informes diarios
  for (let n=0; n<=(dataMensual.length-1); n+=1) 
  {    
    let anioMes = anio +'-'+ mes
    
    //Si se rompe algun sistema que no se vaya a buscar
    if (dataMensual[n].Sistema =='CRM Intervenciones' && CRMRoto == true){}               
    
      {
      Origen = Compartido + CarpetaCompartido + dataMensual[n].Texto + ' ' + anioMes + '.txt';
      Destino = 'C://' + CarpetaEnC + dataMensual[n].Texto + ' ' + anioMes + '.txt'

      if(Debuguear){console.log(Origen,Destino)} else {fs.copyFile("\n" + Origen, "\n" + Destino, COPYFILE_EXCL,callback)}

      }
  }
   
  //Sistema diario sin fines de semana    
  for (let n=0; n<=(dataDiariaSinFinde.length-1); n+=1) 
  {      
    //Si se rompe E-Book que no se vaya a buscar
    if (dataDiariaSinFinde[n].Sistema =='E-book' && EbookRoto == true){}               
          
    //Procesamiento
    di = hoy-DiasParaAtras;
    dia = di.toString() //Para que sea string en todos los casos
    if(dia.length=1){dia = "0"+ dia}
    fecha = anio+mes+dia;

      {
      Origen = Compartido + CarpetaCompartido + dataDiariaSinFinde[n].Texto + ' ' + fecha + '.txt';
      Destino = 'C://' + CarpetaEnC + dataDiariaSinFinde[n].Texto + ' ' + fecha + '.txt'
      
      if(Debuguear){console.log(Origen,Destino)} else {fs.copyFile("\n" + Origen, "\n" + Destino, COPYFILE_EXCL,callback)}

      }
  }


  //Archivos para Backupear  
  for (let n=0; n<=(backUpalZ.length-1); n+=1) 
  {              
    di = hoy;
    dia = di.toString()
    if(dia.length=1){dia = "0"+ dia}
     
    
    fecha = anio+mes+dia;

      {
      Origen = backUpalZ[n].discoOrigen + backUpalZ[n].completaOrigen + backUpalZ[n].extension;
      Destino = Compartido + backUpalZ[n].DestinoEnCompartido + ' ' + fecha + backUpalZ[n].extension;
    
      if(Debuguear){console.log(Origen,Destino)} else {fs.copyFile("\n" + Origen, "\n" + Destino, COPYFILE_EXCL,callback)}

      }
  }

}

Procesamiento()
