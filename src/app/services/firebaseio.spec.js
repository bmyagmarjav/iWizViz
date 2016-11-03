describe('Firebaseio service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (Firebaseio) {
    expect(Firebaseio.getData()).toEqual(3);
  }));
});
