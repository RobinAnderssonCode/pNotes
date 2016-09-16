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
        // .state('home', {
        //     url: '/',
        //     templateUrl: 'home.html'
        // })
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
        // .state('editNote', {
        //     url: '/edit',
        //     templateUrl: 'editNote.html',
        //     controller: 'EditNoteCtrl'
        // })
        .state('updateNote', {
            url: '/edit/:id',
            templateUrl: 'updateNote.html',
            controller: 'UpdateNoteCtrl'
        })
        // .state('deleteNote', {
        //     url: '/delete',
        //     templateUrl: 'deleteNote.html',
        //     controller: 'DeleteNoteCtrl'
        // });

    $urlRouterProvider.otherwise('/');
});
