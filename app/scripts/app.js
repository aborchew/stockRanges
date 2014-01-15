'use strict';

angular.module('rangesApp', [
  'ngRoute',
  'ngSanitize',
  'ngSlider'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
