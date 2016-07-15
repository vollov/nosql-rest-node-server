'use strict';

angular.module('myApp', [ 'ngResource', 'ngRoute', 'ngCookies', 'ngSanitize', 'ngTouch', 'ngAnimate','mainModule'])
.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
	
	$routeProvider.when('/', {
		controller: 'HomeController',
		templateUrl : 'views/home.html'
	}).when('/profile', {
		templateUrl : 'views/profile.html'
	}).when('/login', {
		controller : 'LoginCtrl',
		templateUrl : 'views/login.html'
	}).when('/500', {
		templateUrl : 'views/500.html'
	}).otherwise({
		redirectTo : '/'
	});
	
	$httpProvider.interceptors.push('MInterceptorService');
}]);


//.config(['$httpProvider', 'MInterceptorService', function($httpProvider, $MInterceptorService) {
//	$MInterceptorService.echo();
//	//$httpProvider.interceptors.push(MInterceptorService);
//}]);
