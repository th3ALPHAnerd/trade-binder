(function () {
  'use strict';

  angular.module('account.login.loginController', ['ui.router', 'angular-storage', 'account.AuthService'])
  .controller('LoginController', ['$location', 'AuthService', LoginController]);

  function LoginController($location, AuthService) {
    var vm = this;

    vm.login = login;

    (function initController() {
      // reset login status
      AuthService.ClearCredentials();
    })();

    function login() {
      vm.dataLoading = true;
      AuthService.Login(vm.username, vm.password, function (response) {
        if (response.success) {
          AuthService.SetCredentials(vm.username, vm.password);
          $location.path('/');
        } else {
          alert(response.message);
          vm.dataLoading = false;
        }
      });
    }
  }

})();

