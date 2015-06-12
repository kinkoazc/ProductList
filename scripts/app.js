angular
  .module('app', [
    'ngRoute',
    'ngMockE2E'
  ])
  .config(['$routeProvider', '$httpProvider', function ($routeProvider) {
    $routeProvider
      .when('/products', {
        templateUrl: 'scripts/list/list.view.html',
        controller: 'ListController',
        controllerAs: 'vm',
        resolve: {
          productsData: function (productDataFactory) {
            return productDataFactory.getProducts();
          }
        }
      })
      .when('/product/:productId', {
        templateUrl: 'scripts/details/details.view.html',
        controller: 'DetailsController',
        controllerAs: 'vm',
        resolve: {
          productsData: function (productDataFactory) {
            return productDataFactory.getProducts();
          }
        }
      })
      .when('/add-product', {
        templateUrl: 'scripts/product/product.view.html',
        controller: 'ProductController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/products'
      });
  }])
  .run(['$httpBackend', function ($httpBackend) {
    var products = [
      {
        id: '1',
        name: 'toy',
        price: '$35',
        comments: []
      },
      {
        id: '2',
        name: 'teddy bear',
        price: '$20',
        comments: []
      },
      {
        id: '3',
        name: 'cake',
        price: '$10',
        comments: []
      }
    ];

    $httpBackend.whenGET('/products').respond(products);

    $httpBackend.whenPOST('/comment').respond(function (method, url, data) {
      var comment = angular.fromJson(data);

      for (var i=0;i<products.length;i++) {
        if (products[i].id==comment.id) {
          products[i].comments.push(comment);
        }
      }

      return [200, comment, {}];
    });

    $httpBackend.whenPOST('/add-product').respond(function (method, url, data) {
      var product = angular.fromJson(data);
      products.push(product);
      return [200, product, {}];
    });

    $httpBackend.whenGET(/^scripts\//).passThrough();
  }]);

