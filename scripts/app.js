angular
  .module('app', [
    'ngRoute',
    'ngMockE2E'
  ])
  .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/list/list.view.html',
        controller: 'ListController',
        controllerAs: 'listCtrl',
        resolve: {
          productsData: function (productData) {
            return productData.getProducts();
          }
        }
      })
  }])
  .run(['$httpBackend', function ($httpBackend) {
    var products = [
      {
        name: 'toy',
        price: '$35'
      },
      {
        name: 'teddy bear',
        price: '$20'
      },
      {
        name: 'cake',
        price: '$10'
      }
    ];

    $httpBackend.whenGET('/products').respond(products);

    $httpBackend.whenPOST('/products').respond(function (method, url, data) {
      var product = angular.fromJson(data);
      products.push(product);
      return [200, product, {}];
    });

    $httpBackend.whenGET(/^scripts\//).passThrough();
  }]);

