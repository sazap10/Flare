'use strict';

angular.module('flare')
  .controller('CreateCtrl', function ($scope, Upload) {
    $scope.submit = function (idea, video) {
      if (video && video.length) {
        for (var i = 0; i < video.length; i++) {
          var file = video[i];
          Upload.upload({
            url: 'api/idea',
            method: 'POST',
            fields: {'name': idea.name, 'summary': idea.summary, 'content': idea.content},
            file: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          });
        }
      }
    };
  });
