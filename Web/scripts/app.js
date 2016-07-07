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
  .module('kitchenSecretAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
