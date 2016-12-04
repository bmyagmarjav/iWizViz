describe('heatmap component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('heatmap', function () {
      return {
        templateUrl: 'app/heatmap.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<heatmap></heatmap>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
