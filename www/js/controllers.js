// Login
app.controller('LoginCtrl', function($scope, $state, LoginService) {

$scope.log_pattern = LoginService.getLoginPattern();
 
var lock = new PatternLock('#lockPattern', {
    onDraw:function(pattern){
        if ($scope.log_pattern) {
            LoginService.checkLoginPattern(pattern).success(function(data) {
                lock.reset();
                console.log("ska gå till listnotes här");
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

    $scope.saveNote = function(title, body) {
        var obj = {};
        obj.title = title;
        obj.body = body;
        obj.date = new Date().toUTCString();
        obj.id = new Date().valueOf();

        NoteFactory.saveNote(obj);
        $state.go('listNotes');
    };

});

// View notes
app.controller('ListNotesCtrl', function($scope, NoteFactory) {
    $scope.allNotes = NoteFactory.getAllNotes;
});

// Single note
app.controller('SingleNoteCtrl', function($scope, $state, $stateParams, NoteFactory) {
    // $stateParams.id is a string
    var noteId = parseInt($stateParams.id);

    $scope.singleNote = NoteFactory.getNote(noteId);
    $scope.title = $scope.singleNote.title;
    $scope.body = $scope.singleNote.body;

    // Delete a note
     $scope.deleteNote = function(id) {
        NoteFactory.deleteNote(id);
        $state.go('listNotes');
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