angular
.module('app')
.config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false}).hashPrefix('!');
  $urlRouterProvider.otherwise('/home');

  $stateProvider.state({name: 'home',
    url: '/home',
    template: '<heatmap></heatmap>'
  });

  $stateProvider.state({name: 'migration',
    url: '/migraion',
    template: '<iradioslider></iradioslider><flowmap></flowmap>'
  });

  $stateProvider.state({name: 'reason',
    url: '/reason',
    template: ''
  });

  $stateProvider.state({name: 'table',
    url: '/table',
    template: '<iradioslider></iradioslider><table></table>'
  });

  $stateProvider.state({name: 'about',
    url: '/about',
    template: ''
  });
}
