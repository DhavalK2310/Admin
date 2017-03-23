'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('LoginCtrl', function ($scope, $http, $location, $rootScope, $cookieStore) {

      var refresh = function () {
          $http.get("http://localhost:3000/register")
          .then(function (response) {
              $scope.aa = response.data;
          });
      };

      refresh();


      $scope.editProf = function (id) {
          $location.path("dashboard/MyProfile").search('pid', id);
      }

	  $scope.checkValid = function(myUsername,MyPass) {
		
		var data={"username":myUsername,"password":MyPass};
		
		$http.post(
                'http://localhost:3000/Register/login',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).success(function (data) {
                
                if (data.status === "success") {
                    $rootScope.IsLogin = true;
                    $cookieStore.put('currentUserId', data.userId);
                    $cookieStore.put('currentUserName', data.userName);
                    $cookieStore.put('currentDispName', data.dispName);
                    
					$location.path("dashboard/home");
				}
                else {
                    $rootScope.IsLogin = false;
				    $scope.aa = data.message;
				}
            });
    }
  });
