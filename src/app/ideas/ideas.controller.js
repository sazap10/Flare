'use strict';

angular.module('flare')
  .controller('IdeasCtrl', function ($scope, CommonService, $state, $sce) {
    $scope.voted = false;
    $scope.showShare = false;
    $scope.personId = '';
    $scope.icon = "assets/icons/CEOPhoto_110x110.png";
    $scope.goToVote = function() {
      $state.go('vote', {type:'person', id:$scope.personId})
    };
    CommonService.getPerson('1000').then(function(result) {
      $scope.person = result.data;
      $scope.personId = $scope.person.id;
      $scope.person.author = $sce.trustAsHtml(result.data.author);
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
      if (!$scope.voted) {
        CommonService.votePerson($scope.person.id, -1)
        $scope.voted = true;
        console.log('voted NO')
      }
    };

    $scope.voteYes = function() {
      if (!$scope.voted) {
        CommonService.votePerson($scope.person.id, 1)
        $scope.voted = true;
        console.log('voted YES')
      }
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
