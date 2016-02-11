(function () {
    'use strict';

    angular.module('TradeBinders.TradeBindersController', ['TradeBinder.TradeBindersFactory'])
            .controller('TradeBindersController', TradeBindersController);

    function TradeBindersController(TradeBindersFactory) {
        var vm = this;

        vm.cards = TradeBindersFactory.getCards();

        vm.addCards = function (cards) {
            if (cards.length > 0) {
                TradeBindersFactory.addCards(cards);
                vm.cards = TradeBindersFactory.getCards();
                
                vm.addList = [];
            }
        };

        vm.removeCard = function (card) {
            TradeBindersFactory.removeCard(card);
        };

        vm.upQuantity = function (card) {
            TradeBindersFactory.upCardQuantity(card);
        };

        vm.lowerQuantity = function (card) {
            TradeBindersFactory.lowerCardQuantity(card);
        };


    }
})();