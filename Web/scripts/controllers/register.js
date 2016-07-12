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
            $scope.register = function () {
                if ($scope.err) {
                    $scope.message = "密码不一致";
                } else {
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
                        $location.path('/#/login');
                        // $window.location.reload();
                    })
                    .error(function (data, status, headers, config) {
                        $scope.message = "register error";
                    });
                };

            }
        }
    ]);
