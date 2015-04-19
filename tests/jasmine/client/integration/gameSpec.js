describe("games feature", function () {
  beforeEach(function (done) {
    Meteor.loginWithPassword("j@j.com", "matthew", function (err) {
      Router.go('games');
      Tracker.afterFlush(done);
    });
  });

  beforeEach(waitForRouter);

  afterEach(function (done) {
    Meteor.logout(function () {
      done();
    });
  });

  it("shows a list of the games", function (done) {
    Meteor.setTimeout(function () {
      expect($('.game').length).toBeGreaterThan(0);
      done();
    }, 600)
  });
});