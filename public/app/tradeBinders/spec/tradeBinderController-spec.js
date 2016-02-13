(function () {
  'use strict';

  describe('tradeBinder', function () {
    var scope, vm, controller;
    beforeEach(function () {
      module('tradeBinders.TradeBindersController');
    });

    describe('TradeBindersController', function () {
      beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        vm = $controller('TradeBindersController', {
          $scope: scope
        });
      }));
      
      //Just a quick setup that tests one variable that starts out set as 'name'

      it('should initialize fields', function () {
        expect(vm.sortType).toEqual('name');
        expect(vm.sortReverse).toBeFalsy();
      });
    });
  });
})();