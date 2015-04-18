this.Teams = new Mongo.Collection('teams');
Teams.allow({
  insert: function (userId) {
    return typeof userId !== "undefined" && userId !== null;
  },
  remove: function (userId, team) {
    return team.ownerId === userId;
  }
});

Meteor.methods({
  teamUpdate: function (teamId, newName) {
    check(Meteor.userId(), String);
    check(teamId, String);
    check(newName, String);

    var team = Teams.findOne(teamId);

    if (typeof team !== "undefined" && team !== null) {
      Teams.update(teamId, {$set: {name: newName}});
      var games = Games.find({_id: {$in: [team.games]}}).fetch();

      if (games.length) {
        games.forEach(function (game) {
          var updatedTeam = _.findWhere(game.teams, {
            id: teamId
          });
          if (updatedTeam != null) {
            updatedTeam.name = newName;
            return Games.update({
              _id: game._id
            }, {
              $set: {
                teams: game.teams
              }
            });
          }
        });
      }
      return teamId;
    } else {
      throw new Meteor.Error("team-does-not-exist", "This team doesn't exist in the database")
    }
  }
});