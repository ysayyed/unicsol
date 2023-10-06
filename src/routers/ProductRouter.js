import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";
import passport from "passport";
export const productRouter = Router()

const controller = new ProductController()

productRouter.get('/', passport.authenticate('jwt', { session: false }), controller.home)

productRouter.get('/create', passport.authenticate('jwt', { session: false }), controller.createPage)

productRouter.post('/create', passport.authenticate('jwt', { session: false }), controller.create)

productRouter.post('/delete/:id', passport.authenticate('jwt', { session: false }), controller.delete)

productRouter.get('/update/:id', passport.authenticate('jwt', { session: false }), controller.updatePage)

productRouter.post('/update/:id', passport.authenticate('jwt', { session: false }), controller.update)
