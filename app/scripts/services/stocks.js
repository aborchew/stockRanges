'use strict';

angular.module('rangesApp')
  .service('Stocks', function Stocks($http,$q) {

    var generateParams = function () {
      return '"' + stockSymbols.join('","') + '"';
    }

    var stockSymbols = ["GOOG","MSFT"]
      , yahooURI = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(' + generateParams(stockSymbols) + ')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
      , responseData = {
        "query": {
          "count": 2,
          "created": "2014-01-14T22:56:17Z",
          "lang": "en-US",
          "results": {
            "quote": [
              {
                "symbol": "GOOG",
                "AverageDailyVolume": "1837970",
                "Change": "+26.42",
                "DaysLow": "1128.09",
                "DaysHigh": "1151.00",
                "YearLow": 695.52,
                "YearHigh": 1147.3199,
                "MarketCapitalization": "384.0B",
                "LastTradePriceOnly": "1149.40",
                "DaysRange": "1128.09 - 1151.00",
                "Name": "Google Inc.",
                "Symbol": "GOOG",
                "Volume": "2482553",
                "StockExchange": "NasdaqNM"
              },
              {
                "symbol": "MSFT",
                "AverageDailyVolume": "40892700",
                "Change": "+0.80",
                "DaysLow": "34.63",
                "DaysHigh": "35.88",
                "YearLow": 26.83,
                "YearHigh": 38.98,
                "MarketCapitalization": "298.7B",
                "LastTradePriceOnly": "35.78",
                "DaysRange": "34.63 - 35.88",
                "Name": "Microsoft Corpora",
                "Symbol": "MSFT",
                "Volume": "41623260",
                "StockExchange": "NasdaqNM"
              }
            ]
          }
        }
      }
      , stockData = responseData.query.results.quote;

    function updateStocks () {
      var deferred = $q.defer();
      $http({method: 'GET', url: yahooURI}).
        success(function(data, status, headers, config) {
          if(data && data.query && data.query.results && data.query.results.quote) {
            angular.forEach(data.query.results.quote, function (stock,ind) {
              if(!stock.YearLow || !stock.YearHigh) {
                data.query.results.quote.splice(ind,1);
                stockSymbols.splice(stockSymbols.indexOf(stock.symbol),1);
              } else {
                stock.YearLow = parseFloat(stock.YearLow);
                stock.YearHigh = parseFloat(stock.YearHigh);
              }
            })
            stockData = data;
            deferred.resolve();
          } else {
            deferred.reject();
          }
        }).
        error(function(data, status, headers, config) {
          stockData = [];
          deferred.reject(arguments);
        });
      return deferred.promise;
    };

    updateStocks();

    return {
      update: function (symbols) {
        if(symbols && typeof symbols === 'object' && symbols.length && symbols.length > 0) {
          angular.forEach(symbols,function(symbol){
            if(typeof symbol === 'string' && stockSymbols.indexOf(symbol) == -1) {
              stockSymbols.push(symbol);
            }
          })
        }
        return updateStocks();
      },
      symbols: {
        get: function () {
          return stockSymbols;
        },
        remove: function (symbol) {
          if(typeof symbol === 'string' && stockSymbols.indexOf(symbol) != -1) {
            stockSymbols.splice(stockSymbols.indexOf(symbol),1);
          }
          return stockSymbols;
        }
      },
      results: function () {
        return stockData;
      }()
    }

  });
