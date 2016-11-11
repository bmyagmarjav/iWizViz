describe('starplat component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('starplat', function () {
      return {
        templateUrl: 'app/starplat.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<starplat></starplat>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
