'use strict'

angular.module('ppECKrakenAngular').directive('ppButton', [ () => {
	return {
		restrict: 'E',
		scope: {
			token: '@'
		},
		controller: ['$scope', '$cookies', '$location', 'checkoutServiceModel', ($scope, $cookies, $location, checkoutServiceModel) => {
			$scope.model = checkoutServiceModel
			$scope.model.setup()
			$scope.button = $cookies.getObject('button-conf')
			$scope.env = $scope.button.env
			$scope.commit = $scope.button.commit
			$scope.style = $scope.button.style
			$scope.funding = $scope.button.funding
			$scope.payment = function () {
				return new paypal.Promise((resolve, reject) => {
					const cartError = $scope.checkCart()
					if(cartError === true) {
						$scope.model.createPayment().then((res) => {
							resolve(res.id)
						})
					} else {
						reject({error: 'no items in cart'})
					}
				}) 
			}
			$scope.onAuthorize = function(data, actions) {
				$cookies.putObject('on-authorize-data', data)
				$location.path('/order/review')
			}
			$scope.onCancel = function(data) {
				$cookies.putObject('on-cancel-data', data)
				$location.path('/cart')
			}
			$scope.onError = function(data) {
				$cookies.putObject('on-error-data', data)
				$location.path('/cart')
			}
			$scope.checkCart = () => {
				const cartData = $cookies.getObject('cart-cookie')
				if(cartData.items.length <= 0) {
					$('#emptyCartAlert').show()
					return false
				} else {
					return true
				}
			}
		}],
		templateUrl: '/js/partials/pp-button/template.html'
	}
}])