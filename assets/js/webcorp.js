var currentTab = 0;
showTab(currentTab); 


function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else if (n == (x.length - 1)) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    
    fixStepIndicator(n)
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        document.getElementById("regForm").submit();
        return false;
    }
    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");   
    for (i = 0; i < y.length; i++) {
      if (y[i].value == "") {
        y[i].className += " invalid";
        valid = false
      } else if (y[i].id == "name" && !validateName(y[i].value )) {
        y[i].className += " invalid";
        valid = false;
      } else if (y[i].id == "email" && !validateEmail(y[i].value )) {
        y[i].className += " invalid";
        valid = false;
      } else if(y[i].id == "cpfcnpj" && !valida_cpf_cnpj(y[i].value)){
        y[i].className += " invalid";
        valid = false;
      } else if(y[i].id == "phone" && !validaTelefone(y[i].value)){
        y[i].className += " invalid";        
        valid = false;
      } else if(y[i].id == "password" && !validatePassword(y[i].value)){
        y[i].className += " invalid";        
        valid = false;
      } else if(y[i].id == "confirmpass" && !validateRePassw(y[i].value)){
        y[i].className += " invalid";        
        valid = false;
      }
    }
    if (valid) {
      document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; 
  }

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}

//Para produção

// <<<<<<<<<<< Mascara dos Campos >>>>>>>>>>>>
function MascaraInteiro(num) {
    var er = /[^0-9]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        var texto = $(campo).val();
        $(campo).val(texto.substring(0, texto.length - 1));
        return false;
    } else {
        return true;
    }
}
function MascaraFloat(num) {
    var er = /[^0-9.,]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        var texto = $(campo).val();
        $(campo).val(texto.substring(0, texto.length - 1));
        return false;
    } else {
        return true;
    }
}
function formataCampo(campo, Mascara) {
    var er = /[^0-9/ (),.-]/;
    er.lastIndex = 0;
    
    if (er.test(campo.value)) {
        var texto = $(campo).val();
        $(campo).val(texto.substring(0, texto.length - 1));
    }
    var boleanoMascara;
    var exp = /\-|\.|\/|\(|\)| /g
    var campoSoNumeros = campo.value.toString().replace(exp, "");
    var posicaoCampo = 0;
    var NovoValorCampo = "";
    var TamanhoMascara = campoSoNumeros.length;
    for (var i = 0; i <= TamanhoMascara; i++) {
        boleanoMascara = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
        || (Mascara.charAt(i) == "/"))
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) == "(")
        || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))
        if (boleanoMascara) {
            NovoValorCampo += Mascara.charAt(i);
            TamanhoMascara++;
        } else {
            NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
            posicaoCampo++;
        }
    }
    campo.value = NovoValorCampo;
    ////LIMITAR TAMANHO DE CARACTERES NO CAMPO DE ACORDO COM A MASCARA//
    if (campo.value.length > Mascara.length) {
        var texto = $(campo).val();
        $(campo).val(texto.substring(0, texto.length - 1));
    }
    return true;
}
function MascaraGenerica(seletor, tipoMascara) {
    setTimeout(function () {
        if (tipoMascara == 'CPFCNPJ') {
            if (seletor.value.length <= 14) { //cpf
                formataCampo(seletor, '000.000.000-00');
            } else { //cnpj
                formataCampo(seletor, '00.000.000/0000-00');
            }
        } else if (tipoMascara == 'DATA') {
            formataCampo(seletor, '00/00/0000');
        } else if (tipoMascara == 'CEP') {
            formataCampo(seletor, '00000-000');
        } if (tipoMascara == 'TELEFONE') {
            if (seletor.value.length <= 14) { //FIXO
                formataCampo(seletor, '(00) 0000-0000');
            } else { //CELULAR
                formataCampo(seletor, '(00) 0-0000-0000');
            }
        } else if (tipoMascara == 'CPF') {
            formataCampo(seletor, '000.000.000-00');
        } else if (tipoMascara == 'CNPJ') {
            formataCampo(seletor, '00.000.000/0000-00');
        } else if (tipoMascara == 'MOEDA') {
            MascaraMoeda(seletor);
        }
    }, 200);
}
// <<<<<<<<<<< Fim Mascara dos Campos  >>>>>>>>>>>>

// <<<<<<<<<<< Busca CEP >>>>>>>>>>>>

function limpa_formulário_cep() {
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.        
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
    }
}

function pesquisacep(valor) {
    var valid = true;
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
    var label = document.getElementById('labelCep');
    
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('uf').value="...";
            
            //Cria um elemento javascript.
            var script = document.createElement('script');
            
            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
            
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
            label.style.color = "#607d8b";
            label.textContent = "CEP";
            
        } else {
            //cep é inválido.
            label.style.color = "#d6060b";
            label.textContent = "CEP Inválido";
            
            limpa_formulário_cep();
            valid = false;
        }
    } else {
        //cep sem valor, limpa formulário.
        label.style.color = "#d6060b";
        label.textContent = "Campo Vazio";
        limpa_formulário_cep();
        valid = false;
    }
};
// <<<<<<<<<<< Fim Busca CEP >>>>>>>>>>>>

// <<<<<<<<<<< Válida CPF e CNPJ >>>>>>>>>>>>
function verifica_cpf_cnpj ( valor ) {

    // Garante que o valor é uma string
    valor = valor.toString();
    var label = document.getElementById('labelCnpj');
    
    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');

    // Verifica CPF
    if ( valor.length === 11 ) {
        return 'CPF';
    } 
    
    // Verifica CNPJ
    else if ( valor.length === 14 ) {
        return 'CNPJ';
    } 
    
    // Não retorna nada
    else {
        label.style.color = "#d6060b";
        label.textContent = "CPF ou CNPJ Inválido";
        return false;
    }  
}
function calc_digitos_posicoes( digitos, posicoes = 10, soma_digitos = 0 ) {
    digitos = digitos.toString();
    for ( var i = 0; i < digitos.length; i++  ) {
        soma_digitos = soma_digitos + ( digitos[i] * posicoes );
        posicoes--;
        if ( posicoes < 2 ) {
            posicoes = 9;
        }
    }
    soma_digitos = soma_digitos % 11;

    if ( soma_digitos < 2 ) {
        soma_digitos = 0;
    } else {
        soma_digitos = 11 - soma_digitos;
    }
    var cpf = digitos + soma_digitos;

    // Retorna
    return cpf;
    
} 
function valida_cpf( valor ) {
    valor = valor.toString();
    valor = valor.replace(/[^0-9]/g, '');
    var label = document.getElementById('labelCnpj');

    var digitos = valor.substr(0, 9);

    var novo_cpf = calc_digitos_posicoes( digitos );

    var novo_cpf = calc_digitos_posicoes( novo_cpf, 11 );

    if ( novo_cpf === valor ) {
        label.style.color = "#607d8b";
        label.textContent = "CPF/CNPJ";        
        return true;

    } else {
        label.style.color = "#d6060b";
        label.textContent = "CPF Inválido";
        return false;
    }
    
} 
function valida_cnpj ( valor ) {

    // Garante que o valor é uma string
    valor = valor.toString();
    var label = document.getElementById('labelCnpj');
    
    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');

    
    // O valor original
    var cnpj_original = valor;

    // Captura os primeiros 12 números do CNPJ
    var primeiros_numeros_cnpj = valor.substr( 0, 12 );

    // Faz o primeiro cálculo
    var primeiro_calculo = calc_digitos_posicoes( primeiros_numeros_cnpj, 5 );

    // O segundo cálculo é a mesma coisa do primeiro, porém, começa na posição 6
    var segundo_calculo = calc_digitos_posicoes( primeiro_calculo, 6 );

    // Concatena o segundo dígito ao CNPJ
    var cnpj = segundo_calculo;

    // Verifica se o CNPJ gerado é idêntico ao enviado
    if ( cnpj === cnpj_original ) {
        label.style.color = "#607d8b";
        label.textContent = "CPF/CNPJ";
        return true;
    }
    label.style.color = "#d6060b";
    label.textContent = "CNPJ Inválido";
    return false;
    
} 
function valida_cpf_cnpj ( valor ) {

    // Verifica se é CPF ou CNPJ
    var valida = verifica_cpf_cnpj( valor );
    

    // Garante que o valor é uma string
    valor = valor.toString();
    
    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');


    // Valida CPF
    if ( valida === 'CPF' ) {
        // Retorna true para cpf válido
        return valida_cpf( valor );
    } 
    
    // Valida CNPJ
    else if ( valida === 'CNPJ' ) {
        // Retorna true para CNPJ válido
        return valida_cnpj( valor );
    } 
    
    // Não retorna nada
    else {
        return false;
    }
    
} 
function formata_cpf_cnpj( valor ) {

    // O valor formatado
    var formatado = false;
    
    // Verifica se é CPF ou CNPJ
    var valida = verifica_cpf_cnpj( valor );

    // Garante que o valor é uma string
    valor = valor.toString();
    
    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');


    // Valida CPF
    if ( valida === 'CPF' ) {
    
        // Verifica se o CPF é válido
        if ( valida_cpf( valor ) ) {
        
            // Formata o CPF ###.###.###-##
            formatado  = valor.substr( 0, 3 ) + '.';
            formatado += valor.substr( 3, 3 ) + '.';
            formatado += valor.substr( 6, 3 ) + '-';
            formatado += valor.substr( 9, 2 ) + '';
            
        }
        
    }
    
    // Valida CNPJ
    else if ( valida === 'CNPJ' ) {
    
        // Verifica se o CNPJ é válido
        if ( valida_cnpj( valor ) ) {
        
            // Formata o CNPJ ##.###.###/####-##
            formatado  = valor.substr( 0,  2 ) + '.';
            formatado += valor.substr( 2,  3 ) + '.';
            formatado += valor.substr( 5,  3 ) + '/';
            formatado += valor.substr( 8,  4 ) + '-';
            formatado += valor.substr( 12, 14 ) + '';
            
        }
        
    } 

    // Retorna o valor 
    return formatado;
    
}
// <<<<<<<<<<< Fim Válida CPF e CNPJ >>>>>>>>>>>>

function validateName(input) {
    var re = /^[A-Z]+$/i;
    var validaName = re.test(input);
    var label = document.getElementById('labelName');
    if(!validaName){
               label.style.color = "#d6060b";
               label.textContent = "Permitido apenas letras";
        return false;
    } else
    label.style.color = "#607d8b";
    label.textContent = "Nome";
    return true;
}

function validateEmail(input) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailValidado = re.test(String(input).toLowerCase());
    var label = document.getElementById('labelEmail');
    if(!emailValidado){
        label.style.color = "#d6060b";
        label.textContent = "E-mail Inválido";
        return false;
    } else 
    label.style.color = "#607d8b";
    label.textContent = "E-mail ";
    return true;

}
// <<<<<<<<<<< Válida Telefone >>>>>>>>>>>>
function validaTelefone(input) {
    var numeros = input.toString();
    
    // Remove caracteres inválidos do valor
     var telefoneNumeros = numeros.replace(/[^0-9]/g, '');
     var label = document.getElementById('labelPhone');
     if (telefoneNumeros.length < 10) {
        label.style.color = "#d6060b";
        label.textContent = "Telefone Inválido";
         return false;
    }
    label.style.color = "#607d8b";
    label.textContent = "Telefone ";
    return true;
}
// <<<<<<<<<<< Fim Válida Telefone >>>>>>>>>>>>

// <<<<<<<<<<< Válida Senha >>>>>>>>>>>>
function validatePassword(input) {
    
    var label = document.getElementById('labelCep');
    if(input.length < 8 ){
               label.style.color = "#d6060b";
               label.textContent = "Senha minimo 8 caracteres";
        return false;
    } else
    label.style.color = "#607d8b";
    label.textContent = "Senha";
    return true;
}
function validateRePassw(input) {    
    var label = document.getElementById('labelConfirmpass');
    var passw = document.getElementById('password');
    if(input === passw.value) {
        
        label.style.color = "#607d8b";
        label.textContent = "Confirmar senha";            
        return true
    } else
        label.style.color = "#d6060b";
        label.textContent = "Senhas estão diferentes";
    
    return false;
}
// <<<<<<<<<<< Fim Válida Senha >>>>>>>>>>>>