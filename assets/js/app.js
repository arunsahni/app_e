angular.module('app', ['ngAnimate', 'ngStorage', 'ui.bootstrap', 'ui.router', 'ngMessages', 'rzModule', 'imageupload', 'ui.calendar','ngLoadingSpinner' /*, 'app-templates'*/])
	.run(function($rootScope, $state, Auth) {

        //search bar setting
        $rootScope.searchBar = 'Show';

        //set user role 
        //$rootScope.userRole = 'anon';

	//advertisement setting
		$rootScope.advShowTxt = 'Show';
		$rootScope.advState = false;
		$rootScope.advShow = function() {
			if($rootScope.advShowTxt == 'Show') {
				$rootScope.advShowTxt = 'Hide';
				$rootScope.advState = true;
			} else {
				$rootScope.advShowTxt = 'Show';
				$rootScope.advState = false;
			}
		};

	//slider settings
		$rootScope.showSlider = false;

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			if(toState.name != 'anon.home') { 
				$rootScope.showSlider = false;
                                $rootScope.advShowTxt = 'Show';
                                $rootScope.advState = false;
			} else {
				$rootScope.showSlider = true;
                                $rootScope.advShowTxt = 'Hide';
                                $rootScope.advState = true;
			}
                $rootScope.searchBar = 'Show';
		//check authorization to restricted functions 
      		if (!Auth.authorize(toState.data.access)) { 
        		event.preventDefault();
        		$state.go('anon.login');
      		}

      		/*if(Auth.authorize(toState.data.access)) {
	            if(toState.url == '/login' || toState.url == '/register') {
	        		//event.preventDefault(); 
	            }
	        }*/
    	});
	});

