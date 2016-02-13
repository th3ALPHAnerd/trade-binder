(function () {
    'use strict';

    angular.module('account.accountController', ['angular-storage', 'angular-jwt'])
            .controller('accountController', ['$scope', '$http', 'store', 'jwtHelper', accountController]);

    function accountController($scope, $http, store, jwtHelper) {
       $scope.jwt = store.get('jwt');
       $scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);

    };

})();

