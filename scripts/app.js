(function () {

  "use strict";

  angular
    .module('app', [
      'ngRoute',
      'ngMockE2E'
    ])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/products', {
          templateUrl: 'scripts/list/list.view.html',
          controller: 'ListController',
          controllerAs: 'vm',
          resolve: {
            productsData:['productDataFactory', function (productDataFactory) {
              return productDataFactory.getProducts();
            }]
          }
        })
        .when('/product/:productId', {
          templateUrl: 'scripts/details/details.view.html',
          controller: 'DetailsController',
          controllerAs: 'vm',
          resolve: {
            productsData:['$location', '$route', 'productDataFactory', function ($location, $route, productDataFactory) {
              return productDataFactory.getProduct($route.current.params.productId).then(
                function(data) {
                  return data;
                },
                function(reason) {
                  $location.path('#/products');
                }
              );
            }]
          }
        })
        .when('/add-product', {
          templateUrl: 'scripts/product/product.view.html',
          controller: 'ProductController',
          controllerAs: 'vm',
          resolve: {
            productsData:['$route', 'productDataFactory', function ($route, productDataFactory) {
              return productDataFactory.getProducts();
            }]
          }
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
            if (!(angular.isDefined(products[i].comments) && angular.isArray(products[i].comments))) {
              products[i].comments = [];
            }

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

})();



