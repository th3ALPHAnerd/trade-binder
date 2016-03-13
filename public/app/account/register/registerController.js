(function () {
  'use strict';

  angular.module('account.register.RegisterController', [
      'account.UserService'
  ])
  .controller('RegisterController', ['$state', 'UserService', RegisterController]);

  function RegisterController($state, UserService) {
    var vm = this;

    function register() {
      vm.dataLoading = true;
      var data = {
        name: vm.name,
        email: vm.email,
        username: vm.username,
        password: vm.password
      };
      
      UserService.register(data).then(function (response) {
        if (response.success) {
          console.log('Success');
          $state.go('home');
        } else {
          alert(response.message);
        }
      });
      reset();
      
      $state.go('checkEmail');
    }

    function reset() {
      vm.name = '';
      vm.email = '';
      vm.username = '';
      vm.password = '';
    }

    vm.registerSubmit = register;
  }

})();
