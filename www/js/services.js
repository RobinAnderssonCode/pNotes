app.factory('NoteFactory', function($cordovaSQLite) {

    var orderByTime = "DESC";
    var count = 0;

    var noteService = {
        getAllNotes: function() {
            var query = "SELECT * FROM notes ORDER BY time " + orderByTime;
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
            var query = "INSERT INTO notes (title, body, date, time) VALUES (?,?,?,?)";
            $cordovaSQLite.execute(db, query, [obj.title, obj.body, obj.date, obj.time]).then(function(res) {
            }, function(err) {
                console.error(err);
            });
        },
        editNote: function(obj) {
            var query = "UPDATE notes SET title = (?), body = (?), date = (?), time = (?) WHERE id = (?)";
            $cordovaSQLite.execute(db, query, [obj.title, obj.body, obj.date, obj.time, obj.id]).then(function(res) {
            }, function(err) {
                console.error(err);
            });
        },
        deleteNote: function(noteId) {
            var query = "DELETE FROM notes WHERE ID = ?";
            return $cordovaSQLite.execute(db, query, [noteId]).then(function(res) {
            }, function(err) {
                console.error(err);
            });
        },
        deleteAll: function() {
            var query = "DELETE FROM notes";
            $cordovaSQLite.execute(db, query, []).then(function(res) {
            }, function(err) {
                console.error(err);
            });
        },
        orderByTime: function() {
            count++;
            if (count % 2 === 0) {
                orderByTime = "DESC";
            } else {
                orderByTime = "ASC";
            }
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
