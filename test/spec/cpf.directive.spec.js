describe( "brCpf Directive", function() {
    "use strict";

    var scope, $compile, input, ngModel;
    var $ = angular.element;
    var expect = chai.expect;

    beforeEach( module( "brazilfields.cpfCnpj" ) );
    beforeEach( inject(function( $injector, $rootScope ) {
        scope = $rootScope;
        $compile = $injector.get( "$compile" );

        input = $compile( "<input type='text' ng-model='foo' br-cpf>" )( scope );
        ngModel = input.controller( "ngModel" );
    }));

    it( "deve validar se o valor do atributo retorna true", function() {
        input.attr( "br-cpf", "true" );
        input.val( "___.___.___-__" ).triggerHandler( "input" );
        scope.$apply();

        expect( ngModel.$error.cpf ).to.be.ok;
    });

    it( "não deve validar se o valor do atributo retorna false", function() {
        input.attr( "br-cpf", "false" );
        input.val( "20620614813" ).triggerHandler( "input" );
        scope.$apply();

        expect( ngModel.$error.cpf ).to.not.be.ok;
    });

    it( "deve ignorar quando um valor vazio for passado", function() {
        input.val( "" ).triggerHandler( "input" );
        scope.$apply();

        expect( ngModel.$error.cpf ).to.not.be.ok;
    });

    it( "#1 - deve validar corretamente junto com ui-mask", function() {
        var ngModel;
        var masked = $( "<input type='text' ng-model='foo' br-cpf>" );
        masked = $compile( masked.attr( "ui-mask", "999.999.999-99" ) )( scope );

        ngModel = masked.controller( "ngModel" );

        // Válido
        masked.val( "20620614803" ).triggerHandler( "input" );
        scope.$apply();

        expect( ngModel.$error.cpf ).to.not.be.ok;

        // Inválido
        masked.val( "20620614813" ).triggerHandler( "input" );
        scope.$apply();

        expect( ngModel.$error.cpf ).to.be.ok;
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