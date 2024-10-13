document.querySelectorAll('.btn-buscar-cep-endereco').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o envio do formulário ao clicar no botão
        const inputCep = this.previousElementSibling; // Encontra o input de CEP correspondente
        const cep = inputCep.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número do valor do CEP
        
        if (cep.length === 8) { // Verifica se o CEP possui 8 dígitos
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        // Preenche os campos de endereço com os dados retornados pela API
                        preencherEndereco(data, inputCep.id.includes('entrega') ? 'entrega' : 'faturamento');
                    } else {
                        alert('CEP não encontrado!');
                    }
                })
                .catch(error => console.error('Erro ao buscar o CEP:', error));
        } else {
            alert('Por favor, insira um CEP válido!');
        }
    });
});

function preencherEndereco(data, tipoEndereco) {
    document.getElementById(`logradouro-cliente-${tipoEndereco}`).value = data.logradouro || '';
    document.getElementById(`bairro-cliente-${tipoEndereco}`).value = data.bairro || '';
    document.getElementById(`cidade-cliente-${tipoEndereco}`).value = data.localidade || '';
    document.getElementById(`uf-cliente-${tipoEndereco}`).value = data.uf || '';
}