import Solicitud from "../models/solicitudModel.js";

const postActualizarEstado = (req, res) =>{
  const id = req.params.id;
  const estado = req.body.estado;
  
  Solicitud.updateOne({_id: id},{status: estado}, function(err){
    if(err){console.log(err)}else{
      console.log('status updated');
      res.redirect('/solicitud/'+id);
    }
  });

}

export {postActualizarEstado};