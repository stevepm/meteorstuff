Template.teams.helpers({
	teams: function () {
		return Teams.find();
	},
	creating: function () {
		return Session.get('creating');
	}
});

Template.teams.events({
	"click .create": function (e, tpl) {
		e.preventDefault();

		Session.set('creating', true);
	},
	"submit form.form-create": function (e, tpl) {
		e.preventDefault();

		team = {
			name: tpl.$("input[name='name']").val(),
			ownerId: Meteor.userId()
		};
		if (team.name.length) {
			Teams.insert(team);
			Session.set('creating', false);
		}
	},
	"click .cancel": function(e) {
		e.preventDefault();

		Session.set('creating', false);
	}
});
