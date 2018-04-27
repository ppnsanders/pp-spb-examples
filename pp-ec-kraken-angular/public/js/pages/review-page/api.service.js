'use strict'

angular.module('ppECKrakenAngular').service('reviewPageModel', function ($http, $cookies) {

	function setup() {
		model.action.onAuthorize = $cookies.getObject('on-authorize-data')
		model.action.onCancel = $cookies.getObject('on-cancel-data')
		model.action.onError = $cookies.getObject('on-error-data')
		model.orderData = $cookies.getObject('order-data')
		if(model.action.onAuthorize === 'undefined') {
			if(model.action.onCancel === 'undefined') {
				if(model.action.onError === 'undefined') {
					console.log('nothing is defined.. weird..')
				} else {
					$('onErrorData').show()
				}
			} else {
				$('#onCancelData').show()
			}
		} else {
			$('#onAuthorizeData').show()
			$('#paymentDetailsResponse').show()
			model.getPaymentDetails()
		}
	}

	function getPaymentDetails() {
		$('#paymentDetailsResponseLoading').show()
		const reqUrl = '/api/paypal/payment/' + model.action.onAuthorize.paymentID
		return $http.get(reqUrl).then((response) => {
			model.paymentDetailsResponse = response.data
			setTimeout(() => {
				$('#executePaymentButton').show()
				$('#paymentDetailsResponseJson').show()
				$('#paymentDetailsResponseLoading').hide()
			}, 1000)
		})
	}

	function executePayment() {
		$cookies.remove('cart-cookie')
		$cookies.remove('on-authorize-data')
		$('#onAuthorizeData').hide()
		$('#executePaymentButton').hide()
		$('#executePaymentResponse').show()
		$('#executePaymentResponseLoading').show()
		const reqUrl = '/api/paypal/payment/execute/' + model.action.onAuthorize.paymentID
		const config = {
            'xsrfHeaderName': 'X-CSRF-TOKEN',
            'xsrfCookieName': 'XSRF-TOKEN'
        }
        return $http.post(reqUrl, model.paymentDetailsResponse, config).then((response) => {
        	model.executePaymentResponse = response.data
        	setTimeout(() => {
        		$('#executePaymentResponseJson').show()
        		$('#executePaymentResponseLoading').hide()
        	})
        })
	}

	let model = {
		action: {},
		paymentDetailsResponse: {},
		executePaymentResponse: {},
		setup: (model) => {
			return setup(model)
		},
		getPaymentDetails: (model) => {
			return getPaymentDetails(model)
		},
		executePayment: (model) => {
			return executePayment(model)
		}
	}

	return model
})