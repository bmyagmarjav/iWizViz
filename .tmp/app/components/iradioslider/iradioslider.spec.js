describe('iradioslider component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('iradioslider', function () {
      return {
        templateUrl: 'app/iradioslider.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<iradioslider></iradioslider>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
