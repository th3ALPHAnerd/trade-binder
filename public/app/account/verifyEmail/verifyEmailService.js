(function () {
    'use strict';

    angular
            .module('account.verifyEmail.verifyEmailService', [])
            .factory('verifyEmailService', ['$http', verifyEmailService]);

    function verifyEmailService($http) {
        //var url = "https://api.deckbrew.com/mtg/cards?name=";

        var verifyEmailService = {};

        verifyEmailService.pushToken = function (token) {
            return $http({
                method: 'GET',
                url: "/api/accounts/verifyEmail/" + token + "",
                skipAuthorization: true
            });
        };

        return verifyEmailService;
    }
})();


