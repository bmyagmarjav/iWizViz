describe('inavbar component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('inavbar', function () {
      return {
        templateUrl: 'app/inavbar.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<inavbar></inavbar>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
