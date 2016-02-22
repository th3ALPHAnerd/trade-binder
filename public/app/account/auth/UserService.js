(function () {
  'use strict';

  angular
  .module('account.UserService', [])
  .factory('UserService', ['$http', UserService]);

  function UserService($http) {
    var user = {};

    user.Create = Create;

    return user;

    function Create(data) {
      return $http.post('/api/register', data).then(handleSuccess, handleError('Error creating user'));
    }

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(error) {
      return function () {
        return { success: false, message: error };
      };
    }
  }

})();
