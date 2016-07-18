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
    ['$scope', '$rootScope', '$location', '$http', '$window', 'AuthenticationService', 'Upload', '$timeout',
        function ($scope, $rootScope, $location, $http, $window, AuthenticationService, Upload, $timeout) {
            load();
            $scope.newstring = {};
            $scope.orignalpic = {};
            var imagestring = {};
            $scope.levels = ["难度", "简单", "中等", "困难"];
            $scope.types = ["选择一个分类", "主菜","甜点", "饮料", "小吃", "西餐", "海鲜"];
            $scope.level = $scope.levels[0];
            $scope.type = $scope.types[0]
                $scope.ingredientlist = [{
                        name : "",
                        amount : ""
                    }
                ];

            var selectlabel = [false,false,false,false,false,false];
            $scope.radioclick = function (num) {
                if(selectlabel[num-1])
                    selectlabel[num-1] = false;
                else
                    selectlabel[num-1] = true;

            };

            $scope.addingredient = function () {
                var obj = {
                    name : "",
                    amount : ""
                };
                $scope.ingredientlist.push(obj);
            };

            $scope.delingredient = function (idx) {
                $scope.ingredientlist.splice(idx, 1);
            };

            $scope.instructionlist = [{
                    detail : ""
                }
            ];

            $scope.addinstruction = function () {
                var obj = {
                    detail : ""
                };
                $scope.instructionlist.push(obj);
            };

            $scope.delinstruction = function (idx) {
                $scope.instructionlist.splice(idx, 1);
            };

            $scope.SubmitRecipe = function (file) {

                file.upload = Upload.upload({
                        url : 'api/recipe',
                        method : 'POST',
                        data : {
                            name : $scope.name,
                            makeTime : $scope.makeTime,
                            calorie : $scope.calorie,
                            peopleNum : $scope.peopleNum,
                            description : $scope.description,
                            meterials : angular.toJson($scope.ingredientlist),
                            steps : angular.toJson($scope.instructionlist),
                            level : $scope.level,
                            labels : $scope.type,
                            picture : file,
                            noMeat : selectlabel[0],
                            noSugar : selectlabel[1],
                            lowFat : selectlabel[2],
                            spicy : selectlabel[3],
                            noLactose : selectlabel[4],
                            lowCal : selectlabel[5]
                        }
                    });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        $location.path('/recipes');
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            };

        }
    ]);
