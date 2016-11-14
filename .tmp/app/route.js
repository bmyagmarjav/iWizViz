angular
.module('app')
.config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false}).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider.state({name: 'flowmap',
    url: '/flowmap',
    template: '<iradioslider></iradioslider><flowmap></flowmap>'
  });

  $stateProvider.state({name: 'starplot',
    url: '/starplot',
    template: '<starplot></starplot>'
  });
}
