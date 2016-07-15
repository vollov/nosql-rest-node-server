'use strict';

//---------------------------------------------------------------------------------------------------------------
// Home controller
//---------------------------------------------------------------------------------------------------------------
angular.module('mainModule')

.controller('SignupController', [ '$scope', '$rootScope', '$http', '$location', 'MainService',
	function( $scope, $rootScope, $http, $location, $ms) {
		
		//-------------------------------------
		// Public methods
		//-------------------------------------
		/**
		 * process for user click signup button
		 */
		$scope.signUp = function() {
			$http.post(cfg.apiUrl + '/signup', user).success(
					function(data, status, headers, config) {
							if (data.errors && data.errors.length > 0) {
								//setErrorMessage(data.errors);
								console.log(data.errors);
							}else{
								$rootScope.$broadcast("onUpdateHeader");
								alert('signup success!');
								// $location.path('dashboard');
								// if(data.token){
									// $ms.setSessionItem('token', data.token);
									// $ms.setSessionItem('user', data.decoded);
								// }
							}
					}).error(
						function(data, status, headers, config) {
							console.log('signup failed on http post');
							//cleanErrorMessage();
					});
		}
		
		
		//----------------------------------
		// Private methods
		//----------------------------------
		
	}
]);