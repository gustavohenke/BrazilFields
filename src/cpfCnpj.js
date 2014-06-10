!function( ng ) {
	"use strict";
	
	var module = ng.module( "brazilfields.cpfCnpj", [
		"brazilfields.utils"
	]);
	
	// Dinamicamente gera as diretivas
	[ "cpf", "cnpj" ].forEach(function( type ) {
		var name = "br" + type[ 0 ].toUpperCase() + type.substr( 1 );
		
		module.directive( name, [ "brValidate", function( brValidate ) {
			var definition = {};
			
			definition.require = "?ngModel";
			definition.link = function( scope, element, attrs, ngModel ) {
				var validator = function( value ) {
					var valid;
					var attr = element.attr( attrs.$attr[ name ] );
					
					// Deve validar quando o atributo não tem valor ou o seu valor (como uma
					// expressão do Angular) retorna um valor truthy
					var mustValidate = ( attr || "" ).trim() ? scope.$eval( attr ) : true;
					
					if ( !mustValidate ) {
						// Remove a chave de validação atual, se não é pra validar
						delete ngModel.$error[ type ];
						return value;
					}
					
					valid = brValidate[ type ]( value );
					ngModel.$setValidity( type, valid );
					
					return valid ? value : undefined;
				};
				
				// Sem ng-model, não faz nada.
				if ( !ngModel ) {
					return;
				}
				
				// Adiciona as funções de validação dos 2 lados
				ngModel.$parsers.push( validator );
				ngModel.$formatters.push( validator );
			};
			
			return definition;
		}]);
	});
	
}( angular );