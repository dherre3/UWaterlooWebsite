'use strict';

/**
 * @ngdoc overview
 * @name newSiteApp
 * @description
 * # newSiteApp
 *
 * Main module of the application.
 */
angular
  .module('newSiteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngMaterial'
  ]).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('teal');

  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('teal');
})
  .config(['$urlRouterProvider','$stateProvider', function ($urlRouterProvider,$stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url:'/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('about', {
        url:'/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      });
  }]);
