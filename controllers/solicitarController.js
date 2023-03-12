import Evento from "../models/eventoModel.js";
import User from "../models/usuarioModel.js";
import Solicitud from "../models/solicitudModel.js";

const getSolicitar = (req,res) => {
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  else if(req.user.role == 'admin'){
    res.redirect('/admin');
  }else{
    const dataUser = req.user;
    res.render('solicitar',{infoUser: dataUser});
  }
}

const postSolicitar = (req,res) => {
  const {rutSolicitante} = req.body;

	User.findOne({rut: rutSolicitante}, function(err, foundUser){
		if(err){res.send(err);}
		if(foundUser){
      const {nombreEvento, dateEvento, horario, centroCostos, recurso} = req.body;
      const nuevoEvento = new Evento({
        nombreEvento: nombreEvento,
        dateEvento: dateEvento,
        horario: horario,
        centroCostos: centroCostos,
      });     
      nuevoEvento.save();
      const nuevaSolicitud = new Solicitud({
				dateSolicitud: new Date(),
				evento: nuevoEvento,
				user: foundUser,
        sources: recurso
			});
			nuevaSolicitud.save((err)=>{
				if(err){res.send(err);}else{res.redirect('/')}
			})		
		}else{
      res.send('No found User');
		}
	})
}
export {getSolicitar, postSolicitar};