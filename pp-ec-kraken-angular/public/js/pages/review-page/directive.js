'use strict'

angular.module('ppECKrakenAngular').directive('reviewPage', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', 'reviewPageModel', ($scope, reviewPageModel) => {
			$scope.model = reviewPageModel
			$scope.model.setup()
		}],
		templateUrl: '/js/pages/review-page/template.html'
	}
}])