(function () {
    'use strict';

    angular.module('account.register', ['ui.router', 'account.register.RegisterController'])
            .config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                            .state('register', {
                                url: '/tradeBinder/register',
                                templateUrl: 'app/account/register/register.html',
                                controller: 'RegisterController',
                                controllerAs: 'register',
                                resolve: []
                            });
                }]);
})();

