(function () {
    'use strict';

    angular.module('account.register', ['ngRoute', 'register.RegisterCtrl'])
            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider
                            .when('/register', {
                                templateUrl: 'app/account/register/register.html',
                                controller: 'RegisterCtrl',
                                controllerAs: 'register',
                                resolve: []
                            });
                }]);
})();

