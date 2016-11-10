function inavbarController() {
  this.text = 'My brand new component!';
}

angular
  .module('app')
  .component('inavbar', {
    templateUrl: 'app/components/inavbar/inavbar.html',
    controller: inavbarController
  });

