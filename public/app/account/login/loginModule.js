(function () {
  'use strict';

  angular.module('account.login', ['ui.router', 'account.login.loginController'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('login', {
      url: '/tradeBinder/login',
      templateUrl: 'app/account/login/login.html',
      Controller: 'loginController',
      ControllerAs: 'login',
      resolve: []
    });
  }]);
})();

