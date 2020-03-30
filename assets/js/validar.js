
const  retornarMensagemDeErro = (tipo, validity) => {
    let mensagemDeErro = "";
    const tiposDeErro = ["valueMissing", "typeMismatch", "tooShort"];

    const mensagensDeErro = {
        name: {
            valueMissing: "O nome é necessario",

        },
        email: {
            valueMissing: "O e-mail é necessario",
            typeMismatch:  "Este não é um e-mail válido"

        },        
        cpfcnpj: {
            valueMissing: "O CPF ou CNPJ é necessario",
            customError:  "CPF ou CNPJ invalido"

        },
        phone: {
            valueMissing: "O Telefone é necessario",
            tooShort:  "A senha deve ter no minimo 8 caracteres"

        },
    };
    tiposDeErro.forEach(erro => {
        if (validity[erro]) {
            mensagemDeErro = mensagensDeErro[tipo][erro];
        }
    });

    return mensagemDeErro;

}

export const validarInput = (input, adicionarErro = true) => {
    
    const classeElementoErro = "erro-validacao";
    const classeInputErro = "possui-erro-validacao";
    const elementoPai = input.parentNode;
    const elementoErroExiste = elementoPai.querySelector(
        `.${classeElementoErro}`
    );
    const elementoErro = elementoErroExiste || document.querySelector('label');
    const elementoEhValido = input.validity.valid;
    const tipo = input.dataset.tipo;
    const validadoresEspecificos = {

    };

    if (validadoresEspecificos[tipo]) {
        validadoresEspecificos[tipo](input);
    }

    if(!elementoEhValido){
        elementoErro.className = classeElementoErro;
        elementoErro.textContent = retornarMensagemDeErro(input.dataset.tipo, input.validity);
        if(adicionarErro) {
            input.after(elementoErro);
            input.classList.add(classeInputErro);

        }
        

    } else {
        elementoErro.remove();
        input.classList.remove(classeInputErro);

    }

};