var app = angular.module('hsl_viewer', []);

app.filter('searchFor', function() {
  return function (arr,searchString) {
    if (!searchString) {
      return arr;
    }

    var result = [];
    searchString = searchString.toLowerCase();

    angular.forEach(arr, function (item) {
      if (JSON.stringify(item).match(searchString)) result.push(item);
    });

    return result;
  };
});

app.controller('LinksCtrl', [ '$scope', '$http', function($scope, $http) {
  $scope.sourceUrl = "http://gruspbot.herokuapp.com/links";
  $scope.links = new Array();
  $scope.totalLinks = 0;
  $scope.filterVal = null;
  $scope.showFilter = false;

  this.toggleFilter = function () {
    $scope.showFilter = !$scope.showFilter;
    return $scope.showFilter;
  };

  this.getLinks = function () {
    var request = $http({
      method: 'get',
      url: $scope.sourceUrl,
    }).
    success(function(res) {
      $scope.links = res.data;
      $scope.totalLinks = res.totalLinks;
    }).error(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
      console.log(headers);
      console.log(config);
    });
  };

  this.getLinks();
}]);
