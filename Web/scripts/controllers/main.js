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
    $scope.userid=$window.sessionStorage['userid'];
    $http.get('api/users/'+$scope.userid).success(function  (data) {
     $scope.awesomeThings=data;
  });
});
