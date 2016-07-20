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
  .controller('RecipeCtrl', function ($scope,$http,$window,$routeParams,$location) {
    load();
	$http.get('api/getrecipe/'+$routeParams.id).success(function  (data) {
	     $scope.recipe=data[0];
	     $scope.steps=angular.fromJson(data[0].steps);
	     $scope.meterials=angular.fromJson(data[0].meterials);
	     $http.get('api/users/'+data[0].userId).success(function  (data1) {
     		$scope.author=data1[0];
  		});
         if($scope.recipe.labels === "主菜")
            $scope.typeEnglish = "entree";
        else if($scope.recipe.labels === "饮料")
            $scope.typeEnglish = "drink";
        else if($scope.recipe.labels === "甜点")
            $scope.typeEnglish = "desert";
        else if($scope.recipe.labels === "小吃")
            $scope.typeEnglish = "snack";
        else if($scope.recipe.labels === "海鲜")
            $scope.typeEnglish = "fish";
        else if($scope.recipe.labels === "西餐")
            $scope.typeEnglish = "west";
        $scope.likes = [{
                name : $scope.recipe.labels,
                form : "type",
                label :$scope.typeEnglish
            }
        ];
        if($scope.recipe.noMeat)
        {
            var obj = {
                name : "素食",
                form : "label",
                label :"noMeat"
            };
            $scope.likes.push(obj);
        };
        if($scope.recipe.lowFat)
        {
            var obj = {
                name : "低脂",
                form : "label",
                label :"lowFat"
            };
            $scope.likes.push(obj);
        };
        if($scope.recipe.noSugar)
        {
            var obj = {
                name : "无糖",
                form : "label",
                label :"noSugar"
            };
            $scope.likes.push(obj);
        };
        if($scope.recipe.noLactose)
        {
            var obj = {
                name : "无乳糖",
                form : "label",
                label :"noLactose"
            };
            $scope.likes.push(obj);
        };
        if($scope.recipe.lowCal)
        {
            var obj = {
                name : "低卡路里",
                form : "label",
                label :"lowCal"
            };
            $scope.likes.push(obj);
        };
        if($scope.recipe.spicy)
        {
            var obj = {
                name : "麻辣",
                form : "label",
                label :"spicy"
            };
            $scope.likes.push(obj);
        };
	});

    $scope.typeEnglish ="";

	//$scope.likeMessage = "正在找这货有没有赞过..";
	$scope.likeMessage = "加入收藏";
	$scope.hasLiked = false;
	$scope.userid=$window.sessionStorage['userid'];
    $http.get('api/getuserlikes/'+$scope.userid).success(function  (data) {
        for(var i=0; i<data.length; i++){
        	if(data[i].recipeId === $routeParams.id)
        	{
        		$scope.hasLiked = true;
        		$scope.like_id = data[i]._id;
        		$scope.likeMessage = "取消收藏";
        	}        		
        }	
    });

    $http.get('api/getlike/'+$routeParams.id).success(function  (data) {
              $http({
            method : 'PUT',
            url : 'api/putrecipelike/'+$routeParams.id,
            data :
            "likeNum=" + data.length,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
    });
             // $scope.likeNum = data.length;
        });

   

	 $scope.addLike = function (idx) {
	 	       if($scope.hasLiked){
	 	       	$http.delete('api/deletelike/'+$scope.like_id).success(function  (data) {
	 	       		  $window.location.reload();
	 	       		//$scope.likeMessage = "加入收藏";
	 	       	});
	 	        }
	 	       else{
	 	       	$http({
                        method : 'POST',
                        url : 'api/like',
                        data :
                        "recipe_id=" + $routeParams.id,
                        headers : {
                            'Content-Type' : 'application/x-www-form-urlencoded'
                        }
                    }).success(function (data, status, headers, config) {
                    	//$scope.likeMessage = "取消收藏";
                        $window.location.reload();
                    })
                    .error(function (data, status, headers, config) {
                        $scope.message = "register error";
                    });
	 	       }   
            };
  });
