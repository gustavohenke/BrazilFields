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