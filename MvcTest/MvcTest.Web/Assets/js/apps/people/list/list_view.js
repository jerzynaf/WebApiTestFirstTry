PeopleManager.module("PeopleApp.List", function (List, PeopleManager, Backbone, Marionette, $, _) {
  List.PersonView = Marionette.ItemView.extend({
    template: "#person-template",
    tagName: "tr",
    events: {
      'click a.js-edit': 'editPerson'
    },
    editPerson: function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.trigger("person:edit", this.model);
    }
  });

  List.PeopleView = Marionette.CompositeView.extend({
    childView: List.PersonView,
    childViewContainer: "tbody",
    template: "#people-list",
    tagName: "table",
    className: "table table-hover"
  });

  List.PeopleLayout = Marionette.LayoutView.extend({
    template: "#list-layout",

    regions: {
      peopleListRegion: "#peopleListRegion"
    }
  });
});