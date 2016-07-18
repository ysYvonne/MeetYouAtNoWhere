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
  .controller('FindRecipeCtrl', function ($scope,$http) {
    load();

    $('.scroll-to-top').click(function () {
        $('body,html').animate({
            scrollTop : 0
        }, 800);
        return false;
    });

    $scope.types = ["或者再来选择一个分类吧", "主菜","甜点", "饮料", "小吃", "西餐", "海鲜"];
    $scope.type = $scope.types[0];

     $scope.findByKeywords = function () {
      //先按照关键字查询
      $http({
              method : 'POST',
              url : 'api/getrecipesbykeywords',
              data :
              "keywords=" + $scope.keywords,
              headers : {
                  'Content-Type' : 'application/x-www-form-urlencoded'
              }
          }).success(function  (data) {
              var find = false;
              for(var i=0; i<$scope.recipelist.length ;i++){
                for(var j=0;j<data.length;j++)
                {
                  if($scope.recipelist[i]._id===data[j]._id)
                  {
                    find = true;
                  }
                }
                if(find === true)
                {
                  find = false;
                }else
                {
                  $scope.recipelist.splice(i,1);
                  i--;
                }
              }

              //对选择的种类进行筛选
              var selectType = "";
              if($scope.type === "主菜")
                  {
                      selectType = "entree";
                  }
                  else if($scope.type === "饮料")
                  {
                      selectType = "drink";
                  }
                  else if($scope.type === "甜点")
                  {
                      selectType = "desert";
                  }
                  else if($scope.type === "小吃")
                  {
                      selectType = "snack";
                  }
                  else if($scope.type === "海鲜")
                  {
                      selectType = "fish";
                  }
                  else 
                  {
                      selectType = "west";
                  }
              $http.get('api/getrecipesbytype/' + selectType).success(function  (data1) {
                      var find = false;
                      for(var i=0; i<$scope.recipelist.length ;i++){
                        for(var j=0;j<data1.length;j++)
                        {
                          if($scope.recipelist[i]._id===data1[j]._id)
                          {
                            find = true;
                          }
                        }
                        if(find === true)
                        {
                          find = false;
                        }else
                        {
                          $scope.recipelist.splice(i,1);
                          i--;
                        }
                      }
              });
          });
          if($scope.recipelist.length === 0)
            {
                $scope.message = "很抱歉，暂时找到该类别菜谱！";
            }
    };


     $http.get('api/getrecipes').success(function  (data) {
      	$scope.recipelist = data;
  	});

  });
