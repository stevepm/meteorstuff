Template.team.helpers({
	editing: function () {
		return Session.get('editing') === this._id;
	}
});

Template.team.events({
	"click .edit": function (e, tpl) {
		e.preventDefault();
		return Session.set('editing', this._id);
	},
	"submit form.form-edit": function (e, tpl) {
		e.preventDefault();
		var teamName = tpl.$("input[name='name']");
		if (teamName.length) {
			Teams.update(this._id, {
				$set: {
					name: teamName
				}
			});
			return Session.set('editing', null);
		}
	},
	"click .cancel": function (e, tpl) {
		e.preventDefault();
		return Session.set('editing', null);
	},
	"click .delete": function (e, tpl) {
		e.preventDefault();
		return Teams.remove(this._id);
	}
});