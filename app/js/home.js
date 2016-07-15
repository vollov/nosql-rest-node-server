'use strict';

//---------------------------------------------------------------------------------------------------------------
// Home controller
//---------------------------------------------------------------------------------------------------------------
angular.module('mainModule')

.controller('HomeController', [ '$scope', '$rootScope', '$http', '$location', 'SessionService',
		  function( $scope, $rootScope, $http, $location, $sessionService) {
	
			//----------------------------------------------------------------------------------
			// Public methods
			//----------------------------------------------------------------------------------
			$scope.redirectTo = function(a){
				$location.path(a);
			}
			
			
			//--------------------------------------------------------------------
			// When navigate to the home page, init() will be called to 
			// 1. load filter from the cookie
			// 2. send http request to get the item list and save
			//--------------------------------------------------------------------
			function init(){
				console.log('call init()');
				$scope.user = $sessionService.getSessionItem('user');
			}
			
			init();
			
		} ])
.controller('LoginCtrl', [ '$scope', '$rootScope', '$http', '$location', 'SessionService',
                 		  function( $scope, $rootScope, $http, $location, $sessionService) {
	
	$scope.credentials = { username: "", password: ""};
	
	$scope.login = function() {
		
		console.log('login() with username= ' + $scope.credentials.username);
		console.log('login() with password= ' + $scope.credentials.password);
		
		$http.post('/public/1.0/login', $scope.credentials).success(
			function(response,status){
				if(status == 200){
					// login success, if next_page is null, goto profile page
					
					// check if local storage has token, if not, save token to local storage
					
					
					console.log('login success');
				}else{
					console.log('login failed');
				}
			}).error(function(response,status){
				console.log('login error');
			}); // end error
	}; // login end
} //function end 
]);