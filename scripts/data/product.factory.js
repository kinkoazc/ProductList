angular
  .module('app')
  .factory('productData', productData);

productData.$inject = ['$http', '$q'];

/* @ngInject */
function productData($http, $q) {
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

