PeopleManager.module("PeopleApp.List", function (List, PeopleManager, Backbone, Marionette, $, _) {
  List.Controller = {
    listPeople: function () {
      var fetchingPeople = PeopleManager.request("person:entities");
      $.when(fetchingPeople).done(function (people) {
        var peopleView = new List.PeopleView({
          collection: people
        });

        peopleView.on("childview:person:edit", function (childView, model) {
          PeopleManager.trigger("person:edit", model.get("id"));
        });

        var peopleLayout = new List.PeopleLayout();
        peopleLayout.on("show", function () {
          peopleLayout.peopleListRegion.show(peopleView);
        });

        PeopleManager.regions.main.show(peopleLayout);
      });
    }
  };
});