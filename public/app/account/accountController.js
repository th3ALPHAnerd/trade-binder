(function () {
    'use strict';

    angular.module('account.accountController', ['angular-storage', 'angular-jwt'])
            .controller('accountController', accountController);

    function accountController($scope, $http, store, jwtHelper) {
       $scope.jwt = store.get('jwt');
       $scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);

    };

})();

