angular.module('hello', [ 'ngRoute' ]).config(function($routeProvider) {

    $routeProvider.when('/', {
        templateUrl : 'home.html',
        controller : 'home'
    }).when('/login', {
        templateUrl : 'login.html',
        controller : 'navigation'
    }).when('/begin_password_recovery', {
        templateUrl : 'email.html',
        controller : 'PasswordRecoveryController'
    }).otherwise('/');

}).controller('navigation',

    function($rootScope, $scope, $http, $location, $route) {

        $scope.tab = function(route) {
            return $route.current && route === $route.current.controller;
        };

        var authenticate = function(callback) {

            $http.get('user').success(function(data) {
                if (data.name) {
                    $rootScope.authenticated = true;
                } else {
                    $rootScope.authenticated = false;
                }
                callback && callback();
            }).error(function() {
                $rootScope.authenticated = false;
                callback && callback();
            });

        }

        authenticate();

        $scope.credentials = {};
        $scope.login = function() {
            var data = 'username=' + $scope.credentials.username + '&password=' + $scope.credentials.password +
                    '&remember-me=' + $scope.rememberMe;
            $http.post('login', data, {
                headers : {
                    "content-type" : "application/x-www-form-urlencoded"
                }
            }).success(function(data) {
                authenticate(function() {
                    if ($rootScope.authenticated) {
                        console.log("Login succeeded")
                        $location.path("/");
                        $scope.error = false;
                        $rootScope.authenticated = true;
                    } else {
                        console.log("Login failed with redirect")
                        $location.path("/login");
                        $scope.error = true;
                        $rootScope.authenticated = false;
                    }
                });
            }).error(function(data) {
                console.log("Login failed")
                $location.path("/login");
                $scope.error = true;
                $rootScope.authenticated = false;
            })
        };

        $scope.logout = function() {
            $http.post('logout', {}).success(function() {
                $rootScope.authenticated = false;
                $location.path("/");
            }).error(function(data) {
                console.log("Logout failed")
                $rootScope.authenticated = false;
            });
        }

    }).controller('home', function($scope, $http) {
        $http.get('/resource/').success(function(data) {
            $scope.greeting = data;
        })
    }).controller('PasswordRecoveryController',

        function($scope, $http) {

            $scope.passwordRecovery = {};

            $scope.recoverPassword = function() {
                $scope.passwordRecovery.showConfirmationMessage = true;

                $scope.passwordRecovery.email = '';
                console.log("Sending email address from PasswordRecoveryController");
            }
    });