/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var jwt = require('jsonwebtoken');

// Generates a token from supplied payload
module.exports.issueToken = function(payload) {
  return jwt.sign(
    payload,
    sails.config.globals.tokenSecret, // Token Secret that we sign it with
    {
      expiresIn : sails.config.globals.tokenExpiry // Token Expire time
    }
  );
};

// Verifies token on a request
module.exports.verifyToken = function(token, callback) {
  return jwt.verify(
    token, // The token to be verified
    sails.config.globals.tokenSecret, // Same token we used to sign
    {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback //Pass errors or decoded token to callback
  );
};