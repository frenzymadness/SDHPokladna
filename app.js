var app = angular.module('App', [])

app.controller('ItemListController', function ItemListController($scope, $http) {
  $http.get('data.json')
       .then(function(res){
          $scope.items = res.data;
        });
});
