'use strict'

//since we're using DustJS, 
//we must set the startSymbol and endSymbol to '[[' and ']]'.

angular.module('ppECKrakenAngular', ['ngRoute', 'ngCookies', 'paypal-button'])
.config(['$interpolateProvider', '$cookiesProvider', '$routeProvider', '$locationProvider', ($interpolateProvider, $cookiesProvider, $routeProvider, $locationProvider) => {
    $interpolateProvider
        .startSymbol('[[');
    $interpolateProvider
        .endSymbol(']]');
    $cookiesProvider.defaults.path = '/';
    $cookiesProvider.defaults.secure = false;
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
    	.when('/cart', {
    		template: '<cart-page></cart-page>'
    	})
    	.when('/cart/checkout', {
    		template: '<checkout-page></checkout-page>'
    	})
    	.when('/order/review', {
    		template: '<review-page></review-page>'
    	})
}])