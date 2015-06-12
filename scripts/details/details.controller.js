angular
  .module('app')
  .controller('DetailsController', DetailsController);

DetailsController.$inject = ['$routeParams', '$http', 'productsData', 'productDataFactory'];

/* @ngInject */
function DetailsController($routeParams, $http, productsData, productDataFactory) {
  /* jshint validthis: true */
  var vm = this;

  vm.activate = activate;
  vm.formData = {};
  vm.product = {};
  vm.submitForm = submitForm;
  vm.title = 'DetailsController';

  activate();

  ////////////////

  function activate() {

    if (angular.isArray(productsData)) {
      for (var i = 0; i < productsData.length; i++) {
        if (productsData[i].id === $routeParams.productId) {
          vm.product=productsData[i];
        }
      }
    }

  }


  function submitForm() {

    $http.post('/comment',{id: vm.product.id, user: vm.formData.user, message: vm.formData.message})
      .success(function(data, status, headers) {
        //alert('success');

        productDataFactory.getProducts().then(function (data) {
          if (angular.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
              if (data[i].id === $routeParams.productId) {
                vm.product=data[i];
              }
            }
          }
        }, function (reason) {
          console.log(reason);
        })

      })
      .error(function (data, status, headers) {
        alert('error');
      });

    vm.formData = {};

    return false;

  }

}
