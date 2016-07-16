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
  .controller('MyProfileCtrl',
    ['$scope','$location','$http','Upload','$window','$timeout',
    function ($scope,$location,$http,Upload,$window,$timeout) {
    load();

     $scope.userid=$window.sessionStorage['userid'];
     $http.get('api/users/'+$scope.userid)
     .success(function  (data) {
     $scope.awesomeThings=data;
     });
     $http.get('api/getownrecipe/'+$scope.userid)
     .success(function (data){
     $scope.recipeNum = data.length;
     $scope.recipelist=data;
     });

     //var likeList = new Array();

     $http.get('api/getuserlikes/'+$scope.userid).success(function  (data) {

$scope.likeNum = data.length;
      $http.get('api/getrecipe/'+data[0].recipeId)
             .success(function (data1){
                $scope.likerecipelist = data1;

        for(var i=1; i<data.length; i++){
          $http.get('api/getrecipe/'+data[i].recipeId)
             .success(function (data2){
                //likeList[i]=data1[0];
                $scope.likerecipelist.push(data2[0]);
            });          
        }
            });        
    });



     $scope.SubmitPhoto = function (file) {
            console.log(file);
            file.upload = Upload.upload({
              url: 'api/users/'+$scope.userid+"/photo",
              method:'PUT',
              data: {
                picture: file
                }
            });

            file.upload.then(function (response) {
              console.log(response);
              $timeout(function () {
                file.result = response.data;
                console.log(response.data);
                $location.path('/my_profile');
                $window.location.reload();
              });
            }, function (response) {
              if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
              // Math.min is to fix IE which reports 200% sometimes
              file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
            };
            
  }]);
