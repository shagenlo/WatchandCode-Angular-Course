(function (){
    'use strict'
    angular
        .module('app.auth')
        .directive('gzAuthForm', gzAuthForm);
    
    function gzAuthForm(){
        return {
            templateUrl:'app/auth/authForm.html',
            restrict:'E',
            controller:AuthFormController,
            controllerAs:'vm',
            bindToController: true,
            scope:{
                error:'=',          //bind as object
                formTitle:'@',      //bind as string
                submitAction:'&'    //bind as function
            }
        }
    }
    
    function AuthFormController(){
        var vm = this;
        vm.user = {email:'', password:''};
    }
})();