describe('ibubble component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('ibubble', function () {
      return {
        templateUrl: 'app/ibubble.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<ibubble></ibubble>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
