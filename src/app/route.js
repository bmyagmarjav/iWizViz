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
    url: '/migration',
    template: '<iradioslider></iradioslider>' +
      '<div class="row"><flowmap></flowmap><isankey></isankey></div><div class="row"><groupedbarchart></groupedbarchart></div>'
  });

  $stateProvider.state({name: 'reason',
    url: '/reason',
    template: '<iradioslider></iradioslider>' +
      '<div class="row"><istarplot></istarplot><ibubble><ibubble></div>'
  });

  $stateProvider.state({name: 'table',
    url: '/table',
    template: '<iradioslider></iradioslider><table></table>'
  });

  $stateProvider.state({name: 'about',
    url: '/about',
    template: '<about></about>'
  });
}
