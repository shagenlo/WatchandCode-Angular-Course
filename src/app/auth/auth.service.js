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
            var authObj = firebaseAuthObject.$authWithPassword(user);
            console.log("Watch here: "+firebaseAuthObject.$getAuth());
            return authObj;  
        };
        
        function logout(){
            console.log("Watch here: "+firebaseAuthObject.$getAuth());
            partyService.reset();
            firebaseAuthObject.$unauth();
        }
        
        function isLoggedIn(){
            //console.log('isLoggedIn = '+firebaseAuthObject.$getAuth);
            return firebaseAuthObject.$getAuth();
        }
        
        function sendWelcomeEmail(emailAddress){
            if (firebaseAuthObject.$getAuth()){
                firebaseDataService.emails.push({
                   emailAddress:emailAddress 
                });
            } else {
                console.log("Firebase publish failed due to firebaseAuth = null");
                console.log("Watch here: "+firebaseAuthObject.$getAuth());
            };
        }
    };
})();