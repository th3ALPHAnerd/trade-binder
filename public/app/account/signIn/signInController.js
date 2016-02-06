(function () {
    'use strict';

    angular.module('account.signIn.signInController', [])
            .controller('signInController', signInController);

    function signInController() {
        var vm = this;
        
        vm.signInSubmit = function(){
            
            var userEmail = vm.email;
            var userPassword = vm.password;
            
        };
        

    };

})();

