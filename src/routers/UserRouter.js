import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import passport from "passport";
const controller = new UserController()
export const userRouter = Router()
userRouter.get('/', controller.home)
userRouter.get('/signup', controller.signup)
userRouter.get('/login', controller.login)
userRouter.post('/register', controller.register)
userRouter.post('/signin', controller.signin)
userRouter.get('/dashboard', passport.authenticate('jwt', { session: false }), controller.dashboard)
userRouter.post('/logout', (req, res) => {
	res.status(200)
	res.clearCookie('jwt')
	res.redirect("/")
})
userRouter.get('/products', (req, res, next) => {
	next()
})