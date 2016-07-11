'use strict';

/**
 * @ngdoc overview
 * @name kitchenSecretAppApp
 * @description
 * # kitchenSecretAppApp
 *
 * Main module of the application.
 */
angular.module('Authentication', []);
angular
  .module('kitchenSecretApp', [
    'Authentication',
    'ngRoute',
    'ngCookies'
  ])
  .config(['$routeProvider', '$locationProvider',  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
      })
      .when('/register',{
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
      })
      .when('/my_profile',{
        templateUrl: 'views/my_profile.html',
        controller: 'MyProfileCtrl',
      })
      .when('/recipe',{
        templateUrl: 'views/recipe.html',
        controller: 'RecipeCtrl',
      })
      .when('/recipes',{
        templateUrl: 'views/recipes.html',
        controller: 'RecipesCtrl',
      })
      .when('/submit_recipe',{
        templateUrl: 'views/submit_recipe.html',
        controller: 'SubmitRecipeCtrl',
      })
      .when('/contact',{
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
      })
      .when('/delete_reason',{
        templateUrl: 'views/delete_reason.html',
        controller: 'DeleteReasonCtrl',
      })
      .when('/find_recipe',{
        templateUrl: 'views/find_recipe.html',
        controller: 'FindRecipeCtrl',
      })
      .when('/admin',{
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
      })
      .when('/change_info',{
        templateUrl: 'views/change_info.html',
        controller: 'ChangeInfoCtrl',
      })
      .when('/change_pass',{
        templateUrl: 'views/change_pass.html',
        controller: 'ChangePassCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('IndexCtrl', [function($scope,$location){
    if (true) {

    }
      $scope.style='home';
  }]);
