app.factory('NoteFactory', function($cordovaSQLite) {

    var notes = [{
        title: "Welcome to pNotes",
        body: "pNotes stands for Private Notes. It's a small simple app designed to easily take notes and keeping them private.",
        date: "Sep 17, 2016",
        id: 1
    }];

    var noteService = {
        getAllNotes: function() {
            var query = "SELECT * FROM notes";
            var notes = [];
            $cordovaSQLite.execute(db, query, []).then(function(res) {
                if (res.rows.length > 0) {
                    for (var i = 0; i < res.rows.length; i++) {
                        notes.push({
                            title: res.rows.item(i).title,
                            body: res.rows.item(i).body,
                            date: res.rows.item(i).date,
                            id: res.rows.item(i).id,
                            time: res.rows.item(i).time
                        });
                    }
                } else {
                    console.log("No results found");
                }
            }, function(err) {
                console.error(err);
            });

            return notes;
        },
        getNote: function(noteId) {
            var query = "SELECT * FROM notes WHERE id = ?";
            return $cordovaSQLite.execute(db, query, [noteId]).then(function(res) {
                if (res.rows.length > 0) {
                    return res.rows.item(0);
                } else {
                    console.log("No results found");
                    return false;
                }
            }, function(err) {
                console.error(err);
            });
        },
        saveNote: function(obj) {
            console.log(obj);
            console.log(obj.time);
            var query = "INSERT INTO notes (title, body, date, time) VALUES (?,?,?,?)";
            $cordovaSQLite.execute(db, query, [obj.title, obj.body, obj.date, obj.time]).then(function(res) {
                console.log("INSERTED ID -> " + res.insertId);
            }, function(err) {
                console.error(err);
            });
        },
        editNote: function(obj) {
            console.log(obj);
            var query = "UPDATE notes SET title = (?), body = (?), date = (?), time = (?) WHERE id = (?)";
            $cordovaSQLite.execute(db, query, [obj.title, obj.body, obj.date, obj.time, obj.id]).then(function(res) {
                console.log("UPDATED ID -> " + obj.id);
            }, function(err) {
                console.error(err);
            });
        },
        deleteNote: function(noteId) {
            var query = "DELETE FROM notes WHERE ID = ?";
            return $cordovaSQLite.execute(db, query, [noteId]).then(function(res) {
                console.log("DELETED ID -> " + res.insertId);
            }, function(err) {
                console.error(err);
            });
        },
        deleteAll: function() {
            var query = "DELETE FROM notes";
            $cordovaSQLite.execute(db, query, []).then(function(res) {
                console.log("DELETED All notes");
            }, function(err) {
                console.error(err);
            });
        },
        orderByTime: function() {
            console.log("ORDER BY TIME FUNCTION CALLED");
        },
        orderByColor: function() {
            console.log("ORDER BY COLOR FUNCTION CALLED");
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
