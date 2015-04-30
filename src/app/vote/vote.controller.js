'use strict';

angular.module('flare').controller('VoteCtrl', function($scope, $sce, $stateParams,  CommonService) {
  $scope.showVideo = false;
  $scope.showImage = false;
  $scope.id = '';
  $scope.percentage = 0;
  $scope.htmlContent = "";
  $scope.htmlAuthor = "";
  $scope.showShare = false;


  if ($stateParams.type === "idea") {
    CommonService.getIdea($stateParams.id).then(function(result) {
      $scope.idea = result.data;
      if (result.data.votesNeg + result.data.votesPos > 0){
        $scope.percentage = ((result.data.votesPos/(result.data.votesPos + result.data.votesNeg)) * 100).toFixed(0);
      }
      $scope.showVideo = false;
      $scope.showImage = true;
      $scope.htmlContent = $sce.trustAsHtml(result.data.content);
      $scope.htmlAuthor = $sce.trustAsHtml(result.data.author);
      $scope.icon = "assets/icons/DefaultUserIcon_110x110.png";
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
      $scope.htmlAuthor = $sce.trustAsHtml(result.data.author);
      $scope.icon = "assets/icons/CEOPhoto_110x110.png";
    });
  }

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
    console.log($scope.showShare);
  }

});
