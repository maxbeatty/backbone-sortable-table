(function(Campaign) {

  Campaign.Router = Backbone.Router.extend({
    routes: {
      // endpoints specific to campaign
    },
    currentRequest: null,
    drawTable: function() {
      // faux data
      var c1 = new Campaign.Model({
            client: "Howdy Doody Circus Army",
            manager: "Alice",
            properties: 15,
            impressions: 43430382,
            clicks: 8735,
            spend: 40250
          }),
          c2 = new Campaign.Model({
            client: "Acme Corp",
            manager: "Bob",
            properties: 30,
            impressions: 3430328,
            clicks: 7835,
            spend: 2050
          }),
          cs = new Campaign.Collection([c1, c2]);

      this.currentRequest = new Campaign.Views.Table({collection: cs});
      this.currentRequest.render();
      
    }
  });

  Campaign.Model = Backbone.Model.extend({
    defaults: function() {
      return {
        client      : "",
        manager     : "",
        properties  : 0,
        impressions : 0,
        clicks      : 0,
        spend       : 0
      };
    }
  });

  Campaign.Collection = Backbone.Collection.extend({
    model: Campaign.Model,
    sortAsc: true,
    sortAttr: "client",

    // sorting core
    comparator: function(c) {
      if (this.sortAsc == true) return c.get(this.sortAttr);
      return -c.get(this.sortAttr);
    }
  });

  Campaign.Views.Table = Backbone.View.extend({
    tagName: "table",
    template: _.template($('#tbl').html()),
    events: {
      // sort the column that was clicked on
      "click th" : "sort"
    },
    attrs: [],
    initialize: function() {
      // use model keys for header 
      var header = this.collection.at(0).toJSON()

      for (var k in header) this.attrs.push(k);

      // after sorting, redraw
      this.collection.bind("reset", this.render, this);
    },
    render: function() {

      this.$el.html(this.template({header: this.attrs, campaigns: this.collection.toJSON()}));

      // bootstrap
      $(this.$el).addClass('table table-striped');

      $('.container').append(this.$el);

      return this;
    },
    sort: function(e) {
      // what are we sorting?
      this.collection.sortAttr = $(e.currentTarget).text().toLowerCase();
      // how are we sorting it?
      this.collection.sortAsc = !this.collection.sortAsc;
      
      this.collection.sort();
    }
  });

})(dashboard.module("campaign"));