'use strict';

angular.module('flare')
  .controller('IdeasCtrl', function ($scope, CommonService, $state) {
    $scope.personId = '';
    $scope.goToVote = function() {
      $state.go('vote', {type:'person', id:$scope.personId})
    };
    CommonService.getPerson('1000').then(function(result) {
      $scope.person = result.data;
      $scope.personId = $scope.person.id;
      console.log($scope.personId);
    }, function(result) {
      console.log(result.status);
    });
    CommonService.getIdeas().then(function(result) {
      $scope.ideas = result.data;
    }, function(result) {
      console.log(result.status);
    });
  })
  .directive('videoControls', function() {
      return {
        link : function(scope, element) {
          element.on('click', function(event) {
            if (event.target.paused) {
              event.target.play();
            } else {
              event.target.pause();
            }
          })
        }
      }
  });
