var EVENTS, OFFSCREEN_CLASS, hooks;

OFFSCREEN_CLASS = 'off';

EVENTS = 'webkitTransitionEnd oTransitionEnd transitionEnd msTransitionEnd transitionend';

hooks = {
  transitioning: false,
  insertElement: function (node, next) {
    var finish, insert;
    insert = function(){
      $(node).addClass('fadeIn');
      $(node).insertBefore(next);
      return Meteor.setTimeout(finish, 500);
    };

    finish = function(){
      return $(node).removeClass(settings.onscreenClass);
    };

    if (this.transitioning){
      return Meteor.setTimeout(insert, 500);
    } else {
      return insert();
    }
  },
  removeElement: function (node) {
    var remove;
    remove = (function(_this){
      return function(){
        _this.transitioning = false;
        return $(node).remove();
      }
    })(this);
    $(node).addClass('fadeOut');
    this.transitioning = true;
    return Meteor.setTimeout(remove, 500);
  }
};

Template.transition.rendered = function () {
  return this.firstNode.parentNode._uihooks = hooks;
};
