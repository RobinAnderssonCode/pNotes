// Add note
app.controller('AddNoteCtrl', function($scope, $state, NoteFactory) {

    $scope.saveNote = function(title, body) {
        var obj = {};
        obj.title = title;
        obj.body = body;
        obj.date = new Date();
        obj.id = new Date().valueOf();

        NoteFactory.saveNote(obj);
        $state.go('listNotes');
    };

});

// View notes
app.controller('ListNotesCtrl', function($scope, $state, NoteFactory) {
    $scope.allNotes = NoteFactory.getAllNotes;
});

// Single note
app.controller('SingleNoteCtrl', function($scope, $state, $stateParams, NoteFactory) {
    // $stateParams.id is a string
    var noteId = parseInt($stateParams.id);

    $scope.singleNote = NoteFactory.getNote(noteId);
    $scope.title = $scope.singleNote.title;
    $scope.body = $scope.singleNote.body;
});


// Edit note
app.controller('EditNoteCtrl', function($scope, NoteFactory, $state) {

	$(".focusout").focusout(function() {
		console.log($scope.id)
	});

    $scope.editNote = function(title, body, id) {
    	console.log(id);
        var obj = {};
        obj.title = title;
        obj.body = body;
        obj.date = new Date();


        NoteFactory.editNote(id, obj);
        $state.go('listNotes');
    };
});

// Delete note
app.controller('DeleteNoteCtrl', function($scope, $state, NoteFactory, $ionicActionSheet) {
    console.log("delete called")
});
