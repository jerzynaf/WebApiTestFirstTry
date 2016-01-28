PeopleManager.module("PeopleApp.Edit", function (Edit, PeopleManager, Backbone, Marionette, $, _) {
  Edit.PeopleLayout = Marionette.LayoutView.extend({
    template: "#person-form",
    regions: {
      coloursListRegion: "#coloursListRegion"
    },
    events: {
      "click button.js-submit": "submitClicked",
      "click button.js-cancel": "cancelClicked",
      "click #isAuthorisedLabel": "isAuthorisedLabelClicked",
      "click #isEnabledLabel": "isEnabledLabelClicked"
    },
    regions: {
      coloursListRegion: "#coloursListRegion"
    },
    ui: {
      isAuthorisedCheckbox: "#isAuthorised",
      isEnabledCheckbox: "#isEnabled"
    },
    isAuthorisedLabelClicked: function (e) {
      e.preventDefault();
      this.ui.isAuthorisedCheckbox.toggle();
    },
    isEnabledLabelClicked: function (e) {
      e.preventDefault();
      this.ui.isEnabledCheckbox.toggle();
    },

    submitClicked: function (e) {
      e.preventDefault();
      var coloursView = this.regions.coloursListRegion.currentView;
      var coloursCollection = this.coloursView.collection;
      var data = this.Backbone.Syphon.serialize(this);
      data.colours = coloursCollection.toJSON();
      this.trigger("form:submit", data);
    },

    cancelClicked: function (e) {
      e.preventDefault();
      this.trigger("person:cancelEditing");
    }


  });

  Edit.ColourView = new Marionette.ItemView.extend({
    template: "#colour-template",
    events: {
      "click input": "colourClicked"
    },
    ui: {
      colourCheckbox: "input"
    },
    colourClicked: function (e) {
      this.model.set("isChecked", e.target.checked);
    }
  });

  Edit.ColoursView = new Marionette.CollectionView.extend({
    childView: Edit.ColourView,
    tagName: "div"
  });

  Edit.MissingPerson = new Marionette.ItemView.extend({
    template: "#missing-person-view"
  });
});