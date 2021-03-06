(function () {
    'use strict';

    angular
            .module('search.SearchFactory', [])
            .factory('SearchFactory', ['$http', SearchFactory]);

    function SearchFactory($http) {
        //var url = "https://api.deckbrew.com/mtg/cards?name=";

        var SearchFactory = {};

        SearchFactory.getCards = function (name) {
            return $http({
                method: 'GET',
                url: "https://api.deckbrew.com/mtg/cards?name=" + name + "",
                skipAuthorization: true
            });
        };

        return SearchFactory;
    }
    
})();

