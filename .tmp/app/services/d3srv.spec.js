describe('D3srv service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (D3srv) {
    expect(D3srv.getData()).toEqual(3);
  }));
});
