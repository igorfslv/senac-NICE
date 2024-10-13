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

function adicionarEnderecoEntrega() {
    const enderecosEntregaContainer = document.querySelector('.enderecos-entrega-container');

    const novoEnderecoHTML = `
        <div class="separador"></div>
        <section class="formulario-cep-entrega">
            <label for="cep-cliente-entrega">CEP</label>
            <span>
                <input type="text" name="cep-cliente-entrega" placeholder="00000-000" required>
                <button class="btn-buscar-cep-endereco">Buscar CEP</button>
            </span>
        </section>
        <div class="enderecos">
            <div>
                <div>
                    <label for="logradouro-cliente-entrega">Logradouro</label>
                    <input type="text" name="logradouro-cliente-entrega" class="logradouro-cliente-entrega" placeholder="Ex.: Rua das Camélias" required>
                </div>
                <div>
                    <label for="numero-cliente-entrega">Número</label>
                    <input type="text" name="numero-cliente-entrega" class="numero-cliente-entrega" required>
                </div>
            </div>
            <div>
                <div>
                    <label for="complemento-cliente-entrega">Complemento</label>
                    <input type="text" name="complemento-cliente-entrega" class="complemento-cliente-entrega" required>
                </div>
                <div>
                    <label for="bairro-cliente-entrega">Bairro</label>
                    <input type="text" name="bairro-cliente-entrega" class="bairro-cliente-entrega" required>
                </div>
            </div>
            <div>
                <div>
                    <label for="cidade-cliente-entrega">Cidade</label>
                    <input type="text" name="cidade-cliente-entrega" class="cidade-cliente-entrega" required>
                </div>
                <div>
                    <label for="uf-cliente-entrega">UF</label>
                    <input type="text" name="uf-cliente-entrega" class="uf-cliente-entrega" required>
                </div>
            </div>
            <div class="endereco-padrao-container">
                <input type="radio" name="endereco-padrao">
                <label>Endereço Padrão</label>
            </div>
        </div>
    `;

    enderecosEntregaContainer.innerHTML += novoEnderecoHTML;

    // Reatribui os eventos de clique aos botões de buscar CEP recém-adicionados
    reatribuirEventosBuscarCep();
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
document.querySelector('.btn-add-endereco-entrega').addEventListener('click', function (e) {
    e.preventDefault();
    adicionarEnderecoEntrega();
});

// Atribui os eventos de clique aos botões de busca de CEP existentes ao carregar a página
reatribuirEventosBuscarCep();
