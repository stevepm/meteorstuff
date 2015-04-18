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
    teamOneData = {
      id: tpl.$("select[name='teamOne']").val(),
      name: tpl.$("select[name='teamOne'] option:selected").text(),
      score: 0
    };

    teamTwoData = {
      id: tpl.$("select[name='teamTwo']").val(),
      name: tpl.$("select[name='teamTwo'] option:selected").text(),
      score: 0
    };

    game = {
      created_at: new Date(),
      teams: [teamOneData, teamTwoData],
      completed: false
    };
    gameId = Games.insert(game);
    Teams.update({
      _id: teamOneData.id
    }, {
      $addToSet: {
        games: gameId
      }
    });

    Teams.update({
      _id: teamTwoData.id
    }, {
      $addToSet: {
        games: gameId
      }
    });
    Session.set('creating-game', null);
  }
});