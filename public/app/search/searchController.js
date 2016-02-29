(function () {
    'use strict';

    angular.module('search.SearchController', [
        'search.SearchFactory'
    ])
            .controller('SearchController', ['SearchFactory', SearchController]);

    function SearchController(SearchFactory) {
        var vm = this;

        vm.cards = [];

        vm.searchSubmit = function (name) {

            SearchFactory.getCards(name).success(function (dataResponse) {
                vm.cards = dataResponse;
            });

            vm.search = '';
        };
    }

})();

