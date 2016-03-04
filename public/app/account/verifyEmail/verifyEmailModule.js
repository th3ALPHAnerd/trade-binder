(function () {
  'use strict';

  angular.module('account.verifyEmail', ['account.verifyEmail.verifyEmailController'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('verifyEmail', {
        url: '/tradeBinder/verifyEmail/:token',
        templateUrl: 'app/account/verifyEmail/verifyEmail.html',
        controller: 'verifyEmailController',
        controllerAs: 'verifyEmail'
    });
  }]);
})();