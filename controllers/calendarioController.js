import getFullSolicitudes from "../utils/getFullSolicitudes.js";

const getCalendario = (req,res) => {
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  // else if(req.user.role == 'admin'){
  //   res.redirect('/admin');
  // }
  else{
    res.render('calendario',{username: req.user.nickname, role: req.user.role});
  }
}
const getDataCalendario = async (req,res) => {

  if(req.user){
    const solicitudes = await getFullSolicitudes();
    const result = solicitudes.map((solicitud)=>{
      return {
        'title': solicitud.solicitudEvento.nombreEvento,
        'start': solicitud.solicitudEvento.dateEvento,
        'url':'/solicitud/'+ solicitud._id
      }
    });
    res.send(result);  
  }else{
    res.send('Acceso no autorizado')
  }

}
export {getCalendario, getDataCalendario};