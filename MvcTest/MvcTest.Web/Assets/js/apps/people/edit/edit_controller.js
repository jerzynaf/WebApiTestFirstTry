PeopleManager.module("PeopleApp.Edit", function (Edit, PeopleManager, Backbone, Marionette, $, _) {
  Edit.Controller =
  {
    editPerson: function (id) {
      var fetchingPerson = PeopleManager.request("person:entity", id);
      $.when(fetchingPerson).done(function (person) {
        var personEditView;
        if (person !== undefined) {
          personEditView = new Edit.PeopleLayout({
            model: person
          });

          personEditView.on("person:cancelEditing", function () {
            PeopleManager.trigger("people:list");
          });

          personEditView.on("form:submit", function (data) {
            var defer = $.Deferred();
            person.save(data, {
              success: function () {
                defer.resolve();
              }
            });

            var promise = defer.promise();
            $.when(promise).done(function () {
              PeopleManager.trigger("people:list");
            });
          });
        } else {
          personEditView = new Edit.MissingPerson();
        }

        personEditView.on("show", function () {
          var rawColours = person.get("colours");
          var colourCollection = PeopleManager.request("colour:entities", rawColours);
          var coloursView = new Edit.ColoursView({
            collection: colourCollection
          });

          var region =   personEditView.getRegion("coloursListRegion");
         region.show(coloursView);
         
        });
        PeopleManager.regions.main.show(personEditView);
      });
    }
  }
});