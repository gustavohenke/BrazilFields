describe( "cpfCnpj Directive", function() {
    "use strict";

    var cpfCnpjFilter;
    var expect = chai.expect;

    beforeEach( module( "brazilfields.cpfCnpjFormat" ) );
    beforeEach( inject(function( $injector ) {
    	cpfCnpjFilter = $injector.get( "cpfCnpjFilter" );
    }));
    
    it( "deve colocar a pontuação de CPF", function() {
        expect( cpfCnpjFilter( "12345678901" ) ).to.equal( "123.456.789-01" );
    });
    
    it( "deve colocar a pontuação de CNPJ", function() {
        expect( cpfCnpjFilter( "12345678901234" ) ).to.equal( "12.345.678/9012-34" );
    });
});