import { Schema, model } from 'mongoose'

const productSchema = new Schema({
	name: {
		type: String,
		required: [true, "Product name is required"],
		unique: true
	},
	price: {
		type: Number,
		required: [true, "Price is required"]
	},
}, { timestamps: true, versionKey: false })

export const Product = model('product', productSchema)