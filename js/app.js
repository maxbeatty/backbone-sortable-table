jQuery(function($) {
  var app = dashboard.app,
      // split dashboard functionality into modules
      Campaign = dashboard.module("campaign");

  dashboard.Router = Backbone.Router.extend({
    routes: {
      "*splat" : "default"
    },

    initialize: function() {
    
      this.campaign = new Campaign.Router();
      // could add lots more modules
    },

    default: function(splat) {
      
      this.campaign.drawTable();
      // could "route" to additional modules
    }
  });

  dashboard.app = new dashboard.Router();

  // set it off
  Backbone.history.start();
})