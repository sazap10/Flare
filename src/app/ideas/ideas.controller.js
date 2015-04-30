'use strict';

angular.module('flare')
  .controller('IdeasCtrl', function ($scope, CommonService, $state) {
    $scope.showShare = false;
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
    $scope.voteNo = function() {
      if ($stateParams.type === 'idea') {
        CommonService.voteIdea($scope.idea.id, -1);
      } else {
        CommonService.votePerson($scope.idea.id, -1)
      }
      console.log('voted NO')
    };

    $scope.voteYes = function() {
      if ($stateParams.type === 'idea') {
        CommonService.voteIdea($scope.idea.id, 1);
      } else {
        CommonService.votePerson($scope.idea.id, 1)
      }
      console.log('voted YES')
    };

    $scope.share = function() {
      $scope.showShare = !$scope.showShare;
    }
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
