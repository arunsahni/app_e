module.exports.negotiationMailToPerformer = function(params) {

        sails.hooks.email.send(
          "negotiationPerformer",
          {
            emailUrl: sails.config.globals.siteURL + '/#/performer/negotiation/' + params.negoId,
            recipientName: params.firstName,
            senderName: "Ejizzy Support"
          },
          {
            to: params.email,
            subject: "Negotiation request for job"
          },
          function(err) {
              return true;
          }
        );
};