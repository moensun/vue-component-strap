
var expose = require('../..');


describe('expose()', function() {

    it('should load src dir', function() {
        var imports = expose();
        imports.should.have.property('a');
        Object.keys(imports).length.should.equal(1);
    });
});
