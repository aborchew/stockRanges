'use strict';

angular.module('rangesApp')
  .controller('MainCtrl', function ($scope, $filter, $timeout, Stocks) {

    $scope.stocksProvider = Stocks;

    $scope.getRange = function (f) {
      var r = [];
      angular.forEach($scope.stocksProvider.results, function (stock) {
        r.push(parseFloat(stock[f]));
      })
      r.sort(function (a,b) {
        return a - b;
      })
      return r;
    }

    $scope.updateFilteredStocks = function () {

      function isInRange (num) {
        if(num >= $scope.userRange.min && num <= $scope.userRange.max) {
          return true;
        }
        return false;
      }

      $scope.filteredStocks = function () {
        var f = $filter('filter')($scope.stocksProvider.results, function (stock) {
          if(isInRange(stock.YearLow) || isInRange(stock.YearHigh)) {
            stock.inRange = true;
            return true;
          } else {
            stock.inRange = false;
            return false;
          }
        })
        return f;
      }
      console.log($scope.filteredStocks());
    }

    $scope.userRange = {}

    $scope.stockRange = {
      min: $scope.getRange('YearLow')[0],
      max: $scope.getRange('YearHigh')[$scope.getRange('YearHigh').length-1]
    }

    $scope.sliderValue = '120;900'
    $scope.sliderOptions = {
      from: 0,
      to: $scope.stockRange.max + 10,
      step: .1,
      dimension: " $"
    };

    $scope.$watch(function () {
      return $scope.sliderValue;
    }, function (n,o) {
      $scope.userRange.min = n.split(';')[0]
      $scope.userRange.max = n.split(';')[1]
      $scope.updateFilteredStocks();
    },true)

    $scope.updateFilteredStocks();

  });
