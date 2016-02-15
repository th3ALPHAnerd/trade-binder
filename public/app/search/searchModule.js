(function () {
    'use strict';

    angular.module('search', ['ui.router', 'search.SearchController'])
            .config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
                    $stateProvider
                            .state('search', {
                                url: '/tradeBinder/search',
                                templateUrl: 'app/search/search.html',
                                controller: 'SearchController',
                                controllerAs: 'search',
                                resolve: []
                            });
                    $locationProvider.html5Mode({
                        enabled: true,
                        requireBase: false
                    });
                }]);
})();

