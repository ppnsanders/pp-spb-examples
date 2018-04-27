'use strict'

angular.module('ppECKrakenAngular').directive('homePage', [ ($cookies) => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', '$cookies', '$location', '$http', ($scope, $cookies, $location, $http) => {
			$scope.merchantConf = $cookies.getObject('merchant-conf')
			$scope.merchant = {}
			$scope.merchant.email = ""
			$scope.merchant.payerId = ""
			$scope.merchant.brandName = ""
			$scope.merchant.client_id = ""
			$scope.merchant.client_secret = ""
			$scope.merchant.username = ""
			$scope.merchant.password = ""
			$scope.merchant.signature = ""
			$scope.setMerchant = () => {
				$cookies.remove('merchant-conf')
				$cookies.putObject('merchant-conf', $scope.merchant)
				$scope.merchantConf = $cookies.getObject('merchant-conf')
				$('#merchantProfile').hide()
				$location.path('/cart')
			}
			$scope.defaultMerchant = () => {
				$('#merchantProfile').hide('slide')
				$location.path('/cart')
			}
			$scope.removeDefaultButton = () => {
				$('#defaultMerchantButton').hide('slide')
			}
			if(typeof $scope.merchantConf === 'undefined') {
				$('#defaultMerchantButton').hide()
			} else {
				$scope.merchant.email = $scope.merchantConf.email
				$scope.merchant.payerId = $scope.merchantConf.payerId
				$scope.merchant.brandName = $scope.merchantConf.brandName
				$scope.merchant.client_id = $scope.merchantConf.client_id
				$scope.merchant.client_secret = $scope.merchantConf.client_secret
				$scope.merchant.username = $scope.merchantConf.username
				$scope.merchant.password = $scope.merchantConf.password
				$scope.merchant.signature = $scope.merchantConf.signature
				$('#defaultMerchantButton').show()
			}
			$scope.getMerchantConfig = () => {
				return $http.get('/api/config').then((response) => {
					$cookies.putObject('merchant-conf', response.data)
				})
			}
			$scope.getMerchantConfig()	
		}],
		templateUrl: '/js/pages/home-page/template.html'
	}
}])
