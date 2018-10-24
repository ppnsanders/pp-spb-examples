'use strict'

module.exports = (router) => {

	router.get('/', (req, res) => {
		res.json({ nope: "nope"})
	})

}