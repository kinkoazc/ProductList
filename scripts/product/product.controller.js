angular
  .module('app')
  .controller('ListController', ListController);

ListController.$inject = ['productsData'];

/* @ngInject */
function ListController(productsData) {
  /* jshint validthis: true */
  var vm = this;

  vm.activate = activate;
  vm.products = [];
  vm.title = 'ListController';


  activate();

  ////////////////

  function activate() {
    vm.products = productsData;
  }


}
