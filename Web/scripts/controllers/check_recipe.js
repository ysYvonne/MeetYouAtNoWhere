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
  .controller('CheckRecipeCtrl', function ($scope,$http,$window,$routeParams,$location) {

    load();

    $http.get('api/getrecipe/'+$routeParams.id).success(function  (data) {
         $scope.recipe=data[0];
         $scope.steps=angular.fromJson(data[0].steps);
         $scope.meterials=angular.fromJson(data[0].meterials);
         $http.get('api/users/'+data[0].userId).success(function  (data1) {
            $scope.author=data1[0];
        });
    });

    $scope.checkOK = function () {
       $http({
            method : 'PUT',
            url : 'api/putrecipestatus/'+$routeParams.id ,
            data :
            "status=" + 1 ,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function (data, status, headers, config) {
            $location.path('/#/admin');
        })
        .error(function (data, status, headers, config) {
            $scope.message = "changeInfo error";
        });
     };

     var deletemessage = "可能是黑暗料理吧~";

     if($scope.deleteReason != undefined)
      deletemessage = $scope.deleteReason;

     $scope.checkNotOK = function () {
      $http({
            method : 'PUT',
            url : 'api/putrecipestatus/'+$routeParams.id ,
            data :
            "deleteReason="+ $scope.deletemessage +
            "&status=" + 2 ,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function (data, status, headers, config) {
            $location.path('/#/admin');
        })
        .error(function (data, status, headers, config) {
            $scope.message = "changeInfo error";
        });
     };


});
