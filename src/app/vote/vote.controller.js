'use strict';

angular.module('flare').controller('VoteCtrl', function($scope, $sce, $stateParams,  CommonService) {
  $scope.showVideo = false;
  $scope.showImage = false;
  $scope.id = '';
  $scope.percentage = 0;
  $scope.htmlContent = "";
  if ($stateParams.type === "idea") {
    CommonService.getIdea($stateParams.id).then(function(result) {
      $scope.idea = result.data;
      if (result.data.votesNeg + result.data.votesPos > 0){
        $scope.percentage = ((result.data.votesPos/(result.data.votesPos + result.data.votesNeg)) * 100).toFixed(0);
      }
      $scope.showVideo = false;
      $scope.showImage = true;
      $scope.htmlContent = $sce.trustAsHtml(result.data.content);
    }, function(result) {
      console.log(result.status);
    });
  } else {
    CommonService.getPerson($stateParams.id).then(function(result) {
      $scope.idea = result.data;
      if (result.data.votesNeg + result.data.votesPos > 0) {
        $scope.percentage = ((result.data.votesPos / (result.data.votesPos + result.data.votesNeg)) * 100).toFixed(0);
      }
      $scope.showVideo = true;
      $scope.showImage = false;
      $scope.htmlContent = $sce.trustAsHtml(result.data.content);
    });
  }

  $scope.voteNo = function() {
    if ($stateParams.type === 'idea') {
      CommonService.voteIdea($scope.id, -1);
    } else {
      CommonService.votePerson($scope.id, -1)
    }
    console.log('voted NO')
  };

  $scope.voteYes = function() {
    if ($stateParams.type === 'idea') {
      CommonService.voteIdea($scope.id, 1);
    } else {
      CommonService.votePerson($scope.id, 1)
    }
    console.log('voted YES')
  };

});
