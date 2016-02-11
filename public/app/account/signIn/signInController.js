(function () {
    'use strict';

    angular.module('account.signIn.signInController', ['ngRoute', 'angular-storage'])
            .controller('signInController', signInController);

    function signInController($http, store, $state) {
        var vm = this;

        vm.signInSubmit = function () {

            var user = {username: vm.userName, password: vm.password};
            var loginUrl = 'http://localhost:3001/sessions/create';
            $http({
                url: loginUrl,
                method: 'POST',
                data: user
            }).then(function (response) {
                store.set('jwt', response.data.id_token);
                $state.go('account');
            }, function (error) {
                alert(error.data);
            });

        };


    };

})();

