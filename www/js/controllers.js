// Login
app.controller('LoginCtrl', function($scope, $state, LoginService, $ionicHistory) {

    $scope.log_pattern = LoginService.getLoginPattern();
    var lock = new PatternLock('#lockPattern', {
        onDraw: function(pattern) {
            if ($scope.log_pattern) {
                LoginService.checkLoginPattern(pattern).success(function(data) {
                    lock.reset();
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go('listNotes');
                }).error(function(data) {
                    lock.error();
                });
            } else {
                LoginService.setLoginPattern(pattern);
                lock.reset();
                $scope.log_pattern = LoginService.getLoginPattern();
                $scope.$apply();
            }
        }
    });
});

// Date options
var options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
};

// Add note
app.controller('AddNoteCtrl', function($scope, $state, NoteFactory, $cordovaSQLite) {

    $scope.note = {};
    $scope.saveNote = function() {
        $scope.note.title = $scope.note.title;
        $scope.note.body = $scope.note.body;
        var date = new Date();
        $scope.note.date = new Intl.DateTimeFormat("en-us", options).format(date);
        $scope.note.time = new Date().valueOf();
        // $scope.note.color = 

        NoteFactory.saveNote($scope.note);
        $state.go('listNotes');
    };
});

// View notes
app.controller('ListNotesCtrl', function($scope, NoteFactory, LoginService, $state, $ionicPopover, $ionicActionSheet) {

    $scope.$on("$ionicView.beforeEnter", function() {
        $scope.allNotes = NoteFactory.getAllNotes();
    });

    $scope.deleteAll = function() {
        $ionicActionSheet.show({
            destructiveText: 'Delete all',
            titleText: 'Delete all notes?',
            cancelText: 'Cancel',
            destructiveButtonClicked: function() {
                NoteFactory.deleteAll();
                $scope.closePopover();
                $scope.allNotes = NoteFactory.getAllNotes();
                return true;
            }
        });
    };

    $scope.orderByDate = function() {
        NoteFactory.orderByDate();
    };

    $scope.orderByColor = function() {
      NoteFactory.orderByColor();  
    };

    $scope.removePattern = function() {
        LoginService.removeLoginPattern();
        $scope.closePopover();
        $state.go('login');
        setTimeout(function() {
            document.location.reload(true);
        }, 1);
    };

    $scope.goToAbout = function() {
        $scope.closePopover();
        $state.go('about');
    };

    // POPOVER
    $ionicPopover.fromTemplateUrl('menu.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
});

// Single note
app.controller('SingleNoteCtrl', function($scope, $state, $stateParams, NoteFactory, $ionicActionSheet) {

    var noteId = parseInt($stateParams.id);
    NoteFactory.getNote(noteId).then(function(obj) {
        $scope.obj = obj;
        console.log($scope.obj);
        $scope.obj.title = obj.title;
        $scope.obj.body = obj.body;
        console.log(typeof $scope.obj.body);
    }, function(err) {
        console.log(err);
    });

    $scope.editNote = function() {
        var obj = {};
        obj.title = $scope.obj.title;
        obj.body = $scope.obj.body;
        obj.id = parseInt($stateParams.id);
        var date = new Date();
        obj.date = new Intl.DateTimeFormat("en-us", options).format(date);
        obj.time = new Date().valueOf();

        NoteFactory.editNote(obj);
        $state.go('listNotes');
    };

    // Edit note on no textarea/input no focus.
     $(".focusout").focusout(function() {
        var obj = {};
        obj.title = $scope.obj.title;
        obj.body = $scope.obj.body;
        obj.id = parseInt($stateParams.id);
        var date = new Date();
        obj.date = new Intl.DateTimeFormat("en-us", options).format(date);
        obj.time = new Date().valueOf();

        NoteFactory.editNote(obj);
    });

    $scope.deleteNote = function(id) {
        $ionicActionSheet.show({
            destructiveText: 'Delete',
            titleText: 'Delete note?',
            cancelText: 'Cancel',
            destructiveButtonClicked: function() {
                NoteFactory.deleteNote(id).then(function() {
                    $state.go('listNotes');
                    return true;
                });
            }
        });
    };
});

// Att fixa :
// Titeln
// order by color
// about sidan
// importera / exportera
// färger
// Item sliding