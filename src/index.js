(function () {
  'use strict';
  angular.module('app', ['ui.router']).service('Firebaseio', Firebaseio);
  angular.module('app').service('D3srv', D3srv);
  angular.module('app').service('ContainerSrv', ContainerSrv);
})();
