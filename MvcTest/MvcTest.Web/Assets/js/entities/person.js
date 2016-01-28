PeopleManager.module("Entities", function (Entities, PeopleManager, Backbone, Marionette, $, _) {
  Entities.Person = Backbone.Model.extend({
    urlRoot: "api/PeopleApi",
    defaults: {
      firstName: '',
      lastName: ''
    }
  });

  Entities.PeopleCollection = Backbone.Collection.extend({
    url: "api/PeopleApi",
    model: Entities.Person
  });

  Entities.ColourItemModel = Backbone.Model.extend({
  });

  Entities.ColourCollectionModel = Backbone.Collection.extend({
    model: Entities.ColourItemModel
  });

  var API = {
    getPeopleEntities: function () {
      var people = new Entities.PeopleCollection();
      var defer = $.Deferred();
      people.fetch({
        success: function (data) {
          defer.resolve(data);
        },
        error: function () {
          defer.resolve(undefined);
        }
      });
      var promise = defer.promise();
      return promise;
    },
    getPersonEntity: function (personId) {
      var person = new Entities.Person({id: personId});
      var defer = $.Deferred();
      person.fetch({
        success: function (data) {
          defer.resolve(data);
        },
        error: function () {
          defer.resolve(undefined);
        }
      });
      var promise = defer.promise();
      return promise;
    },
    getColourEntities: function(rawColours) {
      var colours = new Entities.ColourCollectionModel(rawColours);
      return colours;
    }
  };

  PeopleManager.reqres.setHandler("person:entities", function(){
     return API.getPeopleEntities();
  });

  PeopleManager.reqres.setHandler("person:entity", function (personId) {
    return API.getPersonEntity(personId);
  });

  PeopleManager.reqres.setHandler("colour:entities", function (rawColours) {
    return API.getColourEntities(rawColours);
  });
});