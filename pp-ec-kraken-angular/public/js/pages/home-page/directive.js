'use strict'

angular.module('ppECKrakenAngular').directive('homePage', [ ($cookies) => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', '$cookies', '$location', '$http', ($scope, $cookies, $location, $http) => {
			$scope.merchantConf = $cookies.getObject('merchant-conf')
			$scope.merchant = {}
			$scope.merchant.env = ""
			$scope.merchant.email = ""
			$scope.merchant.payerId = ""
			$scope.merchant.client_id = ""
			$scope.merchant.client_secret = ""
			$scope.configurePayPal = () => {
				const config = {
		            'xsrfHeaderName': 'X-CSRF-TOKEN',
		            'xsrfCookieName': 'XSRF-TOKEN'
		        }
				$http.post('/api/paypal/configure', { env: $scope.merchantConf.env, client_id: $scope.merchantConf.client_id, client_secret: $scope.merchantConf.client_secret }, config).then((response) => {
					return true
				})
			}
			$scope.setMerchant = () => {
				$cookies.remove('merchant-conf')
				$cookies.putObject('merchant-conf', $scope.merchant)
				$scope.merchantConf = $cookies.getObject('merchant-conf')
				$scope.configurePayPal()
				$('#merchantProfile').hide('slide')
				$location.path('/button/config')
			}
			$scope.defaultMerchant = () => {
				$scope.merchantConf = $cookies.getObject('merchant-conf')
				$scope.configurePayPal()
				$('#merchantProfile').hide('slide')
				$location.path('/button/config')
			}
			$scope.removeDefaultButton = () => {
				$('#defaultMerchantButton').hide('slide')
			}
			if(typeof $scope.merchantConf === 'undefined') {
				$('#defaultMerchantButton').hide()
			} else {
				$scope.merchant.env = $scope.merchantConf.env
				$scope.merchant.email = $scope.merchantConf.email
				$scope.merchant.payerId = $scope.merchantConf.payerId
				$scope.merchant.client_id = $scope.merchantConf.client_id
				$scope.merchant.client_secret = $scope.merchantConf.client_secret
				$('#defaultMerchantButton').show()
			}
		}],
		templateUrl: '/js/pages/home-page/template.html'
	}
}])
