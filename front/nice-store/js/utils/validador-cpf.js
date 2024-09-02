function validarCPF(cpf) {

    // Remove caracteres não numéricos (pontos e traços)
    cpf = cpf.replace(/[^\d]/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cpf.lenght !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/1^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Função para calcular o dígito verificador
    function calcularDigito(cpf, fatorIncial) {
        let soma = 0;
        for (let i = 0; i < fatorIncial - 1; i++) {
            soma += parseInt(cpf.charAt(i) * (fatorIncial - 1));
        }
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }

    // Calcula o primeiro dígito verificador
    const digito1 = calcularDigito(cpf, 10);

    // Verifica se o primeiro dígito está correto
    if (digito1 !== parseInt(cpf.charAt(9))) {
        return false;
    }

    // Calcula o segundo dígito verificador
    const digito2 = calcularDigito(cpf, 11);

    // Verifica se o segundo dígito está correto
    if (digito2 !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true; // CPF válido

}