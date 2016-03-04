(function () {
    'use strict';

    angular.module('account.verifyEmail.verifyEmailController', ['account.verifyEmail.verifyEmailService'])
            .controller('verifyEmailController', ['$state', 'verifyEmailService', '$stateParams', verifyEmailController]);

    function verifyEmailController($state, verifyEmailService, $stateParams) {
        var vm = this;

        vm.token = $stateParams.token;

        function verifyEmail() {
            verifyEmailService.pushToken(vm.token);
            
            

            $state.go('home');
        }


        vm.verifyEmailSubmit = verifyEmail;
    }

})();

