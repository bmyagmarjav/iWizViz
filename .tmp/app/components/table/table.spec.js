describe('table component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('table', function () {
      return {
        templateUrl: 'app/table.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<table></table>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
