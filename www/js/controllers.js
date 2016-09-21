// Date options
var options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
};

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

// Add note
app.controller('AddNoteCtrl', function($scope, $state, NoteFactory, $cordovaSQLite) {

    $scope.note = {};
    $scope.saveNote = function() {
        $scope.note.title = $scope.note.title;
        $scope.note.body = $scope.note.body;
        var date = new Date();
        $scope.note.date = new Intl.DateTimeFormat("en-us", options).format(date);
        // $scope.note.time = new Date().valueOf();

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

    $scope.removePattern = function() {
        LoginService.removeLoginPattern();
        $scope.popover.hide();
        $state.go('login');
        setTimeout(function() {
            document.location.reload(true);
        }, 1);
    };

    $scope.goToAbout = function() {
        $scope.popover.hide();
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
        $scope.singleNote = obj;
        $scope.title = obj.title;
        $scope.body = obj.body;
    }, function(err) {
        console.log(err);
    });

    $scope.editNote = function() {
        $state.go('listNotes');
    }

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


// Edit note
app.controller('EditNoteCtrl', function($scope, NoteFactory, $stateParams, $state) {


    $(".focusout").focusout(function() {
        var obj = {};
        obj.title = $scope.title;
        obj.body = $scope.body;
        obj.id = parseInt($stateParams.id);
        obj.date = new Date();

        NoteFactory.editNote(obj);
    });
});
