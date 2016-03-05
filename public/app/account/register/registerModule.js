(function () {
  'use strict';

  angular.module('account.register', ['account.register.RegisterController'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('register', {
      url: '/tradeBinder/register',
      templateUrl: 'app/account/register/register.html',
      controller: 'RegisterController',
      controllerAs: 'register',
      resolve: []
    })
    .state('checkEmail', {
      url: '/tradeBinder/checkEmail',
      templateUrl: 'app/account/register/checkEmail.html'
    });
  }]);
})();

