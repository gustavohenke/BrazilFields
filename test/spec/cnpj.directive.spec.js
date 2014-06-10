describe( "brCnpj Directive", function() {
	"use strict";
	
	var scope, input, ngModel;
	var expect = chai.expect;
	
	beforeEach( module( "brazilfields" ) );
	beforeEach( inject(function( $rootScope, $compile ) {
		scope = $rootScope;
		input = $compile( "<input type='text' ng-model='foo' br-cnpj>" )( scope );
		ngModel = input.controller( "ngModel" );
	}));
	
	it( "não deve validar se o valor do atributo retorna false", function() {
		input.attr( "br-cnpj", "false" );
		input.val( "20620614813" ).triggerHandler( "input" );
		scope.$apply();

		expect( ngModel.$error.cnpj ).to.be.undefined;
	});
	
	describe( "da view para o model", function() {
		it( "deve setar a validação 'cnpj' como válida quando valor é CNPJ válido", function() {
			input.val( "06439677000107" ).triggerHandler( "input" );
			scope.$apply();
			
			expect( ngModel.$error.cnpj ).to.not.be.ok;
		});
		
		it( "deve setar a validação 'cnpj' como válida quando valor é CNPJ inválido", function() {
			input.val( "06439677000117" ).triggerHandler( "input" );
			scope.$apply();
	
			expect( ngModel.$error.cnpj ).to.be.ok;
		});
	});
	
	describe( "do model para a view", function() {
		it( "deve setar a validação 'cnpj' como válida quando valor é CNPJ válido", function() {
			scope.foo = "06439677000107";
			scope.$apply();
			
			expect( ngModel.$error.cnpj ).to.not.be.ok;
		});
		
		it( "deve setar a validação 'cnpj' como válida quando valor é CNPJ inválido", function() {
			scope.foo = "06439677000117";
			scope.$apply();
	
			expect( ngModel.$error.cnpj ).to.be.ok;
		});
	});
	
});