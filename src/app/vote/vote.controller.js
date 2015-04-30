'use strict';

angular.module('flare').controller('VoteCtrl', function($scope, $stateParams, CommonService) {
  $scope.showVideo = true;
  $scope.type = 'person';
  $scope.id = '';

  CommonService.getIdea($stateParams.id).then(function(result) {
    $scope.idea = result.data;
    if (result.data.votesNeg + result.data.votesPos > 0) {
      $scope.idea.percentage = ((result.data.votesPos / (result.data.votesPos + result.data.votesNeg)) * 100).toFixed(0);
    } else {
      $scope.idea.percentage = 0;
    }
    $scope.showVideo = $scope.idea.video != "";
    $scope.type = result.data.type;
    $scope.id = result.data.id;
  }, function(result) {
    console.log(result.status);
  });

  $scope.voteNo = function() {
    if ($scope.type === 'person') {
      CommonService.voteForPerson($scope.id, -1)
    } else {
      CommonService.voteForIdea($scope.id, -1);
    }
    console.log('voted NO')
  };

  $scope.voteYes = function() {
    if ($scope.type === 'person') {
      CommonService.voteForPerson($scope.id, 1)
    } else {
      CommonService.voteForIdea($scope.id, 1);
    }
    console.log('voted YES')
  };

  $scope.back = function() {

  }

});
