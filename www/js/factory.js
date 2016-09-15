app.factory('NoteFactory', function() {

	var notes = [{
		title: "title 1",
		body: "body 1",
		date: null,
		id: 57
	},{
		title: "title 2",
		body: "body 2",
		date: null,
		id: 60
	}];

	var noteService = {
		getAllNotes: notes,
		getNote: function(noteId) {
			for (var i = 0; i < notes.length; i++) {
				if(notes[i].id === noteId) {
					return notes[i];
				}

			}
		},
		saveNote: function(obj) {
			notes.unshift(obj);
		},
		editNote: function(index, note) {
			notes[index] = note;
		},
		deleteNote: function(index) {
			notes.splice(index, 1);
		}
	}

	return noteService;
   
});



 // var allNotes = localStorage.notes || [{ title: "Hello", 
    // body: "Edit or delete this note and start writing", id: 0 }];

    // if (typeof allNotes === 'string') {
    //     allNotes = JSON.parse(allNotes);
    // }
    // return {
    //     getNotes: allNotes,
    //     saveNote: function(note) {
    //         allNotes.push(note);
    //         localStorage.notes = JSON.stringify(allNotes);
    //     },
    //     deleteNote: function(index) {
    //         var confirmDelete = confirm("Do you really want to delete this note?");
    //         if (confirmDelete) {
    //             allNotes.splice(index, 1)
    //             localStorage.notes = JSON.stringify(allNotes);
    //         }
    //     },
    //     editNote: function(index, note) {
    //         allNotes[index] = note;
    //         localStorage.notes = JSON.stringify(allNotes);
    //     },
    //     getNoteText: function(index) {
    //         var noteParent = document.getElementsByClassName("noteText")[index];
    //         var title = noteParent.getElementsByClassName("note-title")[0].innerText;
    //         var body = noteParent.getElementsByClassName("note-body")[0].innerText;
    //         return { title: title, body: body };
    //     }
    // }