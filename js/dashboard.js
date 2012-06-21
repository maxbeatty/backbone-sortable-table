this.dashboard = {
  // organize code into modules, breaks up logical components
  module: function() {
    // internal cache
    var modules = {};

    // create new module or load existing
    return function(name) {
      // exists
      if (modules[name]) {
        return modules[name];
      }
      
      return modules[name] = { Views: {}};
    };
  }(),

  // Keep active application instances namespaced under an app object.
  app: _.extend({}, Backbone.Events)
};