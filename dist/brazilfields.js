/*!
 * brazilfields v0.1.1
 * Conjunto de utilidades Angular.js para documentos brasileiros.
 *
 * https://github.com/gustavohenke/BrazilFields
 */
!function( ng ) {
    "use strict";

    var br = ng.module( "brazilfields", [
        "brazilfields.utils",
        "brazilfields.cpfCnpj",
        "brazilfields.states",
        "brazilfields.cpfCnpjFormat"
    ]);

}( angular );
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

            definition.priority = 500;
            definition.require = "ngModel";
            definition.link = function( scope, element, attrs, ngModel ) {
                var validator = function( value ) {
                    var valid;
                    var attr = element.attr( attrs.$attr[ name ] );

                    // Deve validar quando o atributo não tem valor ou o seu valor (como uma
                    // expressão do Angular) retorna um valor truthy
                    // Também é levado em conta se há um valor na directive ngModel
                    var mustValidate = ( attr || "" ).trim() ? !!scope.$eval( attr ) : true;
                    mustValidate &= !!( value || "" ).trim();

                    if ( mustValidate ) {
                        // Roda o algoritmo de validação
                        valid = brValidate[ type ]( value );
                    } else {
                        // Se não é pra validar, seta como válido apenas.
                        valid = true;
                    }

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
!function( ng ) {
    "use strict";

    var module = ng.module( "brazilfields.cpfCnpjFormat", [
        "brazilfields.utils"
    ]);

    module.filter( "cpfCnpj", function() {

        var insertChar = function( input, conteudo, localizacao ) {
            if ( input.length > localizacao ) {
                input = input.slice( 0, localizacao ) + conteudo + input.slice( localizacao );
            }
            return input;
        };
    	
        return function( cpfCnpj ) {
            var CPF_SIZE = 11;
            cpfCnpj = cpfCnpj.replace( /\D/g, '' );

            if ( cpfCnpj.length > CPF_SIZE ) {
                cpfCnpj = insertChar( cpfCnpj.toString(), '.', 2 );
                cpfCnpj = insertChar( cpfCnpj.toString(), '.', 6 );
                cpfCnpj = insertChar( cpfCnpj.toString(), '/', 10 );
                cpfCnpj = insertChar( cpfCnpj.toString(), '-', 15 );
            } else {
                cpfCnpj = insertChar( cpfCnpj.toString(), '.', 3 );
                cpfCnpj = insertChar( cpfCnpj.toString(), '.', 7 );
                cpfCnpj = insertChar( cpfCnpj.toString(), '-', 11 );
            }

            return cpfCnpj;
        };
    });
}( angular );
!function( ng ) {
    "use strict";

    var module = ng.module( "brazilfields.states", [
        "brazilfields.utils"
    ]);

    module.directive( "brStateList", [ "brStates", function( brStates ) {
        // Callback de ordenação de estados
        // Usa sempre a propriedade 'id' de um estado para ordenar
        var sortStatesCb = function( a, b ) {
            return a.id.localeCompare( b.id );
        };

        return function( scope, element, attr ) {
            var selects = element.parent().find( "select" );
            var isSelect = [].some.call( selects, function( elem ) {
                return elem === element[ 0 ];
            });

            // Ignora se não é um <select>
            if ( !isSelect ) {
                return;
            }

            // Ordena os estados e cria os options, por enquanto usando o id como valor e label
            brStates.sort( sortStatesCb ).forEach(function( state ) {
                var option = document.createElement( "option" );
                option.value = state.id;
                option.text = state.id;

                element.append( option );
            });
        };
    }]);

}( angular );
!function( ng ) {
    "use strict";

    var module = ng.module( "brazilfields.utils", [] );

    module.constant( "brStates", [{
        id: "AC",
        name: "Acre",
        capital: "Rio Branco",
        region: "N"
    }, {
        id: "AL",
        name: "Alagoas",
        capital: "Maceió",
        region: "NE"
    }, {
        id: "AM",
        name: "Amazonas",
        capital: "Manaus",
        region: "N"
    }, {
        id: "AP",
        name: "Amapá",
        capital: "Macapá",
        region: "N"
    }, {
        id: "BA",
        name: "Bahia",
        capital: "Salvador",
        region: "NE"
    }, {
        id: "CE",
        name: "Ceará",
        capital: "Fortaleza",
        region: "NE"
    }, {
        id: "DF",
        name: "Distrito Federal",
        capital: "Brasília",
        region: "CO"
    }, {
        id: "ES",
        name: "Espírito Santo",
        capital: "Vitória",
        region: "SE"
    }, {
        id: "GO",
        name: "Goiás",
        capital: "Goiânia",
        region: "CO"
    }, {
        id: "MA",
        name: "Maranhão",
        capital: "São Luís",
        region: "NE"
    }, {
        id: "MG",
        name: "Minas Gerais",
        capital: "Belo Horizonte",
        region: "SE"
    }, {
        id: "MS",
        name: "Mato Grosso do Sul",
        capital: "Campo Grande",
        region: "CO"
    }, {
        id: "MT",
        name: "Mato Grosso",
        capital: "Cuiabá",
        region: "CO"
    }, {
        id: "PA",
        name: "Pará",
        capital: "Belém",
        region: "N"
    }, {
        id: "PB",
        name: "Paraíba",
        capital: "João Pessoa",
        region: "NE"
    }, {
        id: "PE",
        name: "Pernambuco",
        capital: "Recife",
        region: "NE"
    }, {
        id: "PI",
        name: "Piauí",
        capital: "Teresina",
        region: "NE"
    }, {
        id: "PR",
        name: "Paraná",
        capital: "Curitiba",
        region: "S"
    }, {
        id: "RJ",
        name: "Rio de Janeiro",
        capital: "Rio de Janeiro",
        region: "SE"
    }, {
        id: "RN",
        name: "Rio Grande do Norte",
        capital: "Natal",
        region: "NE"
    }, {
        id: "RO",
        name: "Rondônia",
        capital: "Porto Velho",
        region: "N"
    }, {
        id: "RR",
        name: "Roraima",
        capital: "Boa Vista",
        region: "N"
    }, {
        id: "RS",
        name: "Rio Grande do Sul",
        capital: "Porto Alegre",
        region: "S"
    }, {
        id: "SC",
        name: "Santa Catarina",
        capital: "Florianópolis",
        region: "S"
    }, {
        id: "SE",
        name: "Sergipe",
        capital: "Aracaju",
        region: "NE"
    }, {
        id: "SP",
        name: "São Paulo",
        capital: "São Paulo",
        region: "SE"
    }, {
        id: "TO",
        name: "Tocantins",
        capital: "Palmas",
        region: "N"
    }]);

    module.factory( "brValidate", [ "brStates", function( brStates ) {
        var brvalidate = {};

        // Regexes CPF
        var cpfPunctuation = /[\.\-]/g;
        var cpfPlain = /^\d{11}$/;

        // Regexes CNPJ
        var cnpjPunctuation = /[\.\-\/]/g;
        var cnpjPlain = /^\d{14}$/;

        // Remoção de acentuação
        var removeAccents = function( str ) {
            if ( typeof str !== "string" ) {
                return str;
            }

            return removeAccents.replaces.reduce(function( prev, tuple ) {
                return prev.replace( tuple[ 0 ], tuple[ 1 ] );
            }, str );
        };
        removeAccents.replaces = [
            [ /[\300-\306]/g, "A" ],
            [ /[\340-\346]/g, "a" ],
            [ /[\310-\313]/g, "E" ],
            [ /[\350-\353]/g, "e" ],
            [ /[\314-\317]/g, "I" ],
            [ /[\354-\357]/g, "i" ],
            [ /[\322-\330]/g, "O" ],
            [ /[\362-\370]/g, "o" ],
            [ /[\331-\334]/g, "U" ],
            [ /[\371-\374]/g, "u" ],
            [ /[\321]/g, "N" ],
            [ /[\361]/g, "n" ],
            [ /[\307]/g, "C" ],
            [ /[\347]/g, "c" ]
        ];

        // -----------------------------------------------------------------------------------------

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

        brvalidate.state = function( val ) {
            val = removeAccents( val ).toUpperCase();

            return brStates.some(function( state ) {
                var name = removeAccents( state.name ).toUpperCase();
                return state.id === val || name === val;
            });
        };

        return brvalidate;
    }]);

}( angular );