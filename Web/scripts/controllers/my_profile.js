'use strict';
/**
 * @ngdoc function
 * @name kitchenSecretAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kitchenSecretAppApp
 */
 function load() {
    new WOW().init();
 };
angular.module('kitchenSecretApp')
  .controller('MyProfileCtrl', function ($scope,$http,$window) {
    load();

     $scope.userid=$window.sessionStorage['userid'];
     $http.get('api/users/'+$scope.userid)
     .success(function  (data) {
     $scope.awesomeThings=data;
     });

  });
