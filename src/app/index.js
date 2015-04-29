'use strict';

angular.module('flare', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/ideas/ideas.html',
        controller: 'IdeasCtrl'
      })
      .state('vote', {
        url: '/vote',
        templateUrl: 'app/vote/vote.html',
        controller: 'VoteCtrl'
      })
      .state('create', {
        url: '/create',
        templateUrl: 'app/create/create.html',
        controller: 'CreateCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
