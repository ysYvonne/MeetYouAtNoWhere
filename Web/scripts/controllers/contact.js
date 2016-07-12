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
  .controller('ContactCtrl',   	
  	['$scope', '$rootScope', '$location', '$http', '$window', 'AuthenticationService',
        function ($scope, $rootScope, $location, $http, $window, AuthenticationService) {
            load();
            $scope.newstring = {};
            $scope.orignalpic = {};
            var imagestring = {};

            $scope.submitContact = function () {
                    $http({
                        method : 'POST',
                        url : 'api/contact',
                        data :
                        "name=" + $scope.name +
                        "&email=" + $scope.email +
                        "&phone=" + $scope.phone +
                        "&comments=" + $scope.comments,
                        headers : {
                            'Content-Type' : 'application/x-www-form-urlencoded'
                        }
                    }).success(function (data, status, headers, config) {
                        $location.path('/#/');
                        // $window.location.reload();
                    })
                    .error(function (data, status, headers, config) {
                        $scope.message = "register error";
                    });
                };

            }
        }
    ]);
