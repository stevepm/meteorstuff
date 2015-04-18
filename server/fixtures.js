if (Meteor.users.find().count() === 0) {
  ownerId = Accounts.createUser({
    email: 'j@j.com',
    password: 'matthew'
  })
}

if (Teams.find().count() === 0) {
  [
    {name: 'Barcelona', ownerId: ownerId},
    {name: 'Manchester City', ownerId: ownerId}
  ]
      .forEach(function (data) {
        Teams.insert(data);
      });
}

if (Games.find().count() === 0) {
  var game = {
    completed: false,
    created_at: new Date(),
    teams: [
      {name: 'Barcelona', id: '1', score: 0, ownerId: ownerId},
      {name: 'Manchester City', id: '2', score: 0, ownerId: ownerId}
    ]
  };
  Games.insert(game);
}