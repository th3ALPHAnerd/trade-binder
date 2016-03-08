(function () {
  'use strict';

  angular.module('home.HomeController', [
      'account.UserService'
  ])
  .controller('HomeController',['$http', 'UserService',  HomeController]);

  function HomeController($http, UserService) {
    var vm = this;

    vm.loggedIn = UserService.isLoggedIn();
    vm.user = UserService.currentUser();

    vm.secure = function () {
      return $http.get('/api/secure')
      .then(function(response) { alert(response.data.message); },
      function (error) { alert('You\'re not authed'); });
    };

  }
  
})();
