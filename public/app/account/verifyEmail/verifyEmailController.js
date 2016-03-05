(function () {
    'use strict';

    angular.module('account.verifyEmail.verifyEmailController', ['account.verifyEmail.verifyEmailService', 'angular-jwt', 'account.UserService'])
            .controller('verifyEmailController', ['$state', 'verifyEmailService', '$stateParams', 'jwtHelper', 'UserService', verifyEmailController]);

    function verifyEmailController($state, verifyEmailService, $stateParams, jwtHelper, UserService) {
        var vm = this;

        vm.token = $stateParams.token;

        vm.loggedIn = UserService.isLoggedIn();

        function verifyEmail() {
            verifyEmailService.pushToken(vm.token);

            var user = jwtHelper.decodeToken(vm.token);

            vm.dataLoading = true;
            var data = {
                username: user.username,
                password: user.password
            };

            UserService.login(data).then(function (response) {
                if (response.success) {
                    $state.go('home');
                } else {
                    alert(response.message);
                    vm.dataLoading = false;
                }
            });

        }

        vm.verifyEmailSubmit = verifyEmail;
    }

})();

