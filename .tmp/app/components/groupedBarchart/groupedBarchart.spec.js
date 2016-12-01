describe('groupedbarchart component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('groupedbarchart', function () {
      return {
        templateUrl: 'app/groupedbarchart.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<groupedbarchart></groupedbarchart>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
