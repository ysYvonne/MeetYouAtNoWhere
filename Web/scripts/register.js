'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
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
                data:  //"nickname="+$scope.nickname+
                "&password="+$scope.password+
               // "&sex="+$scope.sex+
                "&email="+$scope.email//+
               // "&birth="$scope.birth+
                //"&picture="+$scope.photo
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
