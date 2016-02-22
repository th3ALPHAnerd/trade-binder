(function () {
  'use strict';

  angular.module('account.login', ['account.login.LoginController'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('login', {
      url: '/tradeBinder/login',
      templateUrl: 'app/account/login/login.html',
      controller: 'LoginController',
      controllerAs: 'login',
      resolve: []
    });
  }]);
})();

