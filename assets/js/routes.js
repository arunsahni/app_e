angular.module('app')
   .config(function($stateProvider, $urlRouterProvider, AccessLevels) {
    
  //anon state raoutes for all user  

    $stateProvider
      .state('anon', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.anon
        }
      })
      .state('anon.home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomesController'
      })
      .state('anon.login', {
        url: '/login',
        templateUrl: 'templates/auth/login.html',
        controller: 'LoginController'
      })
      .state('anon.regType', {
        url: '/regType',
        templateUrl: 'templates/auth/regType.html',
        controller: 'PreRegisterController'
      })
      .state('anon.register', {
        url: '/register/:restrationType',
        templateUrl: 'templates/auth/register.html',
        controller: 'RegisterController'
      })
      .state('anon.forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'templates/auth/forgotPassword.html',
        controller: 'RegisterController'
      })
      .state('anon.resetPassword', {
        url: '/resetPassword/:token',
        templateUrl: 'templates/auth/resetPassword.html',
        controller: 'ResetPasswordController'
      })
      .state('anon.checkEmail', {
        url: '/checkEmail/:token',
        controller: 'CheckEmailController'
      })
      .state('anon.contactUs', {
        url: '/contactUs',
        templateUrl: 'templates/contact/contact.html',
        controller: 'ContactController'
      })
      .state('anon.searchPerformer', {
        url: '/search/performer/:searchCategory/:searchKeyword',
        templateUrl: 'templates/search/performers.html',
        controller: 'AdvanceSearchController'
      })
      .state('anon.searchPerformerKey', {
        url: '/search/performer/:searchKeyword',
        templateUrl: 'templates/search/performers.html',
        controller: 'AdvanceSearchController'
      })
      .state('anon.searchPerformerCat', {
        url: '/search/performer/:searchCategory',
        templateUrl: 'templates/search/performers.html',
        controller: 'AdvanceSearchController'
      })
      .state('anon.searchPerformerNull', {
        url: '/search/performer',
        templateUrl: 'templates/search/performers.html',
        controller: 'AdvanceSearchController'
      })
      .state('anon.performerProfile', {
        url: '/performer/profile/:uId',
        templateUrl: 'templates/performer/profile.html',
        controller: 'PerformersController'
      })
      .state('anon.companyProfile', {
        url: '/company/profile',
        templateUrl: 'templates/company/profile.html',
        controller: 'CompaniesController'
      })

// user state routes for only logedin user

    $stateProvider
      .state('user', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.user
        }
      })
      .state('user.messages', {
        url: '/messages',
        templateUrl: 'templates/user/messages.html',
        controller: 'MessagesController'
      })
      // user customer routes started
      .state('user.userProfile', {
        url: '/user/profile',
        templateUrl: 'templates/user/profile.html',
        controller: 'ProfilesController'
      })
      .state('user.userDashboard', {
        url: '/user/dashboard',
        templateUrl: 'templates/user/dashboard.html',
        controller: 'ProfilesController'
      })

       // user customer routes end


      //jobs routes start

      .state('user.postJob', {
        url: '/jobs/post',
        templateUrl: 'templates/jobs/post.html',
        controller: 'PostJobController'
      })
      .state('user.updateUserProfile', {
        url: '/user/editProfile',
        templateUrl: 'templates/user/editProfile.html',
        controller: 'ProfilesController'
      })
       .state('user.jobList', {
        url: '/jobs/list',
        templateUrl: 'templates/jobs/jobList.html',
        controller: 'JobsController'
      })
      .state('user.jobedit', {
        url: '/job/edit/:jobId',
        templateUrl: 'templates/jobs/editJob.html',
        controller: 'JobEditCustomerController'
      })
      .state('user.jobDetail', {
        url: '/jobs/detail/:jobId',
        templateUrl: 'templates/jobs/detail.html',
        controller: 'JobDetailCustomerController'
      })
      
     //job routes end

     //boking routes start
     .state('user.myBookings', {
        url: '/jobs/myBokinglist',
        templateUrl: 'templates/jobs/bokinglist.html',
        controller: 'bookingListCustomerController'
      })

      .state('user.bookingDetail', {
        url: '/jobs/bookingDetail/:assignmentID',
        templateUrl: 'templates/jobs/bookingDetail.html',
        controller: 'bookingDetailCustomerController'
      })
      .state('user.giveReview', {
        url: '/jobs/giveReview/:assignmentID/:jobId/:performerId',
        templateUrl: 'templates/jobs/givereview.html',
        controller: 'BookingsController'
      })
      
      //booking routes end

      //user performer routes started   

      .state('user.performerjobs', {
        url: '/performer/myJobs',
        templateUrl: 'templates/performer/myJob.html',
        controller: 'JobListPerformerController'
      })
      .state('user.performerAssignment', {
        url: '/performer/assignment/:assignmentID',
        templateUrl: 'templates/performer/bookingDetail.html',
        controller: 'bookingDetailPerformerController'
      })
      .state('user.giveReviewByPerformer', {
        url: '/jobs/giveReviewByPerformer/:assignmentID/:jobId/:hostId',
        templateUrl: 'templates/jobs/givereview.html',
        controller: 'BookingsController'
      })
       .state('user.performerNegoList', {
        url: '/performer/negoList',
        templateUrl: 'templates/performer/negoList.html',
        controller: 'listNegotiationPerformerController'
      })
       .state('user.performerNegotiation', {
        url: '/performer/negotiation/:negotiationId',
        templateUrl: 'templates/performer/negotiation.html',
        controller: 'negotiationDetailPerformerController'
      })
      .state('user.performerDashboard', {
        url: '/performer/dashboard',
        templateUrl: 'templates/performer/dashboard.html',
        controller: 'PerformersController'
      })
      .state('user.performerProfile', {
        url: '/performer/myProfile',
        templateUrl: 'templates/performer/myProfile.html',
        controller: 'PerformerProfilesController'
      })
      .state('user.performerPayments', {
        url: '/performer/payments',
        templateUrl: 'templates/performer/payment.html',
        controller: 'PaymentController'
      })
       .state('user.performerSubscriptionsPayments', {
        url: '/performer/subscriptionsPayment',
        templateUrl: 'templates/performer/subscriptionsPayment.html',
        controller: 'subscriptionPaymentListingController'
      })
      .state('user.performermyAvailability', {
        url: '/performer/myAvailability',
        templateUrl: 'templates/performer/calendar.html',
        controller: 'CalendarController'
      })
      .state('user.performerSubscriptions', {
        url: '/performer/subscriptions',
        templateUrl: 'templates/performer/subscriptions.html',
        controller: 'subscriptionPaymentController'
      })
      .state('user.performerPortfolio', {
        url: '/performer/portfolio',
        templateUrl: 'templates/performer/imgPortfolio.html',
        controller: 'PortfolioImgController'
      })
      .state('user.performerVideoPortfolio', {
        url: '/performer/videoportfolio',
        templateUrl: 'templates/performer/videoPortfolio.html',
        controller: 'PortfolioVideoController'
      })
      .state('user.performerProfileEdit', {
        url: '/performer/editProfile',
        templateUrl: 'templates/performer/editProfile.html',
        controller: 'PerformerProfilesController'
      })
      .state('user.performerProfileView', {
        url: '/performer/viewProfile',
        templateUrl: 'templates/performer/viewProfile.html',
        controller: 'PerformersController'
      })
      .state('user.performerCalendar', {
        url: '/performer/calendar',
        templateUrl: 'templates/performer/calendar.html',
        controller: 'CalendarController'
      })
      //user performer routes end

      //user company routes started


      .state('user.companyDashboard', {
        url: '/company/dashboard',
        templateUrl: 'templates/company/dashboard.html',
        controller: 'CompanyController'
      })
      .state('user.companyProfile', {
        url: '/company/myProfile',
        templateUrl: 'templates/company/myProfile.html',
        controller: 'CompanyProfilesController'
      })
      .state('user.companyProfileEdit', {
        url: '/company/editProfile',
        templateUrl: 'templates/company/editProfile.html',
        controller: 'CompanyProfilesController'
      })
      .state('user.companyManagePerformers', {
        url: '/company/managePerformers',
        templateUrl: 'templates/company/managePerformers.html',
        controller: 'CompanyController'
      })
      .state('user.companyManageSubscriptions', {
        url: '/company/manageSubscriptions',
        templateUrl: 'templates/company/manageSubscriptions.html',
        controller: 'companySubscriptionController'
      })
      .state('user.companyManagePortfolio', {
        url: '/company/portfolio',
        templateUrl: 'templates/company/imgPortfolio.html',
        controller: 'PortfolioCompanyImgController'
      })
      .state('user.companyManageVideoPortfolio', {
        url: '/company/videoPortfolio',
        templateUrl: 'templates/company/videoPortfolio.html',
        controller: 'PortfolioCompanyVideoController'
      })
      .state('user.ManagePayments', {
        url: '/company/managePayments',
        templateUrl: 'templates/company/payment.html',
        controller: 'CopanyPaymentController'
      })
      .state('user.ManagesubscriptionsPayment', {
        url: '/company/subscriptionsPayment',
        templateUrl: 'templates/company/paymentSubscription.html',
        controller: 'CopanySubscritionPaymentController'
      })
      .state('user.AddPerformer', {
        url: '/company/AddPerformer',
        templateUrl: 'templates/company/addPerformer.html',
        controller: 'CompanyController'
      })
      .state('user.editPerformer', {
        url: '/company/editPerformer/:performerId',
        templateUrl: 'templates/company/editPerformer.html',
        controller: 'CompanyController'
      })
      .state('user.comapnyPerformerjobs', {
        url: '/company/performerJobs',
        templateUrl: 'templates/company/performerJob.html',
        controller: 'companyPerformerJobListController'
      })
      .state('user.companyPerformerAssignment', {
        url: '/company/assignment/:assignmentID',
        templateUrl: 'templates/company/bookingDetail.html',
        controller: 'bookingDetailCompanyPerformerController'
      })
      .state('user.ticket', {
        url: '/ticket',
        templateUrl: 'templates/ticket/ticket.html',
        controller: 'newTicketController' //under home controller.js
      }).state('user.ticketDetail', {
        url: '/ticket/detail/:ticketId',
        templateUrl: 'templates/ticket/ticketDetail.html',
        controller: 'ticketDetailController' //under home controller.js
      });
     
     //user company routes end

    $urlRouterProvider.otherwise('/');
});




