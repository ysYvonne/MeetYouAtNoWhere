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
  .controller('SubmitRecipeCtrl', 
  	['$scope', '$rootScope', '$location', '$http', '$window', 'AuthenticationService',
        function ($scope, $rootScope, $location, $http, $window, AuthenticationService) {
            load();
            $scope.newstring = {};
            $scope.orignalpic = {};
            var imagestring = {};

            $scope.SubmitRecipe = function () {
                    $http({
                        method : 'POST',
                        url : 'api/recipe',
                        data :
                        "name=" + $scope.name +
                        "&makeTime=" + $scope.makeTime +
                        "&calorie=" + $scope.calorie +
                        "&peopleNum=" + $scope.peopleNum +
                        "&description=" + $scope.description,
                        headers : {
                            'Content-Type' : 'application/x-www-form-urlencoded'
                        }
                    }
                    {
                    	method : 'POST',
                        url : 'api/recipe_Label',
                        data :
                        //把type和level写入，要得到上面获得的recipe_id和对应label的id
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
