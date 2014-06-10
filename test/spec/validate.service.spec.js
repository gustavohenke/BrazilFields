describe( "brValidate Service", function() {
	"use strict";
	
	var brValidate;
	var expect = chai.expect;
	
	beforeEach( module( "brazilfields" ) );
	beforeEach( inject(function( $injector ) {
		brValidate = $injector.get( "brValidate" );
	}));
	
	describe( "cpf", function() {
		// Tabela para o CPF 206.206.148-03:
		//  2 0  6  2 0  6 1  4  8     2  0  6  2 0  6 1  4  8 0
		// 10 9  8  7 6  5 4  3  2    11 10  9  8 7  6 5  4  3 2
		// -----------------------    --------------------------
		// 20 0 48 14 0 30 4 12 16    22  0 54 16 0 36 5 16 24 0
		//   144 % 11 = 1, então 0      173 % 11 = 8, 11 - 8 = 3
		
		it( "deve validar CPFs válidos", function() {
			expect( brValidate.cpf( "20620614803" ) ).to.be.ok;
		});
		
		it( "não deve validar CPFs inválidos", function() {
			expect( brValidate.cpf( "20620614813" ) ).to.not.be.ok;
		});
		
		it( "deve ignorar pontuação válida", function() {
			expect( brValidate.cpf( "206.206.148-03" ) ).to.be.ok;
			expect( brValidate.cpf( "206.206.14803" ) ).to.be.ok;
			expect( brValidate.cpf( "206206.148-03" ) ).to.be.ok;
		});
		
		it( "não deve ignorar pontuação inválida", function() {
			expect( brValidate.cpf( "206*206*148-03" ) ).to.not.be.ok;
			expect( brValidate.cpf( "206_206_148-03" ) ).to.not.be.ok;
			expect( brValidate.cpf( "206.206.148/03" ) ).to.not.be.ok;
		});
		
		it( "deve fazer trim no valor", function() {
			expect( brValidate.cpf( "  206.206.148-03	" ) ).to.be.ok;
		});
	});
	
	describe( "cnpj", function() {
		// Tabela para o CNPJ 06.439.677/0001-07:
		// 0  6  4 3  9  6  7  7 0 0 0 1    0  6  4 3  9  6  7  7 0 0 0 1 0
		// 5  4  3 2  9  8  7  6 5 4 3 2    6  5  4 3  2  9  8  7 6 5 4 3 2
		// -----------------------------    -------------------------------
		// 0 24 12 6 81 48 49 42 0 0 0 2    0 30 16 9 18 54 56 49 0 0 0 3 0
		//                  264 % 11 = 0           235 % 11 = 4, 11 - 4 = 7
		
		it( "deve validar CNPJs válidos", function() {
			expect( brValidate.cnpj( "06439677000107" ) ).to.be.ok;
		});
		
		it( "não deve validar CNPJs inválidos", function() {
			expect( brValidate.cnpj( "06439677000117" ) ).to.not.be.ok;
		});
		
		it( "deve ignorar pontuação válida", function() {
			expect( brValidate.cnpj( "06.439.677/0001-07" ) ).to.be.ok;
			expect( brValidate.cnpj( "06.4396770001-07" ) ).to.be.ok;
			expect( brValidate.cnpj( "06439.677/000107" ) ).to.be.ok;
		});
		
		it( "não deve ignorar pontuação inválida", function() {
			expect( brValidate.cnpj( "06*439.677/0001-07" ) ).to.not.be.ok;
			expect( brValidate.cnpj( "06.439_677/0001_07" ) ).to.not.be.ok;
		});
		
		it( "deve fazer trim no valor", function() {
			expect( brValidate.cnpj( "  06.439.677/0001-07	" ) ).to.be.ok;
			expect( brValidate.cnpj( "  06439677000107	" ) ).to.be.ok;
		});
	});
	
	describe( "state", function() {
		it( "deve validar estado pelo ID (sigla) ou nome", function() {
			// Existentes
			expect( brValidate.state( "AC" ) ).to.be.ok;
			expect( brValidate.state( "Paraná" ) ).to.be.ok;
			
			// Inexistentes
			expect( brValidate.state( "Inexistente" ) ).to.not.be.ok;
			expect( brValidate.state( "XX" ) ).to.not.be.ok;
		});
		
		it( "deve ignorar acentuação ou case", function() {
			expect( brValidate.state( "rs" ) ).to.be.ok;
			expect( brValidate.state( "SAo PAulO" ) ).to.be.ok;
		});
	});
});