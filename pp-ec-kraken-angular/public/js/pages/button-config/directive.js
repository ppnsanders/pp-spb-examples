'use strict'

angular.module('ppECKrakenAngular').directive('buttonConfig', [ ($cookies) => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', '$cookies', '$location', '$http', ($scope, $cookies, $location, $http) => {
			$scope.renderButton = () => {
				document.getElementById('buttonPreview').innerHTML = ""
				paypal.Button.render($scope.buttonObj, '#buttonPreview')
			}
			$scope.buttonConf = $cookies.getObject('button-conf')
			$scope.button = {}
			$scope.options = []
			$scope.options[0] = {}
			$scope.options[0].env = [ "sandbox", "production" ]
			$scope.options[0].style = {}
			$scope.options[0].style.layout = [ "vertical", "horizontal" ]
			$scope.options[0].style.size = [ "medium", "large", "responsive" ]
			$scope.options[0].style.shape = [ "rect", "pill" ]
			$scope.options[0].style.color = [ "gold", "blue", "silver", "black", "white" ]
			$scope.options[0].funding_options = [ "paypal.FUNDING.CARD", "paypal.FUNDING.CREDIT", "paypal.FUNDING.ELV"]
			$scope.button.env = ""
			$scope.button.commit = false
			$scope.button.style = {}
			$scope.button.style.layout = ""
			$scope.button.style.size = ""
			$scope.button.style.shape = ""
			$scope.button.style.color = ""
			$scope.button.funding = {}
			$scope.button.funding.allowed = []
			$scope.button.funding.disallowed = []
			$scope.button.payment = function (data, actions) {
				return true
			}
			$scope.button.onAuthorize = function(data, actions) {
				return true
			}
			$scope.button.onCancel = function(data) {
				return true
			}
			$scope.button.onError = function(data) {
				return true
			}
			$scope.defaultButton = () => {
				$scope.button.env = "sandbox"
				$scope.button.style = {}
				$scope.button.style.layout = "vertical"
				$scope.button.style.size = "responsive"
				$scope.button.style.shape = "rect"
				$scope.button.style.color = "gold"
				$scope.button.funding = {
					allowed: [],
					disallowed: []
				}
				$cookies.remove('button-conf')
				$cookies.putObject('button-conf', $scope.button)
				$scope.buttonObj = { env: $scope.button.env, commit: $scope.button.commit, style: $scope.button.style, funding: $scope.button.funding, payment: $scope.button.payment, onAuthorize: $scope.button.onAuthorize, onCancel: $scope.button.onCancel, onError: $scope.button.onError }
				$scope.renderButton()
			}
			$scope.defaultButton()
			$scope.setButton = () => {
				$cookies.remove('button-conf')
				$cookies.putObject('button-conf', $scope.button)
				$scope.buttonConf = $cookies.getObject('button-conf')
				$('#buttonConfig').hide('slide')
				$location.path('/cart')
			}
			$scope.updateButton = () => {
				$cookies.remove('button-conf')
				$cookies.putObject('button-conf', $scope.button)
				$scope.buttonObj = {}
				$scope.buttonObj = { env: $scope.button.env, commit: $scope.button.commit, style: $scope.button.style, funding: $scope.button.funding, payment: $scope.button.payment, onAuthorize: $scope.button.onAuthorize, onCancel: $scope.button.onCancel, onError: $scope.button.onError }
				$scope.renderButton()
			}
			
		}],
		templateUrl: '/js/pages/button-config/template.html'
	}
}])
