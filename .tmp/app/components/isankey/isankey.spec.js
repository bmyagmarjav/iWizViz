describe('isankey component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('isankey', function () {
      return {
        templateUrl: 'app/isankey.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<isankey></isankey>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
