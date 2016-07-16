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
	});


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
             $scope.likeNum = data.length;
        });

    $http({
            method : 'PUT',
            url : 'api/putrecipelike/'+$routeParams.id,
            data :
            "likeNum=" + $scope.likeNum,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
    }).success(function (data, status, headers, config) {})
      .error(function (data, status, headers, config) {});

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
