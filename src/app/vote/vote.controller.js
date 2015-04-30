'use strict';

angular.module('flare').controller('VoteCtrl', function($scope, $sce, $stateParams,  CommonService) {
  $scope.showVideo = true;
  if ($stateParams.type === "idea") {
    CommonService.getIdea($stateParams.id).then(function(result) {
      $scope.idea = result.data;
      if (result.data.votesNeg + result.data.votesPos > 0){
        $scope.idea.percentage = ((result.data.votesPos/(result.data.votesPos + result.data.votesNeg)) * 100).toFixed(0);
      } else {
        $scope.idea.percentage = 0;
      }
      $scope.showVideo = $scope.idea.video != "";
      $scope.idea.htmlContent = $sce.trustAsHtml(result.data.content);
    }, function(result) {
      console.log(result.status);
    });
  } else {
  }


  $scope.voteNo = function () {
    console.log('swipe left')
  };

  $scope.voteYes = function () {
    console.log('swipe right')
  };

});
