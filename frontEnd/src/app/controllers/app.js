var leaveApp = angular.module('leaveApp', ['ui.router']);

leaveApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url:'/',
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl'
    })
    .state('leave', {
        url: '^/leave',
        template: '<my-leave></my-leave>'
    });
   
}]);
