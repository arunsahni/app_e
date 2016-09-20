/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  authenticate: function(req, res) {
    var userEmail = req.param('email');
    var password = req.param('password');

    if (!userEmail || !password) {
      return res.json(401, {err: 'username and password required'});
    }

    User.findOne({email: userEmail, isAdmin: true}, function(err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid username or password'});
      }

      User.validPassword(password, user, function(err, valid) {
        if (err) {
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
          return res.json(401, {err: 'invalid username or password'});
        } else {
          res.json({user: user, token: jwToken.issueToken({sid: user.id, isAdmin: true})});
        }
      });
    })
  },//#

  forgotPassword: function(req, res) {
    User.find({email: req.body.email, isAdmin: true}, {select: ['_id', 'firstName', 'email']}).exec(function (err, user) {
console.log(user);
      if(user) {
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
                senderName: "SmartData"
              },
              {
                to: userData.email,
                subject: "Reset password from Ejizzy."
              },
              function(err) {
                if(err) {
                  return res.json(err);
                } else {
                  return res.json({status: 200, message: 'Thank you for contacting us, we read all the mails, will get back to you very soon!'});
                }
              }
            );
          }
        });
      } else {
        return res.json(err);
      }
    });
  },//#

  checkToken: function(req, res) {
    User.findOne({ resetPasswordToken: req.params.id}, function(err, user) {
      if (!user) {
        return res.status(401).send('Not Authorised');
      } else {
        if(sails.config.globals.gTimeStamp <= user.resetPasswordExpires) {
          return res.status(200).send('Token Accepted');
        } else {
          return res.status(401).send('Token Expired!');
        }
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
          return res.status(200).send('Password Changed Sucessfully!');
        } else {
          return res.status(401).send('Token Expired!');
        }
      }
    });
  }
};