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

                            SearchFactory.getCards(card.name)
                                    .success(function (dataResponse) {
                                        dataResponse.forEach(function (foundCard) {
                                            if (foundCard.name.toUpperCase() === card.name.toUpperCase())
                                                var cardImage;
                                            for (var i = 0; i < foundCard.editions.length; i++) {
                                                if (foundCard.editions[i].multiverse_id !== 0) {
                                                    cardImage = foundCard.editions[i].image_url;
                                                    break;
                                                }
                                            }
//                                            
                                            Collection.push({
                                                name: foundCard.name,
                                                ownedQuantity: card.num,
                                                image: cardImage
                                            });
                                        });
                                    });
                        });
            },
            removeCard: function (name) {
                var indexOf = Collection.indexOf(name);
                Collection.splice(indexOf, 1);
            },
            upCardQuantity: function (name) {
                var indexOf = Collection.indexOf(name);
                //console.log("up " + name);
                Collection[indexOf].ownedQuantity += 1;
            },
            lowerCardQuantity: function (name) {
                var indexOf = Collection.indexOf(name);
                Collection[indexOf].ownedQuantity -= 1;
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
            return line.substring(indexOf + 1);
        } else {
            return line;
        }

    };

})(); 