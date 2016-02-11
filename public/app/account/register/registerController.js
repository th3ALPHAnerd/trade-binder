(function () {
    'use strict';

    angular
            .module('register.RegisterCtrl', ['ui.router', 'angular-storage'])
            .controller('RegisterCtrl', RegisterCtrl);

    function RegisterCtrl() {
        var vm = this;

        vm.registerSubmit = function ($http, store, $state) {
            //need to figure out the api endpoint
            var userUrl = 'http://localhost:3001/users';
            var user = {userName: vm.userName, email: vm.email, password: vm.password, zipCode: vm.zipCode };
            $http({
                url: userUrl,
                method: 'POST',
                data: user
            }).then(function (response) {
                store.set('jwt', response.data.id_token);
                $state.go('account');
            }, function (error) {
                alert(error.data);
            });
        };
    }


})();

