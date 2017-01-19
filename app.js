var app = angular.module('App', [])

app.controller('ItemListController', function ItemListController($scope, $http) {
  $http.get('data.json')
       .then(function(res){
          $scope.items = res.data;
          $scope.reset();
        });

  $scope.changePrice = function changePrice(price) {
    $scope.totalPrice += price;
  };

  $scope.reset = function reset() {
    $scope.totalPrice = 0;
    angular.forEach($scope.items, function(value, key) {
        this.ordered = false;
    });
  };
});
