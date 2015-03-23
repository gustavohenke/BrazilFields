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