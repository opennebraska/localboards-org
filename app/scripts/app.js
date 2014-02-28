'use strict';

angular.module('localboardsUiReduxApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/boards', {
        templateUrl: 'views/boards.html',
        controller: 'BoardsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
