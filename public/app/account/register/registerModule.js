(function () {
    'use strict';

    angular.module('Account.Register', ['ngRoute', 'Account.Register.RegisterController'])
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

