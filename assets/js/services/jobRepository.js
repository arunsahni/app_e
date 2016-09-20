angular.module('app')
  .factory('Job', function($http, CurrentUser) {
    return {
      getAllJobs: function(page, limit, sortBy, sortDir, text, text1) {
        return $http.get('/job/getJobData?page=' + page + '&limit=' + limit + '&sortBy=' + sortBy + '&sortDir=' + sortDir + '&text=' + text +'&text1=' +text1 + '&id=' +CurrentUser.user().id);
      },
      getJobDetail: function(id) {
        return $http.get('/job/getJobDetailByID/',{ params: { id: id} });
      },
      getAllAssignmentOnJob: function(id) {
        return $http.get('/assignment/getAllAssignmentOnJob/',{ params: { id: id} });
      },
      getCount: function() {
        return $http.get('/job/getCount?id=' +CurrentUser.user().id);
      },
      getJobData: function(id) {
        return $http.get('/job/getData/' + id);
      },
      editJobData: function(jobData) {
        return $http.post('/job/editJobData', jobData);
      },
      deleteJob: function(id) {
        return $http.get('/job/deleteJob/' + id);
      },
      searchData: function(key) {
        return $http.post('/job/searchData/' + CurrentUser.user().id, key);
      },
      deleteMultiple: function(arr) {
        return $http.post('/job/deleteMultiple', arr);
      },
    /*  getFilterJobs: function(filter) {
        return $http.post('/job/getJobFilter/' +CurrentUser.user().id, filter);
      },*/
      getMyNewJobs: function() {
        return $http.get('/job/getMyNewJobs/',{ params: { userID: CurrentUser.user().id} });
      },
      saveDisputeMsg: function(data) {
        return $http.post('/jobmessages/saveDisputeMsg/', data)
      },
      getDisputeMsg: function(req) {
        return $http.get('/jobmessages/getDisputeMsg/', { params: {assignmentId: req.assignmentId} })
      },
      createNegotiation: function(data) {
        return $http.post('/negotiation/createNego/', data)
      },
      getNegotiationsPerformer: function() {
        return $http.get('/negotiation/getPerformerNegotiations/', { params: {performerId: CurrentUser.user().id} })
      },
      getNegotiationDetail: function(nego_id) {
        return $http.get('/negotiation/getNegotiationDetail/', { params: {id: nego_id} })
      },
      updateNegotiationPrice: function(data) {
        return $http.post('/negotiation/updateNegotiationPrice/', data )
      },
      getAgreedAmount: function(jobId, performerId) {
        return $http.get('/negotiation/getAmount/', { params: {jobId: jobId, performerId:performerId} })
      },
      saveReviews: function(data) {
        return $http.post('/review/saveReviews/', data)
      },
      getReviews: function(performerId) {
        return $http.get('/review/getReviews/', { params: {userId: performerId} })
      }
      
    }
  });