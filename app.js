var app = angular.module('App', [])

app.controller('ItemListController', function ItemListController($scope, $http) {
  $http.get('data.json')
       .then(function(res){
          $scope.items = res.data;
          $scope.reset();
        });

  $scope.addItem = function addItem(item, type) {
    if (type == "small") {
      $scope.totalPrice += item.smallPrice;
      item.orderedSmall += 1;
    } else {
      $scope.totalPrice += item.price;
      item.ordered += 1;
    }
    $scope.regenerateTextOrder();
    $scope.countMoney(0);
  };

  $scope.removeItem = function removeItem(item, type) {
    if (type == "small") {
      $scope.totalPrice -= item.smallPrice;
      item.orderedSmall -= 1;
    } else {
      $scope.totalPrice -= item.price;
      item.ordered -= 1;
    }
    $scope.regenerateTextOrder();
    $scope.countMoney(0);
  };

  $scope.regenerateTextOrder = function regenerateTextOrder() {
    $scope.order = "";
    angular.forEach($scope.items, function(item, key) {
      if (item.ordered > 0) {
        $scope.order = $scope.order + "Velka " + item.name + " " + item.ordered + " ks\n";
      }
      if (item.orderedSmall > 0) {
        $scope.order = $scope.order + "Mala " + item.name + " " + item.orderedSmall + " ks\n";
      }
    });
  };

  $scope.reset = function reset() {
    $scope.totalPrice = 0;
    $scope.order = "";
    $scope.money = 0;
    $scope.moneyBack = 0;
    angular.forEach($scope.items, function(item, key) {
        item.ordered = 0;
        item.orderedSmall = 0;
    });
  };

  $scope.countMoney = function countMoney(amount) {
    $scope.money += amount;
    $scope.moneyBack = $scope.money - $scope.totalPrice
  };

  $scope.resetMoney = function resetMoney() {
    $scope.money = 0;
    $scope.moneyBack = 0;
  };
});
