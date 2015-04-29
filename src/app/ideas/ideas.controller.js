'use strict';

angular.module('flare')
  .controller('IdeasCtrl', function ($scope, CommonService) {
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
