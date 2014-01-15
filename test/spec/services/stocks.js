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

    it('should have 2 stocks available with some dummy historical data', function () {

      expect(Stocks.getResults().length).toBe(2);

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

      expect(Stocks.symbols.get().length).toBeGreaterThan(0);

      Stocks.update(['YHOO']);

      expect(Stocks.symbols.get().indexOf('YHOO')).not.toEqual(-1);

    })

    it('Should remove symbols from the array', function () {

      var symbolsLength = Stocks.symbols.get().length;

      expect(Stocks.symbols.get().length).toBeGreaterThan(0);

      Stocks.symbols.remove('MSFT');

      expect(Stocks.symbols.get().length).toEqual(symbolsLength-1);

      Stocks.symbols.remove('GOOG');

      expect(Stocks.symbols.get().length).toEqual(symbolsLength-2);

    })

  })

});
