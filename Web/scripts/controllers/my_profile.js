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
  .controller('MyProfileCtrl', function ($scope,$http,$window) {
    load();

     $scope.userid=$window.sessionStorage['userid'];
     $http.get('api/users/'+$scope.userid)
     .success(function  (data) {
     $scope.awesomeThings=data;
     // if(awesomeThings[0].photo === null)
     // 	awesomeThings[0].photo="images/avatar.jpg";
     // });

     $scope.SubmitPhoto = function (file) {

            file.upload = Upload.upload({
              url: 'api/users/'+$scope.userid+"/photo",
              method:'PUT',
              data: {
                picture: file
                }
            });

            file.upload.then(function (response) {
              $timeout(function () {
                file.result = response.data;
                console.log(response.data);
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
            
  });
