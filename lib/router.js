Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'games'
});
Router.route('/teams', 'teams');

requireLogin = function(){
  if (!Meteor.user()){
    if (Meteor.loggingIn()){

    } else {
      return this.render('accessDenied');
    }
  } else {
    return this.next();
  }
};

Router.onBeforeAction(requireLogin);