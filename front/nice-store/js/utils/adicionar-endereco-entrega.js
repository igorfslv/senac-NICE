function preencherEnderecoDinamico(data, button) {
    // Verifica se existe um contêiner 'enderecos' pai em relação ao botão clicado
    const enderecoContainer = button.closest('.formulario-cep-entrega').nextElementSibling;

    // Verifica se o contêiner de endereço foi encontrado
    if (enderecoContainer && enderecoContainer.classList.contains('enderecos')) {
        // Preenche os campos dentro desse contêiner específico
        enderecoContainer.querySelector('.logradouro-cliente-entrega').value = data.logradouro || '';
        enderecoContainer.querySelector('.bairro-cliente-entrega').value = data.bairro || '';
        enderecoContainer.querySelector('.cidade-cliente-entrega').value = data.localidade || '';
        enderecoContainer.querySelector('.uf-cliente-entrega').value = data.uf || '';
    } else {
        console.error('Contêiner de endereço não encontrado.');
    }
}



// Função para reatribuir eventos aos botões de busca de CEP
function reatribuirEventosBuscarCep() {
    // Reatribui os eventos de clique aos botões de buscar CEP recém-adicionados
    document.querySelectorAll('.btn-buscar-cep-endereco').forEach(button => {
        button.removeEventListener('click', buscarCepEvent); // Remove para evitar múltiplos binds
        button.addEventListener('click', buscarCepEvent);
    });

}

// Função de evento para buscar o CEP e preencher os campos
function buscarCepEvent(event) {
    event.preventDefault();
    const inputCep = this.previousElementSibling;
    const cep = inputCep.value.replace(/\D/g, '');

    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    preencherEnderecoDinamico(data, this);
                } else {
                    alert('CEP não encontrado!');
                }
            })
            .catch(error => console.error('Erro ao buscar o CEP:', error));
    } else {
        alert('Por favor, insira um CEP válido!');
    }
}

// Inicializa os eventos para adicionar endereço e buscar CEP


// Atribui os eventos de clique aos botões de busca de CEP existentes ao carregar a página
reatribuirEventosBuscarCep();
