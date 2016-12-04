describe('flowmap component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('flowmap', function () {
      return {
        templateUrl: 'app/flowmap.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<flowmap></flowmap>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
