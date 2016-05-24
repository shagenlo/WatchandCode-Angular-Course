(function(){
    'use strict';
    
    angular
    .module('app',[
        //Angular modules.
        'ngRoute',
        //Third-party modules
        'firebase',
        //Custom modules
        'app.landing',
        'app.waitList',
        'app.auth',
        'app.core',
        'app.layout'
    ])
    .config(configFunction)
    .run(runFunction);
    
    configFunction.$inject = ['$routeProvider', '$logProvider'];
    
    function configFunction($routeProvider, $logProvider){
        $routeProvider.otherwise({redirectTo:'/'});
        $logProvider.debugEnabled(true);
    };
    
    runFunction.$inject = ['$rootScope', '$location'];
    
    function runFunction($rootScope, $location){
        $rootScope.$on('$routeChangeError', function(event, next, previous, error){
           if (error === 'AUTH_REQUIRED') {
               $location.path('/');
           };
        }); 
    };
})();