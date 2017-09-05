var Messages = require('./models/messages');

var qs = require("querystring");
var http = require("http");

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


    // getCounts
    app.get('/api/counts', function(req, response) {
        var options = {
            "method": "GET",
            "hostname": "2factor.in",
            "port": null,
            "path": "/API/V1/96cd4ca5-9205-11e7-94da-0200cd936042/BAL/SMS",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            }
        };

        var req = http.request(options, function(res) {
            var chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function() {
                var body = Buffer.concat(chunks);
                //console.log(body.toString());
                response.send(body.toString());
            });
        });

        req.write(qs.stringify({}));
        req.end();
    });


    // sendSms
    app.post('/api/send/message', function(req, response) {
        var options = {
            "method": "GET",
            "hostname": "2factor.in",
            "port": null,
            "path": "/API/V1/96cd4ca5-9205-11e7-94da-0200cd936042/SMS/" + req.body.mobile + "/AUTOGEN",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            }
        };

        var req = http.request(options, function(res) {
            var chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function() {
                var body = Buffer.concat(chunks);
                //console.log(body.toString());
                response.send(body.toString());
            });
        });

        req.write(qs.stringify({}));
        req.end();
    });


    app.get('/api/inboxes', function(req, response) {
        var options = {
            "method": "GET",
            "hostname": "api.textlocal.in",
            "port": null,
            "path": "https://api.textlocal.in/get_messages/?apikey=pMUR5xeFRbU-MbUk81vdOf0sVEA0zAnRgT3tZvGyIY&inbox_id=763865",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            }
        };

        var req = http.request(options, function(res) {
            var chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function() {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
                response.send(body.toString());
            });
        });

        req.write(qs.stringify({ themeName: 'mobile' }));
        req.end();
    });

    // getInboxes
    app.get('/api/inboxes1', function(req, response) {
        // var options = {
        //     "method": "POST",
        //     //"hostname": "https://api.textlocal.in",
        //     "port": null,
        //     "path": "https://api.textlocal.in/get_inboxes/?apikey=pMUR5xeFRbU-5DBNEXrF2ZYIEw4SPtJ5QF6gLs1b6H",
        //     "headers": {
        //         "content-type": "application/x-www-form-urlencoded"
        //     }
        // };

        var apiKey = 'pMUR5xeFRbU-5DBNEXrF2ZYIEw4SPtJ5QF6gLs1b6H';

        var options = {
            "method": "GET",
            //"hostname": "https://api.textlocal.in",
            "port": null,
            "path": "https://api.textlocal.in/get_inboxes/" + apiKey,
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            }
        };

        //pMUR5xeFRbU-5DBNEXrF2ZYIEw4SPtJ5QF6gLs1b6H
        //nitinchandra.nitin@gmail.com
        //India@1234

        var req = http.request(options, function(res) {
            var chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function() {
                var body = Buffer.concat(chunks);
                //console.log(body.toString());
                response.send(body.toString());
            });
        });

        req.write(qs.stringify({}));
        req.end();
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};