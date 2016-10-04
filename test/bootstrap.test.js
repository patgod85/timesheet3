var sails = require('sails');
//noinspection JSUnusedLocalSymbols
var should = require('should');

before(function (done) {

    // Increase the Mocha timeout so that Sails has enough time to lift.
    this.timeout(5000);

    sails.lift({

        models: {
            connection: 'localDiskDb'
        },
        port: 1338,

        policies: {
            '*': true
        }

    }, function (err) {
        if (err) return done(err);
        // here you can load fixtures, etc.
        done(err, sails);
    });
});

after(function (done) {
    // here you can clear fixtures, etc.
    sails.lower(done);
});