'use strict'

angular.module('ppECKrakenAngular').directive('cartPage', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', 'cartPageModel', 'checkoutServiceModel', ($scope, cartPageModel, checkoutServiceModel) => {
			$scope.model = cartPageModel
			$scope.model.setup()
			$scope.model.getItems()
		}],
		templateUrl: '/js/pages/cart-page/template.html'
	}
}])