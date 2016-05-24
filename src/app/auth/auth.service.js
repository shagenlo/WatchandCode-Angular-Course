(function(){
    'use strict';
    
    angular
        .module('app.auth')
        .factory('authService', authService);
    
    authService.$inject = ['$firebaseAuth', 'firebaseDataService', 'partyService'];
    
    function authService($firebaseAuth, firebaseDataService, partyService) {
        var firebaseAuthObject = $firebaseAuth(firebaseDataService.root) //reuse from fireBaseDataService
        
        var service = {
                        firebaseAuthObject: firebaseAuthObject,
                        register:register, 
                        login:login, 
                        logout:logout,
                        isLoggedIn:isLoggedIn,
                        sendWelcomeEmail: sendWelcomeEmail
                      };
        return service;
        
        /////////////////
        
        function register(user){
            return firebaseAuthObject.$createUser(user);
        };
        
        function login(user){
            return firebaseAuthObject.$authWithPassword(user);  
        };
        
        function logout(){
            partyService.reset();
            firebaseAuthObject.$unauth();
        }
        
        function isLoggedIn(){
            //console.log('isLoggedIn = '+firebaseAuthObject.$getAuth);
            return firebaseAuthObject.$getAuth();
        }
        
        function sendWelcomeEmail(emailAddress){
            console.log("Is authenticated = "+firebaseAuthObject.$getAuth()); //I'm not authenticated?!
            firebaseDataService.emails.push({
               emailAddress:emailAddress 
            });
        }
    };
})();