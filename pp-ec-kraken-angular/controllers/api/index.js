'use strict'
const paypalConfig = ppConfig()

module.exports = (router) => {

	router.get('/config', (req, res) => {
		res.json(paypalConfig)
	})

}