import mongoose from 'mongoose';
const eventoSchema =  new mongoose.Schema({
	nombreEvento: String,
	dateEvento: Date,
	horario: String,
	centroCostos: String
})

const Evento = mongoose.model('Evento', eventoSchema);

export default Evento;