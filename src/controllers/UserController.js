import { User } from '../schemas/User.js';
import { Product } from '../schemas/Products.js';
import { config } from 'dotenv';
config()
import Jwt from 'jsonwebtoken';

async function createToken(id, email) {
	const maxAge = 1800000;
	return await Jwt.sign({ id, email }, process.env.JWT_SECRET, {
		expiresIn: maxAge,
	});
};

export class UserController {

	async home(req, res) {
		const token = req.cookies.jwt
		let loggedUser;
		if (token) {
			const decoded = await Jwt.verify(token, process.env.JWT_SECRET)
			const user = await User.findById({ _id: decoded.id })
			if (user) {
				loggedUser = user
				res.status(200)
				res.render('home', { user: loggedUser })
			}
		}
		else {
			loggedUser = null
			res.status(200)
			res.render('home', { user: loggedUser })
		}
	}

	async signin(req, res) {
		const { email, password } = req.body;
		try {
			const user = await User.login(email, password)
			if (user) {
				const token = await createToken(user._id, user.email);
				res.cookie('jwt', token, { httpOnly: true, maxAge: 1800000, secure: true, priority: "high" })
				res.status(200)
				res.redirect('/dashboard')
			}
		}
		catch (error) {
			res.status(400)
			res.render('errorpage', { error })
		}
	}
	async login(req, res) {
		res.status(200)
		res.render('login')
	}
	async signup(req, res) {
		res.status(200)
		res.render('signup')
	}
	async dashboard(req, res) {
		const token = req.cookies.jwt
		if (token) {
			res.status(200)
			const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findById({ _id: decoded.id })
			const users = await User.find()
			res.render('dashboard', { user: user, users: users })
		}
		else {
			res.redirect('/login')
		}
	}

	async register(req, res) {
		try {
			const user = await User.create(req.body);
			res.status(201)
			res.redirect('/login')
		}
		catch (error) {
			res.status(422)
			res.render('errorpage', { error })
		}
	}
}