(function () {
  'use strict';

  angular
  .module('account.register.RegisterController', [])
  .controller('RegisterController', ['UserService', '$location', '$rootScope', RegisterController]);

  function RegisterController(UserService, $location, $rootScope) {
    var vm = this;

    var data = $.param({
      json: JSON.stringify({
        name: vm.name,
        email: vm.email,
        userName: vm.userName,
        password: vm.password
      })
    });

    vm.registerSubmit = register;

    function register() {
      vm.dataLoading = true;
      UserService.Create(data)
      .then(function (response) {
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

