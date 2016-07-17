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
  .controller('RecipesCtrl', function ($scope,$http,$routeParams) {
    load();
    $('.scroll-to-top').click(function () {
        $('body,html').animate({
            scrollTop : 0
        }, 800);
        return false;
    });

     $scope.type = "所有菜谱";

    if($routeParams.type == null)
    {
        $scope.type = "所有菜谱";
        $http.get('api/getrecipes').success(function  (data) {
            $scope.recipelist=data;
        });
    }
    else if($routeParams.type.split("-")[0] === "type")
    {
      $http.get('api/getrecipesbytype/' + $routeParams.type.split("-")[1]).success(function  (data) {
            $scope.recipelist=data;
            if(data.length === 0)
            {
                $scope.message = "很抱歉，暂时找到该类别菜谱！";
            }
        });
       if($routeParams.type.split("-")[1] === "entree")
        {
            $scope.type = "主菜";
        }
        else if($routeParams.type.split("-")[1] === "drink")
        {
            $scope.type = "饮料";
        }
        else if($routeParams.type.split("-")[1] === "desert")
        {
            $scope.type = "甜点";
        }
        else if($routeParams.type.split("-")[1] === "snack")
        {
            $scope.type = "小吃";
        }
        else if($routeParams.type.split("-")[1] === "fish")
        {
            $scope.type = "海鲜";
        }
        else 
        {
            $scope.type = "西餐";
        }

    }
    else if($routeParams.type.split("-")[0] === "label")
    {
      $http.get('api/getrecipesbylabel/' + $routeParams.type.split("-")[1]).success(function  (data) {
            $scope.recipelist=data;
            if(data.length === 0)
            {
                $scope.message = "很抱歉，暂时没有该类别菜谱！";
            }
        });
      if($routeParams.type.split("-")[1] === "noMeat")
        {
            $scope.type = "素食";
        }
        else if($routeParams.type.split("-")[1] === "noSugar")
        {
            $scope.type = "无糖";
        }
        else if($routeParams.type.split("-")[1] === "lowCal")
        {
            $scope.type = "低卡路里";
        }
        else if($routeParams.type.split("-")[1] === "lowFat")
        {
            $scope.type = "低脂";
        }
        else if($routeParams.type.split("-")[1] === "spicy")
        {
            $scope.type = "麻辣";
        }
        else 
        {
            $scope.type = "无乳糖";
        }
    }

    
  });
