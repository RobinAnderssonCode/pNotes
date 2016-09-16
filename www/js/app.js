var app = angular.module('pNotes', ['ionic','monospaced.elastic']);

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
        })
        .state('listNotes', {
            url: '/',
            templateUrl: 'listNotes.html',
            controller: 'ListNotesCtrl'
        })
        .state('singleNote', {
            url: '/:id',
            templateUrl: 'singleNote.html',
            controller: 'SingleNoteCtrl'
        })
        .state('addNote', {
            url: '/add',
            templateUrl: 'addNote.html',
            controller: 'AddNoteCtrl'
        });

    $urlRouterProvider.otherwise('/login');
});
