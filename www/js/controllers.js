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
app.controller('AddNoteCtrl', function($scope, $state, NoteFactory) {

    $scope.note = {};
    $scope.saveNote2 = function() {
        $scope.note.title = $scope.note.title;
        $scope.note.body = $scope.note.body;
        $scope.note.date = new Date();
        $scope.note.id = new Date().valueOf();

        NoteFactory.saveNote($scope.note);
        $state.go('listNotes');
    };
});

// View notes
app.controller('ListNotesCtrl', function($scope, NoteFactory, LoginService, $state, $ionicPopover) {
    $scope.allNotes = NoteFactory.getAllNotes;

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
    // $stateParams.id is a string
    var noteId = parseInt($stateParams.id);

    $scope.singleNote = NoteFactory.getNote(noteId);
    $scope.title = $scope.singleNote.title;
    $scope.body = $scope.singleNote.body;

    // Delete a note
    $scope.deleteNote = function(id) {
        $ionicActionSheet.show({
            destructiveText: 'Delete',
            titleText: 'Delete note?',
            cancelText: 'Cancel',
            destructiveButtonClicked: function() {
                NoteFactory.deleteNote(id);
                $state.go('listNotes');
                return true;
            }
        });

    };
});


// Edit note
app.controller('EditNoteCtrl', function($scope, NoteFactory, $stateParams) {
    $(".focusout").focusout(function() {
        var obj = {};
        obj.title = $scope.title;
        obj.body = $scope.body;
        obj.id = parseInt($stateParams.id);
        obj.date = new Date();

        NoteFactory.editNote(obj.id, obj);
    });
});
