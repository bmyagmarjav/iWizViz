describe('istarplot component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('istarplot', function () {
      return {
        templateUrl: 'app/istarplot.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<istarplot></istarplot>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
