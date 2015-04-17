if (Teams.find().count() === 0) {
	[
		{
			name: 'Barcelona'
		}, {
		name: 'Manchester City'
	}
	].forEach(function (data) {
			return Teams.insert(data);
		});
}

if (Games.find().count() === 0) {
	var game = {
		completed: false,
		created_at: new Date(),
		teams: [
			{name: 'Barcelona', id: '1', score: 0},
			{name: 'Manchester City', id: '2', score: 0}
		]
	};
	Games.insert(game);
}