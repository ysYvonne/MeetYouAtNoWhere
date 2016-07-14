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
    ['$scope', '$rootScope', '$location', '$http', '$window', 'AuthenticationService',
        function ($scope, $rootScope, $location, $http, $window, AuthenticationService) {
            load();
            $scope.newstring = {};
            $scope.orignalpic = {};
            var imagestring = {};
            $scope.sexes = ["男", "女"];

            $scope.$watch('email', function () {
                $scope.test1();
            });

            $scope.$watch('password', function () {
                $scope.test();
            });
            $scope.$watch('password1', function () {
                $scope.test();
            });



            $scope.test = function () {
                if ($scope.password1 !== $scope.password) {
                    $scope.err = true;
                } else {
                    $scope.err = false;
                }
            };

            $scope.test1 = function () {

                $scope.err1 = false;

                $http.get('api/users/')
                 .success(function  (data) {
                    for(var i = 0; i < data.length; i++){
                        if(data[i].email === $scope.email){
                        console.log(data[i].email);
                        $scope.err1 = true;
                       }
                   }
                });                  
            };

            $scope.register = function () {
                if ($scope.err) {
                    $scope.message = "密码不一致";
                }
                else if($scope.err1){
                    $scope.message = "该邮箱已被注册"
                } 
                else {
                    $http({
                        method : 'POST',
                        url : 'api/users',
                        data :
                        "nickname=" + $scope.nickname +
                        "&password=" + $scope.password +
                        "&sex=" + $scope.sex +
                        "&email=" + $scope.email +
                        "&birth=" + $scope.birth +
                        "&intro=" + $scope.intro,
                        headers : {
                            'Content-Type' : 'application/x-www-form-urlencoded'
                        }
                    }).success(function (data, status, headers, config) {
                        $location.path('/login');
                    })
                    .error(function (data, status, headers, config) {
                        $scope.message = "register error";
                    });
                };

            }
        }
    ]);
