describe('ContainerSrv service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (ContainerSrv) {
    expect(ContainerSrv.getData()).toEqual(3);
  }));
});
