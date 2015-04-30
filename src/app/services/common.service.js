angular.module('flare').factory('CommonService', function($http, $q) {
  'use strict';
  return {
    getIdeas: function() {
      var deferred = $q.defer();
      $http.get('/api/ideas')
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
      $http.get('/api/idea/' + id)
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
      $http.post('/api/idea/', payload)
        .success(function(data, status) {
          deferred.resolve({status: status, data: data});
        })
        .error(function(data, status) {
          deferred.reject({status: status, data: data});
        });
      return deferred.promise;
    },

    getPerson: function(id) {
      var deferred = $q.defer();
      $http.get('/api/person/' + id)
        .success(function(data, status) {
          deferred.resolve({status: status, data: data});
        })
        .error(function(data, status) {
          deferred.reject({status: status, data: data});
        });
      return deferred.promise;
    },

    votePerson: function(id, vote) {
      var deferred = $q.defer();
      $http.put('/api/person/' + id + '/vote', {'vote': vote})
        .success(function(data, status) {
          deferred.resolve({status: status, data: data});
        })
        .error(function(data, status) {
          deferred.reject({status: status, data: data});
        });
      return deferred.promise;
    },

    voteIdea: function(id, vote) {
      var deferred = $q.defer();
      // $http.get('/service/runs')
      $http.put('/api/idea/' + id + '/vote', {'vote': vote})
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
