'use strict'
const CreatePaymentModel = require('../../../models/paypal/payment/create')
const paypal = require('paypal-rest-sdk')

module.exports = (router) => {

	router.post('/configure', (req, res) => {
		paypal.configure({
			'mode': req.body.env,
			'client_id': req.body.client_id,
			'client_secret': req.body.client_secret
		})
		res.json({ config: true })
	})

	router.post('/payment', (req, res) => {
		let paymentRequest = new CreatePaymentModel(req.body)
		paypal.payment.create(paymentRequest, (err, payment) => {
			if(err) {
				console.log('ERROR in POST /api/paypal/payment')
				console.log(err)
				console.log(JSON.stringify(paymentRequest))
				res.json(err)
			} else {
				res.json(payment)
			}
		})
	})

	router.get('/payment/:paymentId', (req, res) => {
		paypal.payment.get(req.params.paymentId, (err, payment) => {
			if(err) {
				console.log('ERROR in GET /api/paypal/payment/' + req.params.paymentId)
				console.log(err)
				res.json(err)
			} else {
				res.json(payment)
			}
		})
	})

	router.post('/payment/execute/:paymentId', (req, res) => {
		let reqBody = {}
			reqBody.payer_id = req.body.payer.payer_info.payer_id
		paypal.payment.execute(req.params.paymentId, reqBody, (err, payment) => {
			if(err) {
				console.log('ERROR in POST /api/paypal/payment/execute/' + req.params.paymentId)
				console.log(err)
				res.json(err)
			} else {
				res.json(payment)
			}
		})
	})
}
