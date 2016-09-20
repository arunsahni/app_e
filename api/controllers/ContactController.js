/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   *  Send confirmation message to user
   *  Save details in db for adminstration purpose.
   *
  */
	create: function (req, res) {
    Contact.create(req.body).exec(function (err, data) {
      if (err) {
        return res.json(err.status, {err: err});
      } else {
        sails.hooks.email.send(
          "contact",
          {
            recipientName: req.body.name,
            senderName: "SmartData"
          },
          {
            to: req.body.email,
            subject: "Thank You For Contacting Ejizzy."
          },
          function(err) {
            if(err) {
              return res.json(err.status, {err: err});
            } else {
              return res.json({status: 200, message: 'Thank you for contacting us, we read all the mails, will get back to you very soon!'});
            }
          }
        );
      }
    });
  }
};

