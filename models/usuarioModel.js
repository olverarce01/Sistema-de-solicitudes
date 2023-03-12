import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';


const userSchema = new mongoose.Schema({
	rut: String,
	username: String,
	password: String,
	department: String,
	nickname: String,
	telephone: String,
	role: String
});
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model('User',userSchema);



export default User;