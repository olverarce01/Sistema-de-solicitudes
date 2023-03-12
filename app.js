import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import ejs from 'ejs';

import {getLogin, postLogin} from './controllers/loginController.js';
import { getHome } from './controllers/homeController.js';
import { getSolicitar, postSolicitar } from './controllers/solicitarController.js';
import { getSolicitud } from './controllers/solicitudController.js';
import { getCalendario, getDataCalendario } from './controllers/calendarioController.js';
import { postEliminarSolicitud } from './controllers/eliminarSolicitudController.js';

import session from 'express-session';
import passport from 'passport';
import User from './models/usuarioModel.js';
import { getAdmin, getDataBarAdmin, getDataDoughtnutAdmin, getDataRadialAdmin } from './controllers/adminController.js';
import { getLogOut } from './controllers/logOutController.js';
import { postAnular } from './controllers/anularController.js';
import { postActualizarEstado } from './controllers/actualizarEstadoController.js';

const app = express();

app.use(session({
	secret : 'Our little secret',
	resave : false,
	saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

//connection
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGO,{useNewUrlParser:true});

// 'mongodb://localhost:27017/solicitudDB'

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// User.register({rut: '20.355.445-0', nickname: 'Luis Perez', department: 'Matematica',username: 'luisperez01@gmail.com', telephone: '907804503', role: 'requester'},'12345',function(err,user){
// 	if(err){console.log(err)}else{
// 		console.log('user register');
// 	}
// })

//utils
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

//routes
app.get('/', getHome);
app.get('/admin', getAdmin);
app.get('/admin/dataDoughtnut', getDataDoughtnutAdmin);
app.get('/admin/dataRadial', getDataRadialAdmin);
app.get('/admin/dataBar', getDataBarAdmin);


app.get('/login', getLogin);
app.post('/login', postLogin);
app.get('/solicitar', getSolicitar);
app.post('/solicitar', postSolicitar);
app.get('/solicitud/:id', getSolicitud);
app.get('/calendario', getCalendario);

app.get('/calendario/data', getDataCalendario);

app.post('/solicitud/:id/estado', postActualizarEstado);

app.post('/anular/', postAnular);
app.post('/eliminar/', postEliminarSolicitud);
app.get('/logout', getLogOut);

//listening on port 3000
app.listen(process.env.PORT || 3000, function(){
	console.log('running in port', process.env.PORT || 3000)
});




