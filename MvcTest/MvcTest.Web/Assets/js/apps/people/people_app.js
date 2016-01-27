PeopleManager.module("PeopleApp", function (PeopleApp, PeopleManager, Backbone, Marionette, $, _) {

  PeopleApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "people": "listPeople",
      "people/edit/:id": "editPerson"
    }

  });

  var API = {
    listPeople: function () {
      PeopleApp.List.Controller.listPeople();
    },
    editPerson: function (id) {
      //execute controller's action to edit person
    }
  };

  PeopleManager.on("people:list", function () {
    PeopleManager.navigate("people");
    API.listPeople();
  });

  PeopleManager.on("person:edit", function (id) {
    PeopleManager.navigate("people/edit/" + id);
    API.editPerson(id);
  });

  PeopleManager.addInitializer(function() {
    new PeopleApp.Router({
      controller: API
  });
  });
});