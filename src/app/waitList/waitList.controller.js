(function() {
    'use strict';
    
    angular
        .module('app.waitList')
        .controller('WaitListController',WaitListController);
    
    WaitListController.$inject = ['partyService', 'user']; //Dependency on 
    
    function WaitListController(partyService, user) {
        var vm = this;                                      //Convenience reference
        vm.parties = partyService.getPartiesByUser(user.uid);
    };
    
})();