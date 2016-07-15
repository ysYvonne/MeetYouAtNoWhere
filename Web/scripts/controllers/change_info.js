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
  .controller('ChangeInfoCtrl',
    ['$scope', '$rootScope', '$location', '$http', '$window', 'AuthenticationService',
        function ($scope, $rootScope, $location, $http, $window, AuthenticationService) {
            load();
            $scope.newstring = {};
            $scope.orignalpic = {};
            var imagestring = {};
            $scope.sexes = ["男", "女"];

            $scope.userid=$window.sessionStorage['userid'];
            $http.get('api/users/'+$scope.userid).success(function  (data) {
            	$scope.nickname=data[0].nickname;
            	$scope.sex = data[0].sex;
            	$scope.birth = data[0].birth;
            	$scope.intro = data[0].intro;
            });

            $scope.changeInfo = function () {
                    $http({
                        method : 'PUT',
                        url : 'api/users/'+$scope.userid +"/profile",
                        data :
                        "nickname=" + $scope.nickname +
                        "&sex=" + $scope.sex +
                        "&birth=" + $scope.birth +
                        "&intro=" + $scope.intro,
                        headers : {
                            'Content-Type' : 'application/x-www-form-urlencoded'
                        }
                    }).success(function (data, status, headers, config) {
                        $location.path('/#/my_profile');
                    })
                    .error(function (data, status, headers, config) {
                        $scope.message = "changeInfo error";
                    });
            }
        }
    ]);
