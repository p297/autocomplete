/**
* angular-starter-kit
*
* @author Andrea SonnY <andreasonny83@gmail.com>
* @copyright 2016 Andrea SonnY <andreasonny83@gmail.com>
*
* This code may only be used under the MIT style license.
*
* @license MIT  https://andreasonny.mit-license.org/@2016/
*/
(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  function HomeController($scope, $http) {
    var _this = this;

    $scope.getProducts = function(val) {
      return $http.get('/search?q=' + val).then(function(response){
        console.log(response.data);
        return response.data;
      });
    }
  }



  HomeController.$inject = ['$scope', '$http'];
})();
