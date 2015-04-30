'use strict';

angular.module('flare')
  .controller('CreateCtrl', function ($scope, Upload) {
    $scope.progress = 0;

    $scope.alerts = [];

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.submit = function (idea, video) {
      if (video && video.length) {
        for (var i = 0; i < video.length; i++) {
          var file = video[i];
          Upload.upload({
            url: 'api/idea',
            method: 'POST',
            fields: {'title': idea.title, 'summary': idea.summary, 'content': idea.content, 'author': idea.author},
            file: file
          }).progress(function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
          }).success(function (data, status, headers, config) {
            $scope.progress = 0;
            $scope.alerts.push({type: 'success', msg: 'Your idea has been created!'});
          });
        }
      }
    };
  });
