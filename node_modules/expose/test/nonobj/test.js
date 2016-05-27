
var expose = require('../..');


describe('expose()', function() {

    it('should handle non-object module.exports', function() {
        var imports = expose();
        imports.should.have.property('array');
        imports.should.have.property('string');
        imports.string.should.equal('CONSTANT');
        imports.array.length.should.equal(3);
        Object.keys(imports).length.should.equal(2);
    });
});
