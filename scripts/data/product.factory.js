angular
  .module('app')
  .factory('productDataFactory', productDataFactory);

productDataFactory.$inject = ['$http', '$q'];

/* @ngInject */
function productDataFactory($http, $q) {
  return {
    getProducts: getProducts,
    getProduct: getProduct
  };

  ////////////////

  function getProducts() {

    var defered = $q.defer();

    $http
      .get('/products')
      .then(getProductsComplete, getProductsFailed);

    function getProductsComplete(data) {
      defered.resolve(data.data);
    }

    function getProductsFailed(reason) {
      defered.reject(reason);
    }

    return defered.promise;
  }

  function getProduct(id) {

    var defered = $q.defer();

    $http
      .get('/products')
      .then(getProductsComplete, getProductsFailed);

    function getProductsComplete(data) {

      if (angular.isArray(data.data)) {
        for (var i=0;i<data.data.length;i++) {
          if (data.data[i].id==id) {
            defered.resolve([data.data[i]]);
          }
        }
      }

      defered.reject('product id not found');
    }

    function getProductsFailed(reason) {
      defered.reject(reason);
    }

    return defered.promise;
  }

}

