(function () {
    'use strict';
    angular.module('TradeBinder.TradeBindersFactory', ['search.SearchFactory'])
            .factory('TradeBindersFactory', TradeBindersFactory);

    function TradeBindersFactory(SearchFactory) {
        var Collection = [];

        return{
            getCards: function () {
                return Collection;
            },
            addCards: function (names) {
                names.split('\n')
                        .forEach(function (line) {

                            var card = {
                                name: CardName(line),
                                num: Quantity(line)
                            };

                            SearchFactory.getCards(CardName(line))
                                    .success(function (dataResponse) {
                                        dataResponse
                                                .filter(function (foundCard) {
                                                    return foundCard.name.toUpperCase() === card.name.toUpperCase();
                                                })
                                                .forEach(function (foundCard) {

                                                    var cardImage;
                                                    if (foundCard.editions[0].multiverse_id !== 0) {
                                                        cardImage = foundCard.editions[0].image_url;
                                                    } else {
                                                        cardImage = foundCard.editions[1].image_url;
                                                    }
                                                    Collection.push({
                                                        name: foundCard.name,
                                                        ownedQuantity: card.num,
                                                        forTrade: 0,
                                                        want: 0,
                                                        image: cardImage
                                                    });
                                                })
                                    });
                        });
            },
            removeCard: function (name) {
                console.log(name);
                var index = Collection.indexOf(name);
                console.log(index);
                Collection.splice(index, 1);
                console.log(Collection);
            },
            upOwnedCardQuantity: function (name) {
                var indexOf = Collection.indexOf(name);
                Collection[indexOf].ownedQuantity += 1;
            },
            lowerOwnedCardQuantity: function (name) {
                var indexOf = Collection.indexOf(name);
                if (Collection[indexOf].ownedQuantity >= 1) {
                    Collection[indexOf].ownedQuantity -= 1;
                }
            },
             upWantCardQuantity: function (name) {
                var indexOf = Collection.indexOf(name);
                Collection[indexOf].want += 1;
            },
            lowerWantCardQuantity: function (name) {
                var indexOf = Collection.indexOf(name);
                if (Collection[indexOf].want >= 1) {
                    Collection[indexOf].want -= 1;
                }
            }, 
            upForTradeCardQuantity: function (name) {
                var indexOf = Collection.indexOf(name);
                Collection[indexOf].forTrade += 1;
            },
            lowerForTradeCardQuantity: function (name) {
                var indexOf = Collection.indexOf(name);
                if (Collection[indexOf].forTrade >= 1) {
                    Collection[indexOf].forTrade -= 1;
                }
            }
        };
    }

    var Quantity = function (line) {
        var indexOf = line.indexOf(" ");
        var possibleNum = line.substring(0, indexOf);
        if (!isNaN(possibleNum)) {
            return Number(possibleNum);
        } else {
            return 1;
        }

    };

    var CardName = function (line) {
        var indexOf = line.indexOf(" ");
        var possibleNum = line.substring(0, indexOf);
        if (!isNaN(possibleNum)) {
            return line.substring(indexOf + 1).replace(/\s+/g, ' ').trim();
        } else {
            return line;
        }

    };

})(); 