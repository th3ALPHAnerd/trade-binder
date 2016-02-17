(function () {
  'use strict';

  angular.module('account', ['ui.router', 'account.accountController', 'account.register', 'account.login', 'angular-storage', 'angular-jwt'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('account', {
      url: '/tradeBinder/account',
      templateUrl: 'app/account/account.html',
      controller: 'accountController',
      resolve: [],
      data: {
        requiresLogin: true
      }
    });
  }]);
})();

