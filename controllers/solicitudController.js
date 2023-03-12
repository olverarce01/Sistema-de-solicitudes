import Solicitud from "../models/solicitudModel.js";
import User from "../models/usuarioModel.js";
import Evento from "../models/eventoModel.js";

const getSolicitud = (req,res) => {
	const id = req.params.id;
	if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  // else if(req.user.role == 'admin'){
  //   res.redirect('/admin');
	// }
	else{
		const dataUser = req.user;
		Solicitud.findOne({_id:id},async function(err,foundSolicitud){
			const eventoID = foundSolicitud.evento;
			const userID = foundSolicitud.user;
			const foundUser = await User.findOne({_id:userID})
			const foundEvento = await Evento.findOne({_id:eventoID});
	
			const infoSolicitud = {
					id: foundSolicitud._id,
					status: foundSolicitud.status,
					sources: foundSolicitud.sources,
					dateSolicitud: foundSolicitud.dateSolicitud,
					...foundUser._doc,...foundEvento._doc
			}
			res.render('solicitud', {solicitud: infoSolicitud, dataUser: dataUser});
		});
			
	}

}
export {getSolicitud};