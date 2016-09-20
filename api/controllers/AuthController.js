/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');

module.exports = {

  /**
   * Authentication for front-end user
   * JWT - token based authentication used
   *
  */
  authenticate: function(req, res) {
    var userEmail = req.param('email');
    var password = req.param('password');

    if (!userEmail || !password) {
      return res.json(401, {type: 'danger', msg: 'Email and password required'});
    }

    User.findOne({email: userEmail, isAdmin: false} , function(err, user) {
      if (!user) {
        return res.json(401, {type: 'danger', msg: 'invalid Email or password'});
      }
      if (user.status != 'active') { 
        if(user.companyId) {
           return res.json(401, {type: 'danger', msg: 'Please contact your company manager'});
        } else {
           return res.json(401, {type: 'danger', msg: 'Verify your email first'});
         }
      }
      
      User.validPassword(password, user, function(err, valid) {
        if (err) {
          return res.json(403, {type: 'danger', msg: 'forbidden'});
        }

        if (!valid) {
          return res.json(401, {type: 'danger', msg: 'invalid Email or password'});
        } else {
          res.json({user: user, token: jwToken.issueToken({sid: user.id})});
        }
      });
    })
  },

  /**
   * Registration for front-end users 
   * JWT - token based authentication used for force login after authentication
   *
  */
  register: function(req, res) {
    //TODO: Do some validation on the input
      if (req.body.password !== req.body.confirmPassword) { 
      return res.json(401, {type: 'danger', msg: 'Password doesn\'t match'});
    }
    //console.log('check body',req.body);
        if(req.body.iscompany == 'company') {
                req.body.role = 'Company'
        } else {
          req.body.companyName = "";
        }
       User.create({companyName:req.body.companyName, email: req.body.email, password: req.body.password, firstName: req.body.firstName, lastName: req.body.lastName, role: req.body.role, 
       emailToken: Math.random() * sails.config.globals.gTimeStamp, status:'deactive'}).exec(function(err, user) {
        
        if (err) {
          res.json(err.status, {type: 'danger', msg: err});
          return;
        }
        if (user) {
          sails.hooks.email.send(
          "register",
          {
            emailUrl: sails.config.globals.siteURL + '/#/checkEmail/' + user.emailToken,
            recipientName: user.firstName,
            senderName: "Ejizzy Support"
          },
          {
            to: req.body.email,
            subject: "Thanks for registering with Ejizzy"
          },
          function(err) {
            if(err) {
             User.destroy({email:req.body.email}).exec(function deleteCB(err){
             });
              return res.json(400, {type: 'danger', msg: 'Opps something went wrong please try again'});
            } else {
             return res.json(200, {type: 'success', msg: 'Account successfully created check your mail-box & verify your account!'});
            }
          }
        );
        }
      });
    },
  /**
   * ForgotPassword for front-end user
   * email send with token and expiry
   *
  */
  forgotPassword: function(req, res) {
    if(req.body.email!=undefined) {
    User.find({email: req.body.email, isAdmin: false}, {select: ['_id', 'firstName', 'email']}).exec(function (err, user) {
      if(user && user != '') {
        user = user[0];
        user.resetPasswordToken = Math.random() * sails.config.globals.gTimeStamp;
        user.resetPasswordExpires = sails.config.globals.gTimeStamp + 3600000;

        user.save(function(err, userData) { 
          if (err) res.json({status: 400, error: err, message: 'Opps something went wrong please try again later.'});
          if(userData){
            sails.hooks.email.send(
              "forgotPassword",
              {
                resetUrl: sails.config.globals.siteURL + '/#/resetPassword/' + userData.resetPasswordToken,
                userName: userData.firstName,
                userEmail: userData.email,
                senderName: "Ejizzy Support"
              },
              {
                to: userData.email,
                subject: "Reset password from Ejizzy."
              },
              function(err) {
                if(err) {
                  return res.json(err);
                } else {
                return res.json(200, {type: 'success', msg: 'Account reset password link send successfully check your mail-box & reset your password'});
                }
              }
            );
          }
        });
      } else {
          return res.json(405, {type: 'danger', msg: 'If you are registered user then check your email to reset password'});      }
    });
      } else {
        return res.json(405, {type: 'danger', msg: 'Please enter your email'});

      }

  },//#

  /**
   * Authentication for forgotPassword
   * JWT - token based authentication used
   *
  */
  checkToken: function(req, res) {
    User.findOne({ resetPasswordToken: req.params.id}, function(err, user) {
      if (!user) {
        return res.json(405, {type: 'danger', msg: 'Invalid Attempt to reset password'});

      } else {
        if(sails.config.globals.gTimeStamp <= user.resetPasswordExpires) {
          return res.status(200).send('Token Accepted');
        } else {
          return res.json(405, {type: 'danger', msg: 'Token Expired'});

        }
      }
    });
  },//#

  /**
   * Authentication for front Email varification 
   * JWT - token based authentication used
   *
  */
  checkEmail: function(req, res) {
    User.findOne({ emailToken: req.params.id}, function(err, user) {
      if (!user) {
        return res.status(401).send('Not Authorised');
      } else {
          user.status = 'active';
          user.emailToken = "";
          user.save();
          return  res.json({user: user, token: jwToken.issueToken({sid: user.id})});
        }
    });
  },

 //reset password token authantication
  resetPassword: function(req, res) {
    User.findOne({ resetPasswordToken: req.params.id}, function(err, user) {
      if (!user) {
        return res.status(401).send('Not Authorised');
      } else {
        if(sails.config.globals.gTimeStamp <= user.resetPasswordExpires) {
          user.password = req.body.password;
          user.resetPasswordToken = '';
          user.resetPasswordExpires = '';
          user.save();
          return res.json(200, {type: 'success', msg: 'Your account password is successfully changed'});
        } else {
          return res.status(401).send('Token Expired!');
        }
      }
    });
  }
};