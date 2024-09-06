function exibirValidacaoCPF(input) {
    let cpf = document.getElementById('cpf-usuario');
    let cpfInserido = input.value;

    if (validarCPF(cpfInserido)) {
        console.log('É válido!');
        cpf.style.border = "2px solid #0fc71e";
    } else {
        console.log('É inválido!');
        cpf.style.border = "2px solid red";
    }
}

function validarCPF(cpf) {
    // Remove caracteres não numéricos (pontos e traços)
    cpf = cpf.replace(/[^\d]/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        console.log('CPF precisa ter 11 dígitos');
        return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
        console.log('Todos os dígitos são iguais');
        return false;
    }

    // Função para calcular o dígito verificador
    function calcularDigito(cpf, fatorInicial) {
        let soma = 0;
        for (let i = 0; i < fatorInicial - 1; i++) {
            soma += parseInt(cpf.charAt(i)) * (fatorInicial - i);
        }
        const resto = (soma * 10) % 11;
        return resto === 10 ? 0 : resto;
    }

    // Calcula o primeiro dígito verificador
    const digito1 = calcularDigito(cpf, 10);

    // Verifica se o primeiro dígito está correto
    if (digito1 !== parseInt(cpf.charAt(9))) {
        console.log('O primeiro dígito está incorreto');
        return false;
    }

    // Calcula o segundo dígito verificador
    const digito2 = calcularDigito(cpf, 11);

    // Verifica se o segundo dígito está correto
    if (digito2 !== parseInt(cpf.charAt(10))) {
        console.log('O segundo dígito está incorreto');
        return false;
    }

    return true; // CPF válido
}
