'use strict';

angular.module('rangesApp')
  .controller('MainCtrl', function ($scope, $filter, $timeout, $compile, Stocks) {

    $scope.stocksProvider = Stocks;
    $scope.userRange = {
      min: 0,
      max: 10000
    }

    $scope.getRange = function (f) {
      var r = [];
      angular.forEach($scope.stocksProvider.getResults(), function (stock) {
        r.push(stock[f]);
      })
      r.sort(function (a,b) {
        return a - b;
      })
      return r;
    }

    $scope.filteredStocks = function () {

      function isInRange (num) {
        if(num >= $scope.userRange.min && num <= $scope.userRange.max) {
          return true;
        }
        return false;
      }

      var f = $filter('filter')($scope.stocksProvider.getResults(), function (stock) {
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

    $scope.generateRanges = function () {

      $scope.stockRange = {
        min: $scope.getRange('YearLow')[0],
        max: $scope.getRange('YearHigh')[$scope.getRange('YearHigh').length-1]
      }

      $scope.sliderValue = '0;' + $scope.stockRange.max
      $scope.sliderOptions = {
        from: 0,
        to: $scope.stockRange.max,
        step: .1,
        dimension: " $"
      };

    };

    $scope.$watch(function () {
      return $scope.sliderValue;
    }, function (n,o) {
      $scope.userRange.min = n.split(';')[0]
      $scope.userRange.max = n.split(';')[1]
    },true)

    $scope.$watch(function () {
      return $scope.stocksProvider.getResults();
    }, function (n,o) {
      if(!o || n.length != o.length) {
        $scope.generateRanges();
        $('#sliderContainer').html('')
        $('#sliderContainer').html($compile('<input ng-model="sliderValue"  type="text" id="slider" slider options="sliderOptions" />')($scope));
      };
    }, true);

    $scope.generateRanges();

  });
