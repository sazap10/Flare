angular.module('flare').factory('CommonService', function($http, $q) {
  'use strict';
  return {
    getIdeas: function() {
      var deferred = $q.defer();
      // $http.get('/service/runs')
      $http.get('http://localhost:3002/api/ideas')
        .success(function(data, status) {
          deferred.resolve({status: status, data: data});
        })
        .error(function(data, status) {
          deferred.reject({status: status, data: data});
        });
      return deferred.promise;
    },

    getIdea: function(id) {
      var deferred = $q.defer();
      // $http.get('/service/runs')
      $http.get('http://localhost:3002/api/idea/' + id)
        .success(function(data, status) {
          deferred.resolve({status: status, data: data});
        })
        .error(function(data, status) {
          deferred.reject({status: status, data: data});
        });
      return deferred.promise;
    },

    submitIdea: function(payload) {
      var deferred = $q.defer();
      // $http.get('/service/runs')
      $http.post('http://localhost:3002/api/idea/', payload)
        .success(function(data, status) {
          deferred.resolve({status: status, data: data});
        })
        .error(function(data, status) {
          deferred.reject({status: status, data: data});
        });
      return deferred.promise;
    },

    voteForPerson: function(id, vote) {
      var deferred = $q.defer();
      // $http.get('/service/runs')
      $http.put('http://localhost:3002/api/person/' + id + '/vote', {'vote':vote})
        .success(function(data, status) {
          deferred.resolve({status: status, data: data});
        })
        .error(function(data, status) {
          deferred.reject({status: status, data: data});
        });
      return deferred.promise;
    },

    voteForIdea: function(id, vote) {
      var deferred = $q.defer();
      // $http.get('/service/runs')
      $http.put('http://localhost:3002/api/idea/' + id + '/vote', {'vote':vote})
        .success(function(data, status) {
          deferred.resolve({status: status, data: data});
        })
        .error(function(data, status) {
          deferred.reject({status: status, data: data});
        });
      return deferred.promise;
    }
  };
});
