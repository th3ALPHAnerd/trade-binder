(function () {
    'use strict';

    angular.module('account.signIn.signInController', ['ui.router', 'angular-storage'])
            .controller('signInController', signInController);

    function signInController($http, store) {
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
            }, function (response) {
                alert(response.data);
            });

        };


    }
    ;

})();

