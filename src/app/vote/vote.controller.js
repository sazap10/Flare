'use strict';

angular.module('flare').controller('VoteCtrl', function($scope, $stateParams,  CommonService) {
  CommonService.getIdea($stateParams.id).then(function(result) {
    $scope.idea = result.data;
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
