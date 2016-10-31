function isidebarController() {
  this.text = 'New component';
}

angular
  .module('app')
  .component('isidebar', {
    templateUrl: 'app/components/sidebar/isidebar.html',
    controller: isidebarController
  });
