var Messages = require('./models/messages');

module.exports = function(app) {

    // api ---------------------------------------------------------------------
    // get all messages
    app.get('/api/messages', function(req, res) {

        // use mongoose to get all messages in the database
        Messages.find(function(err, messages) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(messages); // return all messages in JSON format
        });
    });

    // create todo and send back all messages after creation
    app.post('/api/messages', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Messages.create({
            mobile: req.body.mobile,
            message: req.body.message
        }, function(err, message) {
            if (err)
                res.send(err);

            // get and return all the messages after you create another
            Messages.find(function(err, messages) {
                if (err)
                    res.send(err);
                res.json(messages);
            });
        });

    });

    // delete a message
    app.delete('/api/messages/:message_id', function(req, res) {
        Messages.remove({
            _id: req.params.todo_id
        }, function(err, message) {
            if (err)
                res.send(err);

            // get and return all the messages after you create another
            Messages.find(function(err, messages) {
                if (err)
                    res.send(err);
                res.json(messages);
            });
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};