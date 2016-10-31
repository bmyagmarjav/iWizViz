describe('isidebar component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('isidebar', function () {
      return {
        templateUrl: 'app/isidebar.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<isidebar></isidebar>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
