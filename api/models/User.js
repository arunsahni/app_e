/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

module.exports = {

schema: true,
//uniqueEmail type boolean default
uniqueEmail: false,
//uniqueUsername type boolean default
uniqueUsername: false,
//database attributes / schema
  attributes: {
    companyName: {
      type: 'string'
    },
    companyId: {
      model: 'user',
      defaultsTo: undefined
    },
    performerId: {
      model: 'user',
      defaultsTo: 0
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string',
    },
    displayName: {
      type: 'string',
    },
    username: {
      type: 'string',
      /*unique: true,
      uniqueUsername: true*/
    },
    email: {
      type: 'email',
      required: true,
      //unique: true,
      //uniqueEmail: true
    },
    paypalEmail: {
      type: 'email'
    },
    encryptedPassword: {
      type: 'string'
    },
    phoneNumber: {
      type: "string"
    },
    experienceYear: {
      type: 'integer'
    },
    experienceMonth: {
      type: 'integer'
    },
    description: {
      type: 'string'
    },
    resetPasswordToken: {
      type:'string'
    },
    resetPasswordExpires: { 
      type:'string' 
    },
    emailToken: { 
      type:'string' 
    },
    gender: { 
      type:'string' 
    },
    country: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    address: { 
      type:'string' 
    },
    servingDistanceFromLocation: { 
      type:'string' 
    },
    zipCode: {
      type: 'string'
    },
    grossRating: {
      type: 'integer',
      defaultsTo: 0
    },
    servingCategory: {
        //collection: 'performerservingcategory',
	//via: 'performerId'
        type: 'array'
    },
    workPrice: {
      type: 'float'
    },
    pricingTerm: {
      type: 'string'
    },
    chatAvail: {
      type: 'string'
    },
    dob: { 
      type:'Date'  
    },
    termQuestion: {
      type: 'string'
    },
    status: {
      type: 'string',
      enum: ['active', 'deactive', 'deleted']
    },
    role: {
      type: 'string',
      enum: ['Admin', 'Performer', 'Company', 'Customer']
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    feature_online_ticket: {
      type: 'boolean',
      defaultsTo: true
    },
    feature_featured_listing: {
      type: 'boolean',
      defaultsTo: false
    },
    feature_guarantee: {
      type: 'boolean',
      defaultsTo: false
    },
    profilePhoto: {
      type: 'string',
      defaultsTo: 'images/frontend/profile.jpg'
    },
    performerRequirement: {
        type: 'array'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  },

  /**
   * Custom validation types
   * check for unique email
   * check for unique user name
   */
  types: {
    uniqueEmail: function(value) {
      return uniqueEmail;//
    },
    uniqueUsername: function(value) {
      return uniqueUsername;
    }
  },

  /**
   * Custom validation against username and email
   * check for unique email / username
   */
  beforeValidate: function(values, cb) { 
    User.findOne({email: values.email}).exec(function (err, record) {
      uniqueEmail = !err && !record;
    });
    if(values.username != undefined) {
      User.findOne({username: values.username}).exec(function (err, record) {
        uniqueUsername = !err && !record;
      }); 
    }
    cb(); 
  },

  /**
   * lifecycle callback
   * hash password
   * bcrypt hashing technique used
  */
  beforeCreate: function(values, next) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(values.password, salt, function(err, hash) {
        if (err) return next(err);
        values.encryptedPassword = hash;
        next();
      });
    });
  },

  /**
   * lifecycle callback
   * hash password
   * bcrypt hashing technique used
  */
  beforeUpdate: function(values, next) {
    if(values.password != undefined) {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(values.password, salt, function(err, hash) {
          if (err) return next(err);
          values.encryptedPassword = hash;
          next();
        });
      });
    } else {
      next();
    }
  },

  /**
   * validate password
   * compare password comming from front-end
   * bcrypt hashing technique used
  */
  validPassword: function(password, user, cb) {
    bcrypt.compare(password, user.encryptedPassword, function(err, match) {
      if (err) cb(err);

      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    });
  },

  /**
   * validate password
   * compare password comming from front-end
   * bcrypt hashing technique used
  */
  resetPassword: function(userEmail, cb) {

    User.findOne({email: userEmail}).exec(function (err, record) {
      if(!err) {
        bcrypt.genSalt(10, function(err, salt) {
          if (err) return err;
          bcrypt.hash(values.password, salt, function(err, hash) {
            if (err) return next(err);
            record.resetPasswordToken = hash;
            record.resetPasswordExpires = sails.config.globals.gTimeStamp + 3600000;
            record.save(function(err, user) {
              if(err) {
                return err;
              } else {
                return user;
              }
            });
          });
        });
      }
    });
  }


};//#user model ends

