(function () {
    'use strict';

    angular.module('home', ['ui.router', 'home.HomeController'])
            .config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                            .state('home', {
                                url: '/',
                                templateUrl: 'app/home/home.html',
                                controller: 'HomeController',
                                controllerAs: 'home',
                                resolve: []
                            });
                }]);
})();