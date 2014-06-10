describe( "brStateList directive", function() {
	"use strict";
	
	var $compile, $rootElement, scope, select, brStates;
	var $ = angular.element;
	var expect = chai.expect;
	
	beforeEach( module( "brazilfields" ) );
	beforeEach( inject(function( $injector ) {
		select = $( "<select br-state-list></select>" );
		
		$compile = $injector.get( "$compile" );
		$rootElement = $injector.get( "$rootElement" );
		brStates = $injector.get( "brStates" );
		scope = $injector.get( "$rootScope" );
		
		$rootElement.append( select );
		select = $compile( select )( scope );
	}));
	
	it( "deve criar uma lista de <option> com os estados ordenados", function() {
		// Itera sobre a lista de estados e verifica se cada um está no select
		brStates.forEach(function( state, i ) {
			expect( select[ 0 ].options[ i ].value ).to.equal( state.id );
			expect( select[ 0 ].options[ i ].text ).to.equal( state.id );
		});
	});
	
	it( "deve ignorar elementos que não são <select>", function() {
		var div = $( "<div br-state-list></div>" );
		$rootElement.append( div );
		div = $compile( div )( scope );
		
		expect( div.find( "option" ) ).to.have.property( "length", 0 );
	})
});