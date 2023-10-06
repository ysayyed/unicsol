import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Please enter name'],
		unique: true
	},
	email: {
		type: String,
		required: [true, 'Please enter email'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Please enter password'],
		minLength: [6, 'Minimum password length is 6 characters']
	}

}, { timestamps: true, versionKey: false })

userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next()
})

userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error('Incorrect Password');
	}
	throw Error('Incorrect Email');
};

export const User = model('user', userSchema)