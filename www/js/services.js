app.factory('NoteFactory', function() {

    var notes = [{
        title: "Welcome to pNotes",
        body: "pNotes stands for Private Notes. It's a small simple app designed to easily take notes and keeping them private.",
        date: "Sep 17, 2016",
        id: 1
    }];

    var noteService = {
        getAllNotes: notes,
        getNote: function(noteId) {
            for (var i = 0; i < notes.length; i++) {
                if (notes[i].id === noteId) {
                    return notes[i];
                }
            }
        },
        saveNote: function(obj) {
            notes.unshift(obj);
        },
        editNote: function(noteId, obj) {
            for (var i = 0; i < notes.length; i++) {
                if (notes[i].id === noteId) {
                    notes[i] = obj;
                    notes[i].id = noteId;
                    return notes[i]
                }
            }
        },
        deleteNote: function(noteId) {
            for (var i = 0; i < notes.length; i++) {
                if (notes[i].id === noteId) {
                    notes.splice(i, 1);
                    return notes;
                }
            }
        }
    }

    return noteService;

});

app.factory('LoginService', function($q) {
	return {
        getLoginPattern: function() {
            return window.localStorage.getItem("login_pattern");
        },
        setLoginPattern: function(pattern) {
            window.localStorage.setItem("login_pattern", pattern);
        },
        removeLoginPattern: function() {
            window.localStorage.removeItem("login_pattern");
        },
        checkLoginPattern: function(pattern) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            if (pattern == this.getLoginPattern()) {
                deferred.resolve();
            } else {
                deferred.reject();
            }

            return promise;
        }

    }
});
