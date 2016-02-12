(function () {
    'use strict';

    angular.module('Account.Register', ['ui.router', 'Account.Register.RegisterController'])
            .config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                            .state('register', {
                                url:'/register',
                                templateUrl: 'app/account/register/register.html',
                                controller: 'RegisterController',
                                controllerAs: 'register',
                                resolve: []
                            });
                }]);
})();

