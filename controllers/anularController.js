import Solicitud from "../models/solicitudModel.js";


const postAnular = (req, res) =>{
  const id = req.body.id;
  Solicitud.updateOne({_id: id},{status: 'Anulada'}, function(err){
    if(err){console.log(err)}else{
      console.log('anulada');
      res.redirect('/');
    }
  });
}
export {postAnular};