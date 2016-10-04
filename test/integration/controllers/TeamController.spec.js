
var request = require('supertest');

describe('TeamController', function() {

    beforeEach(function(done) {

        Team.destroy({})
            .then(function(){
                return Team.create({id: 1, name: 'it-team', code: 'it'});
            })
            .then(function(){done()})
            .catch(console.log);

    });

    describe('POST /team', function() {
        it('update or create an array', function (done) {
            request(sails.hooks.http.app)
                .post('/team')
                .send({"items": [{id: 1, "name":"koa1"}, {id: 2, "name":"koa2", code: '2'}]})
                .expect(200)
                .then(function(){
                    return Team.find();
                })
                .then(function(records){
                        records.should.have.size(2);
                    })
                .then(function(){done()})
                .catch(console.log);
        });
    });

    describe('PUT /team/update/1', function() {
        it('should update passed object', function (done) {
            request(sails.hooks.http.app)
                .put('/team/update/1')
                .send({"name":"koa", employees: []})
                .expect(200)
                .then(function(){
                    return Team.find();
                })
                .then(function(records){
                    records.should.have.size(1);
                    records.should.have.propertyByPath('0', 'name').eql('koa');
                })
                .then(function(){done()})
                .catch(console.log);
        });
    });


});