var app = angular.module('pNotes', ['ionic', 'monospaced.elastic', 'ngCordova']);
var db = null;

app.run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        // Open database
        db = $cordovaSQLite.openDB("pnotes.db");

        //If we add something new to the table, drop the table and create it again. (for testing only)
        // $cordovaSQLite.execute(db, "DROP TABLE notes");


        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS notes (id integer primary key, title text, body text, date text, time integer)");

        // Terminate app on home button pushed. 
        $ionicPlatform.on('pause', function() {
            ionic.Platform.exitApp();
        });
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
        })
        .state('about', {
            url: '/about',
            templateUrl: 'about.html'
        });

    $urlRouterProvider.otherwise('/login');
});
