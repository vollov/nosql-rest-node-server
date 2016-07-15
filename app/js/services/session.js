'use strict';

angular.module('mainModule',[])
.factory('SessionService', ['$http', function( 
	$http){ 
	
	return {
		
		//--------------------------------------------------------------------------------------
		// store objects into session
		//	name --- name of session item
		//--------------------------------------------------------------------------------------
		getSessionItem : function( name ){	
			var s = sessionStorage.getItem( cfg.sessionPrefix + name);
			if (s=='null')
				return null;
			try {
				if(s){
					return JSON.parse(s);
				}else{
					return s;
				}
			} catch (e) {
				return s;
			}
		},
		
		//--------------------------------------------------------------------------------------
		// store objects into session
		//	name --- name of session item
		// 	obj --- object that can be convert to json string  
		//--------------------------------------------------------------------------------------
		setSessionItem : function( name, obj ){
			if( typeof obj == 'undefined'){
				sessionStorage.setItem( cfg.sessionPrefix + name, null );
			}else if(typeof obj == 'string'){
				sessionStorage.setItem( cfg.sessionPrefix + name, obj);
			}else{
				if(obj)
					sessionStorage.setItem( cfg.sessionPrefix + name, JSON.stringify(obj));
				else
					sessionStorage.setItem( cfg.sessionPrefix + name, obj);
			}
		}

	};
}]);