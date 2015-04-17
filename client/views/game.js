Template.game.events({
  "click .finish-game": function(e, tpl){
    e.preventDefault();
    Games.update({_id: this._id}, {
      $set: {completed: true}
    });
  },
  "click .delete-game": function(e, tpl){
    e.preventDefault();
    Games.remove(this._id);
  },
  "click .one-plus": function(e, tpl){
    e.preventDefault();
    this.teams[0].score += 1;
    Games.update({_id: this._id}, {
      $set: {teams: this.teams}
    });
  },
  "click .two-plus": function(e, tpl){
    e.preventDefault();
    this.teams[1].score += 1;
    Games.update({_id: this._id}, {
      $set: {teams: this.teams}
    });
  },
  "click .one-minus": function(e, tpl){
    e.preventDefault();
    this.teams[0].score -= 1;
    Games.update({_id: this._id}, {
      $set: {teams: this.teams}
    });
  },
  "click .two-minus": function(e, tpl){
    e.preventDefault();
    this.teams[1].score -= 1;
    Games.update({_id: this._id}, {
      $set: {teams: this.teams}
    });
  }
});