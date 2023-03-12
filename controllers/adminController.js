import Evento from "../models/eventoModel.js";
import Solicitud from "../models/solicitudModel.js";
import getFullSolicitudes from "../utils/getFullSolicitudes.js";

const getAdmin = async (req,res) => {
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }else if(req.user.role == 'requester'){
    res.redirect('/');
  }
  else{

    const result = await getFullSolicitudes();
    res.render('admin', {solicitudes: result, username: req.user.nickname});  
  }
}

const getDataDoughtnutAdmin = async (req,res) => {

  if(req.user){
    const solicitudes = await Solicitud.aggregate([
      {
        $lookup:
        {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'solicitudUser'
        }
      },
      {
        $group: {_id: '$status', countSolicitudes: {$sum: 1}}
      }
  
    ])
    res.send(solicitudes);
  
  }else{
    res.send('Acceso no autorizado')
  }
}

const getDataRadialAdmin = async (req,res) => {

  if(req.user){
    const solicitudes = await Solicitud.aggregate([
      {
        $lookup:
        {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'solicitudUser'
        }
      },
      {
        $group: {_id: '$solicitudUser.department', countDepartments: {$sum: 1}}
      }
  
    ])
    res.send(solicitudes);
  
  }else{
    res.send('Acceso no autorizado')
  }
}
const getDataBarAdmin = async (req,res) => {

  if(req.user){
    const mensual = await Evento.aggregate([
      {
        $group: 
        {
          _id: {
            year: { $year: "$dateEvento" }, 
            month: { $month: "$dateEvento" },   
          },
          countSolicitudes: {$sum: 1}
        }
      }
    ]);
  
    var months = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
             "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
  
    const resultado = mensual.map(mes =>{
      return {
        'year': mes._id.year,
        'month': mes._id.month,
        'count': mes.countSolicitudes
      }
    });
  
    res.send(resultado)
  
  }else{
    res.send('Acceso no authorizado')
  }
}


export {getAdmin,getDataDoughtnutAdmin, getDataRadialAdmin, getDataBarAdmin};