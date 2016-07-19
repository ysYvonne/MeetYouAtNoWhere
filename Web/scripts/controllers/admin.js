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
  .controller('AdminCtrl', function ($scope,$http) {
    load();

    $http.get('api/getcheckrecipes')
     .success(function (data){
     $scope.recipeNum = data.length;
     $scope.recipelist=data;
     });

     $http.get('api/getcontacts')
     .success(function (data){
     $scope.contactnum = data.length;
     $scope.contactlist=data;
     });

     $scope.checkIdea = function (contactId) {
     	$http.delete('api/deletecontact/'+contactId)
	     .success(function (data){
		     $http.get('api/getcontacts')
			     .success(function (data){
			     $scope.contactnum = data.length;
			     $scope.contactlist=data;
		     });
	     });
     };
  });
