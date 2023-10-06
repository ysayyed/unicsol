import { Product } from '../schemas/Products.js';
import { config } from 'dotenv';
config()

export class ProductController {
	async home(req, res) {
		try {
			const products = await Product.find()
			res.status(200)
			res.render('products', { products })
		}
		catch (error) {
			res.status(400)
			res.render('errorpage', { error })
		}
	}

	async createPage(req, res) {
		res.render('createProduct')
		res.end()
	}

	async updatePage(req, res) {
		const id = req.params.id
		const product = await Product.findById({ _id: id })
		res.render('updatePage', { product })
		res.end()
	}

	async create(req, res) {
		try {
			await Product.create(req.body)
			res.status(201)
			res.redirect('/products')
		}
		catch (error) {
			res.status(422)
			res.render('errorpage', { error })
		}
	}

	async delete(req, res) {
		const id = req.params.id
		try {
			const product = await Product.findById({ _id: id })
			if (product) {
				await Product.deleteOne({ _id: id })
				res.status(200)
				res.redirect('/products')
			}
		}
		catch (error) {
			res.status(400)
			res.render('errorpage')
		}
	}

	async update(req, res) {
		const id = req.params.id
		try {
			const product = await Product.findById({ _id: id })
			if (product) {
				await Product.updateOne({ _id: id }, { name: req.body.name, price: req.body.price })
				res.status(200)
				res.redirect('/products')
			}
		}
		catch (error) {
			res.status(400)
			res.render('errorpage')
		}
	}
}