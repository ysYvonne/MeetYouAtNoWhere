'use strict';

/**
 * @ngdoc overview
 * @name kitchenSecretAppApp
 * @description
 * # kitchenSecretAppApp
 *
 * Main module of the application.
 */
angular
  .module('kitchenSecretApp', [
    'ngRoute',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('IndexCtrl', [function($scope,$location){
    if (true) {
      
    }
      $scope.style='home';
  }]);
