
// cd "C://5 - Power BI"
// node dashboard
 function Principal(DiasParaAtras){

  //Definificiones
  let CRMRoto = false;
  let GestarRoto = false;
  let EbookRoto = false;
  DiasParaAtras = parseInt(DiasParaAtras,10)

  console.log('Días hacia atras: ' + DiasParaAtras);

    let EstadoPBI = 'Todo ok || Nro registro: n'; // 'Todo ok' es el bien por defecto 

  let Debuguear = false;

  //Fechas
 
  //Discos
  let Compartido = 'Z:'
  let CarpetaCompartido = '//2 - MIS/5 - Power BI/'
  let CarpetaEnC = '5 - Power BI/'
  let DiscoCC = 'Y://INCIDENTES/' //Control Contable

  let dataDiaria = 
  [{Sistema:'Gestar',Texto: '/2 -- Gestar_/Informe Gestar para PowerBI'},
  {Sistema:'CRM', Texto: '3 -- CRM_/Informe Detallado CRM'},
  {Sistema:'Productividad Real', Texto: '6 -- Productividad/Fte Real/FTE Real'},
  {Sistema:'Productividad Real por usuario', Texto: '6 -- Productividad/Productividad por usuario/FTE Real por Usuario'},
  {Sistema:'E-book', Texto: '1 -- E-Book/E-Book Reestruc y Refinanc'},
  {Sistema:'Incidentes', Texto: '8 -- Incidentes/Incidentes Control Contable'},
  {Sistema:'Comex', Texto: '9 -- Comex/Informe Comex'}]

  let dataMensual =
  [{Sistema:'CRM Intervenciones', Posicion: 0, Texto: '3.1 -- CRM Intervenciones_/Intervenciones de Usuarios CRM'},
  {Sistema:'Bantotal', Posicion: 1, Texto: '4 -- Bantotal/Reporte de Transacciones Bantotal'}]

  let backUpalZ =
  [{Sistema:'PBIX', discoOrigen: 'C', completaOrigen: '://5 - Power BI/Dashboard Operaciones', extension: '.pbix', DestinoEnCompartido:'//2 - MIS/6 - BUBU/PBI/Dashboard Operaciones'},
  {Sistema:'BaseIncidentes', discoOrigen: DiscoCC, completaOrigen: 'Registro de Incidentes_be', extension: '.accdb', DestinoEnCompartido:'//2 - MIS/6 - BUBU/Base de Incidentes/Base de Incidentes'}]





  //"On Error Resume Next"
  process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);});

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
    if(Debuguear){console.log(EstadoPBI)} else {fs.writeFile('/5 - Power BI/5 -- Archivos de Soporte/Estado.txt', EstadoPBI, 'utf8', callback)};



  // A Procesar
  function Procesamiento(){
      
    //Sistemas diarios con datos de fin de semana
   
    let anio
    let mes
    let dia
    let di
    let me
    let acumula = 0

    
    for (let i = 1; i<=DiasParaAtras;i+=1)
    {
    
      let fechajs = new Date
      let fecha = new Date(fechajs.getTime() - 24*60*60*1000* (DiasParaAtras-acumula))   

      anio = fecha.getFullYear()
      me = fecha.getMonth()+1
      di = fecha.getDate()
      let numerodiasemana = fecha.getDay()
      let diasemana
      
      dia = di.toString()
      if(dia.length==1){dia = "0"+ dia}
      
      mes = me.toString()
      if(mes.length==1){mes = "0"+ mes}
      
      acumula = acumula + 1

      fecha = anio + mes + dia;
      
      switch (numerodiasemana) {
        case 0:
        diasemana ='Domingo';
          break;
      
        case 1:
        diasemana ='Lunes';
        break;
        
        case 2:
        diasemana ='Martes';
        break;
        
        case 3:
        diasemana ='Miércoles';
        break;
        
        case 4:
        diasemana ='Jueves';
        break;

        case 5:
        diasemana ='Viernes';
        break;

        case 6:
        diasemana ='Sábado';
        break;

      
        default:
          break;
      }

      

      // Arma el texto y da la orden de copiado
      for (let n=0; n<=(dataDiaria.length-1); n+=1) 
      {    
      //Si se rompe algun sistema que no se vaya a buscar
      if (dataDiaria[n].Sistema =='Gestar' && GestarRoto == true){}
      else if (dataDiaria[n].Sistema =='CRM' && CRMRoto == true){}
      else if (dataDiaria[n].Sistema =='E-book' && EbookRoto == true){}
      else if (dataDiaria[n].Sistema =='Productividad Real' && (GestarRoto == true||CRMRoto == true||EbookRoto == true)){}
      else if (dataDiaria[n].Sistema =='Productividad Real por usuario' && (GestarRoto == true||CRMRoto == true||EbookRoto == true)){}
      else
        {
        let Origen = Compartido + CarpetaCompartido + dataDiaria[n].Texto + ' ' + fecha + '.txt';
        let Destino = 'C://' + CarpetaEnC + dataDiaria[n].Texto + ' ' + fecha + '.txt'         

        if(Debuguear){console.log("\n" + Origen, "\n" + Destino, "\n" + dataDiaria[n].Sistema + " " + diasemana)} else {fs.copyFile(Origen, Destino, COPYFILE_EXCL,callback); console.log(dataDiaria[n].Sistema + " " + diasemana);}

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

        if(Debuguear){console.log("\n" + Origen, "\n" + Destino)} else {fs.copyFile(Origen,Destino, COPYFILE_EXCL,callback)}

        }
    }
    



    /*//Archivos para Backupear  
    for (let n=0; n<=(backUpalZ.length-1); n+=1) 
    {              
      di = hoy;
      dia = di.toString()
      if(dia.length==1){dia = "0"+ dia}
      
      
      fecha = anio+mes+dia;

        {
        Origen = backUpalZ[n].discoOrigen + backUpalZ[n].completaOrigen + backUpalZ[n].extension;
        Destino = Compartido + backUpalZ[n].DestinoEnCompartido + ' ' + fecha + backUpalZ[n].extension;
      
        if(Debuguear){console.log("\n" + Origen, "\n" + Destino)} else {fs.copyFile(Origen, Destino, COPYFILE_EXCL,callback)}

        }
    }*/

  }

  Procesamiento()


}



// Backupear archivos principales
function Backupear(){

  let date = new Date()

  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()



  //Discos
  let Compartido = 'Z:'


  let backUpalZ =
  [{Sistema:'PBIX', discoOrigen: 'C', completaOrigen: '://5 - Power BI/Dashboard Operaciones', extension: '.pbix', DestinoEnCompartido:'//2 - MIS/6 - BUBU/PBI/Dashboard Operaciones'}]


  //"On Error Resume Next"
  process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);});

  // Librería FS
  let fs = require('fs')
  const { COPYFILE_EXCL } = fs.constants.COPYFILE_FICLONE_FORCE
    //Fs. Copia y pega archivos

      function callback(err) {if (err) throw err;
        console.log('Copiado');
      }

    //Archivos para Backupear  
    for (let n=0; n<=(backUpalZ.length-1); n+=1) 
    {              
      di = day;
      let dia = di.toString()
      if(dia.length==1){dia = "0"+ dia}

      let elMes = month;
      let mes = elMes.toString()

      if(mes.length==1){dia = "0"+ dia}

      let elAnio = year;
      let Anio = elAnio.toString()



      let m = new Date()
      let hour = m.getHours()
      let laHora = hour.toString()

      let minutes = m.getMinutes()
      let losMinutos = minutes.toString()


      fechaAhora = Anio+mes+dia;
        {
        Origen = backUpalZ[n].discoOrigen + backUpalZ[n].completaOrigen + backUpalZ[n].extension;
        Destino = Compartido + backUpalZ[n].DestinoEnCompartido + ' ' + fechaAhora + ' at ' + laHora + '.' + losMinutos + backUpalZ[n].extension;
        }

        fs.copyFile(Origen, Destino, COPYFILE_EXCL,callback);


    }



  }




exports.Principal = Principal
exports.Backupear = Backupear

//Backupear()
// Principal()

