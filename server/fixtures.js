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