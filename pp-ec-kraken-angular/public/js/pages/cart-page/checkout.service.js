'use strict'

angular.module('ppECKrakenAngular').service('checkoutServiceModel', function ($http, $cookies) {

	function setup() {
		model.cart = $cookies.getObject('cart-cookie')
	}

	function checkCart() {
		if(typeof model.cart.items == 'undefined') {
			$('#emptyCartAlert').show()
			return { error: true }
		} else {
			return { error: false }
		}
	}

	function createPayment() {
		model.cart = $cookies.getObject('cart-cookie')
		const reqUrl = '/api/paypal/payment'
		const config = {
            'xsrfHeaderName': 'X-CSRF-TOKEN',
            'xsrfCookieName': 'XSRF-TOKEN'
        }
        return $http.post(reqUrl, model.cart, config).then((response) => {
        	model.paymentResponse = response.data
        	return model.paymentResponse
        })
	}

	let model = {
		cart: {},
		paymentResponse: {},
		createPayment: (model) => {
			return createPayment(model)
		},
		setup: (model) => {
			return setup(model)
		},
		checkCart: (model) => {
			return checkCart(model)
		}
	}

	return model
})
