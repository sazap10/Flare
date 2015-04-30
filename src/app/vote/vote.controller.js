'use strict';

angular.module('flare').controller('VoteCtrl', function($scope, $stateParams,  CommonService) {
  $scope.showVideo = true;
  CommonService.getIdea($stateParams.id).then(function(result) {
    $scope.idea = result.data;
    if (result.data.votesNeg + result.data.votesPos > 0){
      $scope.idea.percentage = ((result.data.votesPos/(result.data.votesPos + result.data.votesNeg)) * 100).toFixed(0);
    } else {
      $scope.idea.percentage = 0;
    }
    $scope.showVideo = $scope.idea.video != "";
  }, function(result) {
    console.log(result.status);
  });

  $scope.voteNo = function () {
    console.log('swipe left')
  };

  $scope.voteYes = function () {
    console.log('swipe right')
  };

});
