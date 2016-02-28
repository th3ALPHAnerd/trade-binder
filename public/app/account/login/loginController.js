(function () {
  'use strict';

  angular.module('account.login.LoginController', [
      'account.UserService'
  ])
  .controller('LoginController', ['$state', 'UserService', LoginController]);

  function LoginController($state, UserService) {
    var vm = this;

    function login() {
      vm.dataLoading = true;
      var data = {
        username: vm.username,
        password: vm.password
      };
      UserService.login(data).then(function (response){
        if (response.success) {
          $state.go('home');
        } else {
          alert(response.message);
          vm.dataLoading = false;
        }
        reset();
      });
    }

    function reset() {
      vm.username = '';
      vm.password = '';
    }

    vm.loginSubmit = login;

  }

})();

