import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { config } from 'dotenv'
import { fileURLToPath } from 'url';
import { userRouter } from './routers/UserRouter.js';
import { productRouter } from './routers/ProductRouter.js';
import './middleware/passport-config.js'
config();
const __dirname = fileURLToPath(import.meta.url)
const app = express();

app.use(express.static(path.join(path.dirname(__dirname), 'public')))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/', userRouter)
app.use('/products', productRouter)

mongoose.connect(process.env.DATABASE_URL).then(() => {
	console.log("DB connected")
})

app.listen(3000, () => {
	console.log("Server 🚀 is running on http://127.0.0.1:3000")
})