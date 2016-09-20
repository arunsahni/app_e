/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  '*': ['isAuthorized'], // Everything resctricted here
  'UserController': {
    'create': true, // We dont need authorization here, allowing public access
    'getProfileData': true
  },  

  'AuthController': {
    '*': true // We dont need authorization here, allowing public access
  },

  'ContactController':{
    '*': true
  },

  'ChatController':{
    '*': true
  },

  'UnavailabilityController': {
    'getCalData': true
  },



  /********************admin routes begins here***************/

  'Administrator/authController': {
    '*': true // We dont need authorization here, allowing public access
  },

  'Administrator/userController': {
    '*': ['isAuthenticatedAdmin']
  },

  'CategoryController':{
    '*': true
  },

  'PerformerController': {
    'events': true
  },

  'SearchController':{
    '*': true
  },

  'FileController':{
    '*': true
  },

  'AssignmentController': {
    'getTempBookingInfo': true,
    'createAssignment': true,
    'getCalData': true
  },

  'PaymentController': {
    'escrowSuccess': true,
    'ipn': true
  },

  'NotificationController': {
    'createNotification': true,
    'registerSocket': true,
  },

  'SubscriptionController': {
    'getTempSubscriptionInfo': true,
    'startUserSubscription': true
  },

  'ReviewController': {
    'getReviews': true
  },

  'LocationController':{
    '*': true
  }

/*AdminController: {
  '*': true,
  'forgot': ['loginRedirectAdmin'],
  'login': ['loginRedirectAdmin'],
  'profile': ['isAuthenticatedAdmin'],
  'editProfile': ['isAuthenticatedAdmin']
}*/

	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};
