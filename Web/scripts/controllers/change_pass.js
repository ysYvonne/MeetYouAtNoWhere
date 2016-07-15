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
  .controller('ChangePassCtrl',
    ['$scope', '$rootScope', '$location', '$http', '$window', 'AuthenticationService',
        function ($scope, $rootScope, $location, $http, $window, AuthenticationService) {
            load();

            $scope.$watch('old_password', function () {
                $scope.test1();
            });

            $scope.$watch('new_password', function () {
                $scope.test();
            });
            $scope.$watch('new_password1', function () {
                $scope.test();
            });



            $scope.test = function () {
                if ($scope.new_password !== $scope.new_password1) {
                    $scope.err = true;
                } else {
                    $scope.err = false;
                }
            };

           

            $scope.test1 = function () {
            	$scope.err1 = false;

            	$scope.userid=$window.sessionStorage['userid'];
            	$http.get('api/users/'+$scope.userid).success(function  (data) {
            	 	if ($scope.old_password !== data[0].password) {
            	 		  $scope.err1 = true;
            	 		}
            	 });

                
            };

            $scope.changePass = function () {
            	 if ($scope.err) {
                    $scope.message = "两次输入密码不一致";
                }
                else if($scope.err1){
                    $scope.message = "旧密码输入错误"
                } 
                else {
                    $http({
                        method : 'PUT',
                        url : 'api/users/'+$scope.userid ,
                        data :
                        "password=" + $scope.new_password,
                        headers : {
                            'Content-Type' : 'application/x-www-form-urlencoded'
                        }
                    }).success(function (data, status, headers, config) {
                        $location.path('/#/my_profile');
                    })
                    .error(function (data, status, headers, config) {
                        $scope.message = "changeInfo error";
                    });
                };
            }
        }
    ]);
