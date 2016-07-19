'use strict';
function load() {
    window.dynamicNumbersBound = false;
    var wow = new WOW();
    WOW.prototype.show = function (box) {
        wow.applyStyle(box);
        if (typeof box.parentNode !== 'undefined' && hasClass(box.parentNode, 'dynamic-numbers') && !window.dynamicNumbersBound) {
            bindDynamicNumbers();
            window.dynamicNumbersBound = true;
        }
        return box.className = "" + box.className + " " + wow.config.animateClass;
    };
    wow.init();
    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    function bindDynamicNumbers() {
        $('.dynamic-number').each(function () {
            var startNumber = $(this).text();
            var endNumber = $(this).data('dnumber');
            var dynamicNumberControl = $(this);

            $({
                numberValue : startNumber
            }).animate({
                numberValue : endNumber
            }, {
                duration : 4000,
                easing : 'swing',
                step : function () {
                    $(dynamicNumberControl).text(Math.ceil(this.numberValue));
                }
            });
        });
    }
};
/**
 * @ngdoc function
 * @name kitchenSecretAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kitchenSecretAppApp
 */
angular.module('kitchenSecretApp')
.controller('MainCtrl', function ($scope,$http,$window) {
    load();
    $('.scroll-to-top').click(function () {
        $('body,html').animate({
            scrollTop : 0
        }, 800);
        return false;
    });


    $scope.admin = $window.sessionStorage['admin'];
    $scope.message = "快来分享菜谱!"; 
    $scope.messagehref = "/#/submit_recipe";

    if($scope.admin)
    {
        $scope.message = "快来管理菜谱！";
        $scope.messagehref = "/#/admin";
    }

    $scope.userid=$window.sessionStorage['userid'];
    $http.get('api/users/'+$scope.userid).success(function  (data) {
     $scope.awesomeThings=data;
  });

    $http.get('api/getrecipes').success(function  (data) {
        $http.get('api/getrecipe/'+data[(data.length-1)]._id)
             .success(function (data1){
                $scope.newrecipelist = data1;
                $scope.newrecipelist[1] = data[data.length-2];
                $scope.newrecipelist[2] = data[data.length-3];
                $scope.newrecipelist[3] = data[data.length-4];
                $scope.newrecipelist[4] = data[data.length-5];
                $scope.newrecipelist[5] = data[data.length-6];
            });

        $scope.recommandrecipe = data[0];
        $http.get('api/users/'+data[0].userId).success(function  (data2) {
            $scope.author=data2[0];
        });

        for(var i=1; i<data.length;i++)
        {
            if(data[i].likeNum > $scope.recommandrecipe.likeNum){
                $scope.recommandrecipe = data[i];
                $http.get('api/users/'+data[i].userId).success(function  (data2) {
                   $scope.author=data2[0];
                });
            }
        }        
    });

});
