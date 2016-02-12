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

        vm.upOwnedQuantity = function (card) {
            TradeBindersFactory.upOwnedCardQuantity(card);
        };

        vm.lowerOwnedQuantity = function (card) {
            TradeBindersFactory.lowerOwnedCardQuantity(card);
        };

        vm.upWantQuantity = function (card) {
            TradeBindersFactory.upWantCardQuantity(card);
        };

        vm.lowerWantQuantity = function (card) {
            TradeBindersFactory.lowerWantCardQuantity(card);
        };

        vm.upForTradeQuantity = function (card) {
            TradeBindersFactory.upForTradeCardQuantity(card);
        };

        vm.lowerForTradeQuantity = function (card) {
            TradeBindersFactory.lowerForTradeCardQuantity(card);
        };

    }
})();