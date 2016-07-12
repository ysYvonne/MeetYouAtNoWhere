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
  	['$scope', '$rootScope', '$location', '$http', '$window', 'AuthenticationService','Upload', '$timeout',
        function ($scope, $rootScope, $location, $http, $window, AuthenticationService ,Upload, $timeout) {
            load();
            $scope.newstring = {};
            $scope.orignalpic = {};
            var imagestring = {};



            $scope.ingredientlist=[{name:"",amount:""}];

            $scope.addingredient=function(){
                var obj={name:"",amount:""};
                $scope.ingredientlist.push(obj);
            };

            $scope.delingredient=function(idx){
                $scope.ingredientlist.splice(idx,1);
            };

            $scope.instructionlist=[{detail:"第1步:"}];

            $scope.addinstruction=function(){
                var obj={detail:"第"+($scope.instructionlist.length+1)+"步:"};
                $scope.instructionlist.push(obj);
            };

            $scope.delinstruction=function(idx){
                $scope.instructionlist.splice(idx,1);
            };

            $scope.SubmitRecipe = function (file) {



            file.upload = Upload.upload({
              url: 'api/recipe',
              method:'POST',
              data: {
                name:$scope.name,
                makeTime:$scope.makeTime,
                calorie:$scope.calorie,
                peopleNum:$scope.peopleNum,
                description:$scope.description,
                picture: file
                },
            });

            file.upload.then(function (response) {
              $timeout(function () {
                file.result = response.data;
              });
            }, function (response) {
              if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
              // Math.min is to fix IE which reports 200% sometimes
              file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });




                        // $http({
                        // method : 'POST',
                        //     url: 'api/recipe_Label',
                        //     data: "",
                        //     //把type和level写入，要得到上面获得的recipe_id和对应label的id
                        //     headers:{
                        //         'Content-Type' : 'application/x-www-form-urlencoded'
                        //     }
                        // }).success(function (data, status, headers, config) {
                        //     $location.path('/');
                        // }).error(function (data, status, headers, config) {
                        //     $scope.message = "register error";
                        // });










              
                        // $window.location.reload();
                };

            }
    ]);
