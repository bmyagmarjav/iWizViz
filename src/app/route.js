angular
.module('app')
.config(routesConfig);

/** @ngInject */
function routesConfig($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false}).hashPrefix('!');
    $urlRouterProvider.otherwise('/');
}
