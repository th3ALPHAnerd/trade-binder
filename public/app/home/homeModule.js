(function () {
  'use strict';

  angular.module('home', ['home.HomeController'])
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
