
describe('TeamModel', function() {

    beforeEach(function(done) {

        Team.destroy({})
            .then(function(){
                return Team.create({id: 1, name: 'it-team', code: 'it'});
            })
            .then(function(){done()})
            .catch(console.log);

    });

    describe('#find()', function() {
        it('should check find function', function (done) {
            Team.find()
                .then(function(results) {
                    results.should.have.size(1);
                    done();
                })
                .should.be.fulfilled();
        });
    });

    describe('#update()', function() {
        it('should check update function', function (done) {
            Team.update(1, {name: 'foo'})
                .then(function(results) {
                    results.should.have.size(1);
                    results.should.have.propertyByPath('0', 'name').eql('foo');
                    done();
                })
                .should.be.fulfilled();
        });
    });

    describe('#findOrCreate()', function() {
        it('should check findOrCreate function', function (done) {
            Team.findOrCreate({name: 'foobar', code: 'f'})
                .then(function(results) {
                    results.should.not.be.empty();

                    return Team.find({});
                })
                .then(function(results){

                    results.should.have.size(2);
                    results.should.have.propertyByPath('1', 'name').eql('foobar');
                    done();
                })
                .should.be.fulfilled();
        });
    });

});