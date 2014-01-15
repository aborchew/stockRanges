'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('rangesApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a stocksProvider object to the $scope', function () {

    expect(scope.stocksProvider).not.toBeUndefined();
    expect(scope.stocksProvider.getResults()).not.toBeUndefined();
    expect(scope.stocksProvider.symbols).not.toBeUndefined();
    expect(scope.stocksProvider.symbols.get()).not.toBeUndefined();
    expect(scope.stocksProvider.symbols.remove()).not.toBeUndefined();
    expect(scope.stocksProvider.update()).not.toBeUndefined();

  });

  describe('Should attach a basic model for the user\'s desired feedback to the scope', function () {

    it('Should create placeholder min/max values', function () {

      expect(scope.userRange.min).not.toBeUndefined();
      expect(scope.userRange.max).not.toBeUndefined();

    })

  });

  describe('Should create some methods for isolating the stocks the user is looking for', function () {

    it('Should place a filteredStocks object on the scope', function () {

      expect(scope.filteredStocks()).not.toBeUndefined();

    })

    it('Should only return the stocks that are in the user\'s range', function () {

      scope.userRange.min = 500;
      expect(scope.filteredStocks().length).toBe(1);

      scope.userRange.min = 0;
      scope.userRange.max = 100;
      expect(scope.filteredStocks().length).toBe(1);

    })

  })

  describe('Calculations based on default stocks', function () {

    it('Should correctly calculate the minimum and maximum stock values', function () {

      expect(scope.stockRange.min).toEqual(26.83);
      expect(scope.stockRange.max).toEqual(1147.3199);

    })

  })

});
