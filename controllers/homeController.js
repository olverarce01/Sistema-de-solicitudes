import getFullSolicitudes from "../utils/getFullSolicitudes.js";

const getHome = async (req,res) => {
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  else if(req.user.role == 'admin'){
    res.redirect('/admin');
  }
  else{

    const result = await getFullSolicitudes();
    const requesterResult = result.filter(solicitud =>{
      return solicitud.solicitudUser.rut == req.user.rut;
    })

    res.render('home', {solicitudes: requesterResult, username: req.user.nickname});  
  }
}
export {getHome};