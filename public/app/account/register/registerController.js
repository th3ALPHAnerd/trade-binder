(function () {
  'use strict';

  angular
  .module('account.register.RegisterController', ['account.UserService', 'ui.router',])
  .controller('RegisterController', ['UserService', '$location', '$rootScope', RegisterController]);

  function RegisterController(UserService, $location, $rootScope) {
    var vm = this;

    vm.registerSubmit = register;

    function register() {
      vm.dataLoading = true;
      var data = {
        name: vm.name,
        email: vm.email,
        username: vm.userName,
        password: vm.password
      }

      UserService.Create(data).then(function (response) {
        if (response.success) {
          alert('Success');
          $location.path('/login');
        } else {
          alert('Error');
          vm.dataLoading = false;
        }
      });
    }
  }

})();

