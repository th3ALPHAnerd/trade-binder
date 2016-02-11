(function () {
    'use strict';

    angular.module('account', ['ngRoute', 'account.accountController', 'angular-storage', 'angular-jwt'])
            .config(['$routeProvider', function ($stateProvider) {
                    $routeProvider
                            .when('/account', {
                                url: '/account',
                                templateUrl: 'app/account/account.html',
                        controller: 'accountController',        
                        resolve: [],
                                data: {
                                    requiresLogin: true
                                }

                            });
                }]);
})();

