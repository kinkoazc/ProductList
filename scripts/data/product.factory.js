angular
  .module('app')
  .factory('productDataFactory', productDataFactory);

productDataFactory.$inject = ['$http', '$q'];

/* @ngInject */
function productDataFactory($http, $q) {
  return {
    getProducts: getProducts
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

}

