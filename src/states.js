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