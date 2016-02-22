(function () {
  'use strict';

  angular.module('account', ['account.accountController', 'account.register', 'account.login'])
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

