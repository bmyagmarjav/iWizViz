function aboutController() {
  this.text = 'My brand new component!';
}

angular
  .module('app')
  .component('about', {
    templateUrl: 'app/components/about/about.html',
    controller: aboutController
  });

