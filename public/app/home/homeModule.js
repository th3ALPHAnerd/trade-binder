(function () {
    'use strict';

    angular.module('home', ['ui.router', 'home.HomeController'])
            .config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
                    $stateProvider
                            .state('home', {
                                url: '/',
                                templateUrl: 'app/home/home.html',
                                controller: 'HomeController',
                                controllerAs: 'home',
                                resolve: []
                            });
                    $locationProvider.html5Mode({
                        enabled: true,
                        requireBase: false
                    });
                }]);
})();