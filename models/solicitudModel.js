import mongoose from 'mongoose';

const solicitudSchema = {
	dateSolicitud: Date,
	evento : {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Evento'
    },
	user : {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    },
    status: {
         type: String,
         default: 'No revisada'
    },
    sources: [String]
};
const Solicitud = mongoose.model('Solicitud',solicitudSchema);

export default Solicitud;