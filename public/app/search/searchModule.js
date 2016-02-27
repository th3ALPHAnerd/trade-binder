(function () {
  'use strict';

  angular.module('search', ['search.SearchController'])
  .config(['$stateProvider', '$httpProvider', function ($stateProvider, $httpProvider) {
    $stateProvider
    .state('search', {
      url: '/tradeBinder/search',
      templateUrl: 'app/search/search.html',
      controller: 'SearchController',
      controllerAs: 'search',
      resolve: []
    });
  }]);
})();

