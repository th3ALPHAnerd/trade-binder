(function () {
    'use strict';
    
    angular.module('search', ['ngRoute', 'search.SearchController'])
            .config(['$routeProvider',function ($routeProvider) {
                    $routeProvider
                    .when('/search', {
                        templateUrl: 'app/search/search.html',
                        controller: 'SearchController',
                        controllerAs: 'search',
                        resolve:[]
                    });
                }]);
})();

