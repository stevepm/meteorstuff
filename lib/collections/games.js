this.Games = new Meteor.Collection('games');

Games.allow({
  update: function (userId, game) {
    return game.ownerId === userId;
  },
  remove: function (userId, game) {
    return game.ownerId === userId;
  }
});

Meteor.methods({
  gamesInsert: function (teamOneId, teamTwoId) {
    //  check if user is signed in
    check(Meteor.userId(), String);

    //  check that our IDs are strings
    check(teamOneId, String);
    check(teamTwoId, String);

    var teamOne = Teams.findOne({_id: teamOneId});
    var teamTwo = Teams.findOne({_id: teamTwoId});

    if (teamOne && teamTwo) {
      var teamOneData = {
        id: teamOne._id,
        name: teamOne.name,
        score: 0
      };

      var teamTwoData = {
        id: teamTwo._id,
        name: teamTwo.name,
        score: 0
      };

    } else {
      throw new Meteor.Error("team-does-not-exist", "One of the teams doesn't exist in the database");
    }

    var game = {
      ownerId: Meteor.userId(),
      created_at: new Date(),
      teams: [teamOneData, teamTwoData],
      completed: false
    };
    var gameId = Games.insert(game);

    //  Update each team's cached array of game ids
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

    return {_id: gameId};
  }
});