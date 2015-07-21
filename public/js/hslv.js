var app = angular
  .module('hsl_viewer', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('orange');
  }
);

app.controller('LinksCtrl', [ '$scope', '$http', function($scope, $http) {
  $scope.sourceUrl = "http://gruspbot.herokuapp.com/links";
  //$scope.sourceUrl = "/links";
  $scope.links = new Array();
  $scope.totalLinks = 0;
	$scope.filterVal = null;
	$scope.showFilter = false;

	this.toggleFilter = function () {
		$scope.showFilter = !$scope.showFilter;
		return $scope.showFilter;
	};

	this.linkMatch = function (quickFilterText) {
		return quickFilterText.match("/" + filterVal + "/i");
	};

  this.getLinks = function () {
    var request = $http({
      method: 'get',
      url: $scope.sourceUrl,
    }).
    success(function(res) {
      $scope.links = res.data;
			$scope.links.quickFilterText = $scope.links.room + "-" + $scope.links.postedBy + "-" + $scope.links.link + "-" + $scope.links.tags;
      $scope.totalLinks = res.totalLinks;
    }).error(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
      console.log(headers);
      console.log(config);
    });
  };

  //this.getLinks();
}]);
