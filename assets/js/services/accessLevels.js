angular.module('app')
  .constant('AccessLevels', {
    anon: 0, //anaomous user any one can have any access
    user: 1, //only for logged in users
    performer: 1,
    bookingEngineHire: "http://192.155.246.146:1238/#/ejizzyhire",
    subscriptionEngine: "http://192.155.246.146:1238/#/ejizzysubscription"
  });