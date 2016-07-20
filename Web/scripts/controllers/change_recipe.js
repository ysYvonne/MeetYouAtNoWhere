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
  .controller('ChangeRecipeCtrl',  ['$scope', '$location', '$http', 'AuthenticationService', 'Upload', '$timeout','$routeParams',
    function ($scope, $location, $http,  AuthenticationService, Upload, $timeout, $routeParams) {
  	
    load();
    
    $http.get('api/getrecipe/'+$routeParams.recipe_id).success(function  (data) {
	     $scope.recipe=data[0];
	     $scope.steps=angular.fromJson(data[0].steps);
	     $scope.meterials=angular.fromJson(data[0].meterials);
	     $scope.name = data[0].name;
         $scope.makeTime = data[0].makeTime;
         $scope.calorie = data[0].calorie;
         $scope.peopleNum = data[0].peopleNum;
         $scope.description = data[0].description;
         $scope.level = $scope.recipe.level;
         $scope.type = $scope.recipe.labels;

	     $http.get('api/users/'+data[0].userId).success(function  (data1) {
     		$scope.author=data1[0];
  		});

        $scope.ingredientlist = [{
                name : $scope.meterials[0].name,
                amount : $scope.meterials[0].amount
            }
        ];
        for(var i=1;i< $scope.meterials.length;i++)
        {
             var obj = {
                name : $scope.meterials[i].name,
                amount : $scope.meterials[i].amount
            };
            $scope.ingredientlist.push(obj);
        }

        $scope.instructionlist = [{
                detail : $scope.steps[0].detail
            }
        ];

        for(var i=1;i< $scope.steps.length;i++)
        {
             var obj = {
                detail : $scope.steps[i].detail
            };
            $scope.instructionlist.push(obj);
        }
	});

	$scope.newstring = {};
    $scope.orignalpic = {};
    var imagestring = {};
    $scope.levels = [ "简单", "中等", "困难"];
    $scope.types = ["主菜","甜点", "饮料", "小吃", "西餐", "海鲜"];

    var selectlabel = [false,false,false,false,false,false];
            
    $scope.radioclick = function (num) {
        if(selectlabel[num-1])
            selectlabel[num-1] = false;
        else
            selectlabel[num-1] = true;

    };

    $scope.instructionlist = [{
            detail : ""
        }
    ];

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

   

    $scope.addinstruction = function () {
        var obj = {
            detail : ""
        };
        $scope.instructionlist.push(obj);
    };

    $scope.delinstruction = function (idx) {
        $scope.instructionlist.splice(idx, 1);
    };

    $scope.PutRecipeInfo = function () {
                    $http({
                        method : 'PUT',
                        url : 'api/putrecipe/'+$routeParams.recipe_id +"/info",
                        data :
                            "name=" +$scope.name +
                            "&makeTime=" +$scope.makeTime+
                            "&calorie=" + $scope.calorie+
                            "&peopleNum=" + $scope.peopleNum+
                            "&description=" +$scope.description+
                            "&meterials="+ angular.toJson($scope.ingredientlist)+
                            "&steps=" +angular.toJson($scope.instructionlist)+
                            "&level=" + $scope.level+
                            "&labels=" + $scope.type+
                            "&noMeat=" + selectlabel[0]+
                            "&noSugar="+ selectlabel[1]+
                            "&lowFat=" + selectlabel[2]+
                            "&spicy="+ selectlabel[3]+
                            "&noLactose=" + selectlabel[4]+
                            "&lowCal="+selectlabel[5],
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

    $scope.PutRecipePhoto = function (file) {

        console.log(file);

        file.upload = Upload.upload({
                url : 'api/putrecipe/'+$routeParams.recipe_id + "/photo",
                method : 'PUT',
                data : {
                    picture : file
                }
            });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                $location.path('/#/my_profile');
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
