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
  .controller('RegisterCtrl',  
  	['$scope', '$rootScope', '$location','$http','$window','AuthenticationService',
    	function ($scope, $rootScope, $location, $http,$window, AuthenticationService) {
            $scope.newstring={};
            $scope.orignalpic={};
            var imagestring={};
          $scope.register=function  () {
            $http({
                method: 'POST',
                url: 'api/users',
                data:  
                "nickname="+$scope.nickname+
                "&password="+$scope.password+
                //"&sex="+$scope.sex+
                "&email="+$scope.email+
                "&birth="$scope.birth+
                "&intro="+$scope.intro
                ,
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function  (data,status,headers,config) {
                 $location.path('/');
                    // $window.location.reload();
            })
            .error(function (data, status, headers, config) {
                $scope.message='register error';
            });
        };

  }]);
