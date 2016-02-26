(function () {
    'use strict';

    angular.module('search', ['ui.router', 'search.SearchController'])
            .config(['$stateProvider', '$httpProvider', function ($stateProvider, $httpProvider) {
                    $stateProvider
                            .state('search', {
                                url: '/tradeBinder/search',
                                templateUrl: 'app/search/search.html',
                                controller: 'SearchController',
                                controllerAs: 'search',
                                resolve: []
                            });
                            
                            delete $httpProvider.defaults.headers.common['X-Requested-With'];
                }]);
})();

