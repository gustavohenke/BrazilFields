!function( ng ) {
	"use strict";
	
	var br = ng.module( "brazilfields", [] );
	
	br.factory( "brValidate", function() {
		var brvalidate = {};
		
		// Regexes CPF
		var cpfPunctuation = /[\.\-]/g;
		var cpfPlain = /^\d{11}$/;
		
		// Regexes CNPJ
		var cnpjPunctuation = /[\.\-\/]/g;
		var cnpjPlain = /^\d{14}$/;
		
		brvalidate.cpf = function( cpf ) {
			var sumDV, modDV, valDV;
			
			// Converte pra se for passado um Number
			cpf = String( cpf ).trim();
			
			// Remove as pontuações permitidas
			cpf = cpf.replace( cpfPunctuation, "" );
			
			// Valida o CPF plano e retorna false caso não seja válido
			if ( !cpfPlain.test( cpf ) ) {
				return false;
			}
			
			// Transforma em array pra facilitar manipulação
			cpf = cpf.split( "" );
			
			// Faz a soma dos primeiros 9 dígitos com peso aplicado
			sumDV = cpf.slice( 0, 9 ).reduce(function( prev, char, i ) {
				return prev + ( 10 - i ) * +char;
			}, 0 );
			
			// Faz a divisão e guarda o resto da mesma
			modDV = sumDV % 11;
			
			// Calcula o valor que o dígito verificador deve ter
			valDV = modDV < 2 ? 0 : 11 - modDV;
			
			// Valida o valor do primeiro dígito verificador
			if ( +cpf[ 9 ] !== valDV ) {
				return false;
			}
			
			// Faz a soma dos primeiros 10 dígitos com peso aplicado
			sumDV = cpf.slice( 0, 10 ).reduce(function( prev, char, i ) {
				return prev + ( 11 - i ) * +char;
			}, 0 );
			
			// Faz a divisão e guarda o resto da mesma
			modDV = sumDV % 11;
			
			// Calcula o valor que o dígito verificador deve ter
			valDV = modDV < 2 ? 0 : 11 - modDV;
			
			// Retorna a validade do CPF.
			return +cpf[ 10 ] === valDV;
		};
		
		brvalidate.cnpj = function( cnpj ) {
			var sumDV, modDV, valDV;
			
			// Converte pra String, caso tenha sido passado um Number
			cnpj = String( cnpj ).trim();
			
			// Remove as pontuações permitidas
			cnpj = cnpj.replace( cnpjPunctuation, "" );
			
			// Valida o CNPJ plano e retorna false caso não seja válido
			if ( !cnpjPlain.test( cnpj ) ) {
				return false;
			}
			
			// Transforma em array pra facilitar manipulação
			cnpj = cnpj.split( "" );
			
			// Faz a soma dos primeiros 12 dígitos com peso aplicado
			sumDV = cnpj.slice( 0, 12 ).reduce(function( prev, char, i ) {
				var weight = i < 4 ? 5 - i : 9 - ( i - 4 );
				return prev + weight * +char;
			}, 0 );
			
			// Faz a divisão e guarda o resto da mesma
			modDV = sumDV % 11;
			
			// Calcula o valor que o dígito verificador deve ter
			valDV = modDV < 2 ? 0 : 11 - modDV;
			
			// Valida o valor do primeiro dígito verificador
			if ( +cnpj[ 12 ] !== valDV ) {
				return false;
			}
			
			// Faz a soma dos primeiros 13 dígitos com peso aplicado
			sumDV = cnpj.slice( 0, 13 ).reduce(function( prev, char, i ) {
				var weight = i < 5 ? 6 - i : 9 - ( i - 5 );
				return prev + weight * +char;
			}, 0 );
			
			// Faz a divisão e guarda o resto da mesma
			modDV = sumDV % 11;
			
			// Calcula o valor que o dígito verificador deve ter
			valDV = modDV < 2 ? 0 : 11 - modDV;
			
			// Retorna a validade do CPF.
			return +cnpj[ 13 ] === valDV;
		};
		
		return brvalidate;
	});
	
	// Dinamicamente gera as diretivas
	[ "cpf", "cnpj" ].forEach(function( type ) {
		var name = "br" + type[ 0 ].toUpperCase() + type.substr( 1 );
		
		br.directive( name, [ "brValidate", function( brValidate ) {
			var definition = {};
			
			definition.require = "?ngModel";
			definition.link = function( scope, element, attrs, ngModel ) {
				var validator = function( value ) {
					var valid;
					var mustValidate = scope.$eval( attrs[ name ] );
					
					if ( !mustValidate ) {
						return value;
					}
					
					valid = brValidate[ type ]( value );
					ngModel.$setValidity( type, valid );
					
					return valid ? value : undefined;
				};
				
				// Adiciona as funções de validação dos 2 lados
				ngModel.$parsers.push( validator );
				ngModel.$formatters.push( validator );
			};
			
			return definition;
		}]);
	});
	
}( angular );