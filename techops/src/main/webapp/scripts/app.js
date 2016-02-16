define(['angular', 'ngResource', 'ngRoute', 'ngCookies', 'controllers/main-controller', 'utils/Constant', 'angular.ui.bootstrap', 'ngLocalStorage'],
  function(angular, ngResource, ngRoute, ngCookies, mainController, Constant) {
    var appName = "ops";
    var app = angular.module(appName, ['ngResource', 'ngRoute', 'ngCookies', 'ui.bootstrap', 'LocalStorageModule']);
    app.controller(mainController.name, mainController.fn);
    app.bootstrap = function() {
        (function () {
            app.constant("Permission", {
                userPermissions: [],
                permissionMapping: {}
            });
            function bootstrapApplication() {
                angular.element(document).ready(function () {
                    angular.bootstrap(document, [appName]);
                });
            }
            bootstrapApplication();
        }());
    };

    app.run(['$cookies', '$location', '$rootScope', 'Permission', '$http', function ($cookies, $location, $rootScope, Permission, $http) {
      $rootScope.permissionMapping = Permission.permissionMapping;
      $rootScope.permissions = Permission.userPermissions;
      $http.get(Constant.apiBase + '/common/currentuser').then(function (res) {
        if (res.data.respCode === '_200') {
          $rootScope.userName = res.data.result.name;
        }
        }, function (err) {
              console.log(err);
        });
      $rootScope.$on('$routeChangeSuccess', function (event, routeData) {
          $rootScope.pageTitle = (routeData.helpAlias? routeData.helpAlias : '首页') + ' BDChannel 点融网-Dianrong';
          if (!$rootScope.getCookieUsername()) {
              //$location.url('/login');
          }
      })
    }]);

    app.config(['$routeProvider',function($routeProvider) {
        $routeProvider.
        when('/user', {
          templateUrl: 'views/user/user.html',
          controller: 'UserController',
          helpAlias: '用户管理'
        }).
        when('/notfound', {
          templateUrl: 'views/common/notfound.html',
          helpAlias: '啥也木有'
        }).
        otherwise({
          redirectTo: 'notfound'
        });
    }]);
    return app;
});