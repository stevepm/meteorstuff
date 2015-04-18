Template.games.helpers({
  games: Games.find(),
  teams: Teams.find(),
  creating: function () {
    return Session.get('creating-game');
  }
});

Template.games.events({
  "click .create": function (e, tpl) {
    e.preventDefault();
    Session.set('creating-game', true);
  },
  "click .cancel": function (e, tpl) {
    e.preventDefault();
    Session.set('creating-game', null);
  },
  "submit form.form-create": function (e, tpl) {
    e.preventDefault();
    var teamOneId = tpl.$("select[name='teamOne']").val();

    var teamTwoId = tpl.$("select[name='teamTwo']").val();

    Meteor.call('gamesInsert', teamOneId, teamTwoId, function (error, response) {
      if (error) {
        return alert(error.reason);
      }
      return Session.set('creating-game', false);
    });
  }
});