'use strict';

angular.module('mainModule',[])
.factory('MInterceptorService', ['$q',  function($q) {
  return {
	  
	  echo : function( ){
		  console.log('InterceptorService.echo()');
	  },
  
    // optional method
    'request': function(config) {
      // do something on success
    	console.log('InterceptorService.request()');
      return config;
    },

    // optional method
   'requestError': function(rejection) {
	   console.log('InterceptorService.requestError()');
      // do something on error
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    },


    // optional method
    'response': function(response) {
      // do something on success
    	console.log('InterceptorService.response()');
    	if (response.status === 200) {
    		console.log('login success');
    	}
      return response;
    },

    // optional method
   'responseError': function(rejection) {
      // do something on error
	   console.log('InterceptorService.responseError()');
      if (canRecover(rejection)) {
        return responseOrNewPromise;
      }
      return $q.reject(rejection);
    }
  };
}]);


