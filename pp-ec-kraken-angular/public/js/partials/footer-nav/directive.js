'use strict'

angular.module('ppECKrakenAngular').directive('footerNav', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', ($scope) => {
		}],
		templateUrl: '/js/partials/footer-nav/template.html'
	}
}])