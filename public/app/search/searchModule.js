(function () {
    'use strict';
    
    angular.module('search', ['ui.router', 'search.SearchController'])
            .config(['$stateProvider',function ($stateProvider) {
                    $stateProvider
                    .state('search', {
                        url: '/search',
                        templateUrl: 'app/search/search.html',
                        controller: 'SearchController',
                        controllerAs: 'search',
                        resolve:[]
                    });
                }]);
})();

