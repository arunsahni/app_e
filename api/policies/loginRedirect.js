/**
 * loginRedirect
 * Login redirect is a policy to check if users is logedin
 * loged in users are not allowed to access some of the restricted function
 * 
 * @module::  	Policy
 * @todo:: 		implement login reidirect for logeed in users
*/

module.exports = function(req, res, next) {
	return next();
};