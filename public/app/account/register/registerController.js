(function () {
  'use strict';

  angular
  .module('account.register.RegisterController', ['account.UserService', 'ui.router',])
  .controller('RegisterController', ['UserService', '$location', '$rootScope', RegisterController]);

  function RegisterController(UserService, $location, $rootScope) {
    var vm = this;

    var data = $.param({
      name: vm.name,
      email: vm.email,
      username: vm.userName,
      password: vm.password
    });

    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }

    vm.registerSubmit = register;

    function register() {
      console.log('hello');
      vm.dataLoading = true;
      UserService.Create(data, config).then(function (response) {
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

