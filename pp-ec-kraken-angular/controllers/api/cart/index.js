'use strict'
const CartModel = require('../../../models/cart')

module.exports = (router) => {

	router.get('/items/:itemCount', (req, res) => {
		const items = new CartModel(req.params.itemCount)
		res.json(items)
	})

}