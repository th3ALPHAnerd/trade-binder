(function () {
    'use strict';

    angular.module('account.register', ['ui.router', 'register.RegisterCtrl'])
            .config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                            .state('register', {
                                url: '/register',
                                templateUrl: 'app/account/register/register.html',
                                controller: 'RegisterCtrl',
                                controllerAs: 'register',
                                resolve: []
                            });
                }]);
})();

