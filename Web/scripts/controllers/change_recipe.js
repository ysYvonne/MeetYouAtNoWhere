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
  .controller('ChangeRecipeCtrl',  function ($scope, $location, $http,  AuthenticationService, Upload, $timeout, $routeParams) {
  	
    load();
    
    $http.get('api/getrecipe/'+$routeParams.recipe_id).success(function  (data) {
	     $scope.recipe=data[0];
	     //$scope.steps=angular.fromJson(data[0].steps);
	     //$scope.meterials=angular.fromJson(data[0].meterials);
	     $scope.name = data[0].name;
         $scope.makeTime = data[0].makeTime;
         $scope.calorie = data[0].calorie;
         $scope.peopleNum = data[0].peopleNum;
         $scope.description = data[0].description;

	     $http.get('api/users/'+data[0].userId).success(function  (data1) {
     		$scope.author=data1[0];
  		});
	});

	$scope.newstring = {};
    $scope.orignalpic = {};
    var imagestring = {};
    $scope.levels = ["难度", "简单", "中等", "困难"];
    $scope.types = ["选择一个分类", "主菜","甜点", "饮料", "小吃", "西餐", "海鲜"];
    $scope.level = $scope.recipe.level;
    $scope.type = $scope.recipe.labels;
    $scope.ingredientlist = [{
            name : "",
            amount : ""
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
                    picture : file
                    // noMeat : ifnomeat,
                    // noSugar : ifnosugar,
                    // lowFat : iflowfat,
                    // spicy : ifspicy,
                    // noLactose : ifnolactose,
                    // lowCal : iflowcal
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



  });
