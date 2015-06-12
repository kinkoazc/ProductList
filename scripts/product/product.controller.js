angular
  .module('app')
  .controller('ProductController', ProductController);

ProductController.$inject = ['$http', 'productsData', 'productDataFactory'];

/* @ngInject */
function ProductController($http, productsData, productDataFactory) {
  /* jshint validthis: true */
  var vm = this;

  vm.activate = activate;
  vm.formData = {};
  vm.product = {};
  vm.products = [];
  vm.submitForm = submitForm;
  vm.title = 'ProductController';


  activate();

  ////////////////

  function activate() {
    vm.products = productsData;
  }

  function submitForm() {

    if (angular.isDefined(vm.formData.id) && angular.isNumber(vm.formData.id)) {

      for (var i=0;i<vm.products.length;i++) {
        if (vm.products[i].id==vm.formData.id) {
          alert('The id already exists!');

          return false;
        }
      }

      $http.post('/add-product', {id: vm.formData.id+'', name: vm.formData.name, price: vm.formData.price})
        .success(function (data, status, headers) {
          alert('success');

          productDataFactory.getProducts().then(function (data) {
            if (angular.isArray(data)) {
              vm.products=data;
            }
          }, function (reason) {
            console.log(reason);
          });

        })
        .error(function (data, status, headers) {
          alert('error');
        });

      vm.formData = {};

    } else {
      alert('Please enter an id');
    }

    return false;

  }

}
