import Solicitud from "../models/solicitudModel.js";
import Evento from "../models/eventoModel.js";

const postEliminarSolicitud = (req,res) => {
	const id = req.body.id;
	Solicitud.findOneAndDelete({_id: id},function(err, solicitud){
		if(err){console.log(err)}
		if(solicitud){
			const idEvento = solicitud.evento;
			Evento.deleteOne({_id: idEvento}, function(err){
				if(err){console.log(err)}
				res.redirect('/');
			})
		}		
	});
}
export {postEliminarSolicitud};