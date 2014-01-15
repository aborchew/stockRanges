'use strict';

describe('Service: Stocks', function () {

  // load the service's module
  beforeEach(module('rangesApp'));

  // instantiate service
  var Stocks;
  beforeEach(inject(function(_Stocks_) {
    Stocks = _Stocks_;
  }));

  it('should create a Stocks object', function () {
    expect(!!Stocks).toBe(true);
  });

  describe('by default when loaded', function () {

    it('should have 2 stocks available with some historical data', function () {

      expect(Stocks.results.length).toBe(2);

    });

  });

  describe('When update is called', function () {

    it('should return a promise object', function () {

      expect(Stocks.update()).not.toBeUndefined();
      expect(typeof Stocks.update()).toBe('object');
      expect(Stocks.update().then()).not.toBeUndefined();
      expect(Stocks.update().catch()).not.toBeUndefined();
      expect(Stocks.update().finally()).not.toBeUndefined();

    });

  });

  describe('Methods for modifying the symbols being tracked', function () {

    it('Should add symbols to the array', function () {

      expect(Stocks.symbols.get()).toEqual(['GOOG','MSFT']);

      Stocks.update(['F','YHOO']);

      expect(Stocks.symbols.get()).toEqual(['GOOG','MSFT','F','YHOO']);

    })

    it('Should remove symbols from the array', function () {

      expect(Stocks.symbols.get()).toEqual(['GOOG','MSFT']);

      Stocks.symbols.remove('MSFT');

      expect(Stocks.symbols.get()).toEqual(['GOOG']);

      Stocks.symbols.remove('GOOG');

      expect(Stocks.symbols.get()).toEqual([]);

    })

  })

  describe('Calculations based on default stocks', function () {

    it('Should correctly calculate the minimum and maximum stock values', function () {

      expect(Stocks.range.min).toEqual(26.83);
      expect(Stocks.range.max).toEqual(1147.3199);

    })

  })

});
