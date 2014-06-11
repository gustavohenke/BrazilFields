describe( "brCpf Directive", function() {
	"use strict";
	
	var scope, input, ngModel;
	var expect = chai.expect;
	
	beforeEach( module( "brazilfields.cpfCnpj" ) );
	beforeEach( inject(function( $rootScope, $compile ) {
		scope = $rootScope;
		input = $compile( "<input type='text' ng-model='foo' br-cpf>" )( scope );
		ngModel = input.controller( "ngModel" );
	}));
	
	it( "não deve validar se o valor do atributo retorna false", function() {
		input.attr( "br-cpf", "false" );
		input.val( "20620614813" ).triggerHandler( "input" );
		scope.$apply();

		expect( ngModel.$error.cpf ).to.be.undefined;
	});
	
	it( "deve ignorar quando um valor vazio for passado", function() {
		input.val( "" ).triggerHandler( "input" );
		scope.$apply();
		
		expect( ngModel.$error.cpf ).to.notbe.ok;
	});
	
	describe( "da view para o model", function() {
		it( "deve setar a validação 'cpf' como válida quando valor é CPF válido", function() {
			input.val( "20620614803" ).triggerHandler( "input" );
			scope.$apply();
			
			expect( ngModel.$error.cpf ).to.not.be.ok;
		});
		
		it( "deve setar a validação 'cpf' como válida quando valor é CPF inválido", function() {
			input.val( "20620614813" ).triggerHandler( "input" );
			scope.$apply();
	
			expect( ngModel.$error.cpf ).to.be.ok;
		});
	});
	
	describe( "do model para a view", function() {
		it( "deve setar a validação 'cpf' como válida quando valor é CPF válido", function() {
			scope.foo = "20620614803";
			scope.$apply();
			
			expect( ngModel.$error.cpf ).to.not.be.ok;
		});
		
		it( "deve setar a validação 'cpf' como válida quando valor é CPF inválido", function() {
			scope.foo = "20620614813";
			scope.$apply();
	
			expect( ngModel.$error.cpf ).to.be.ok;
		});
	});
	
});