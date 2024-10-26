const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
localStorage.removeItem('enderecoEntregaSelecionado');

fetch(`http://localhost:8080/cliente/${usuarioLogado.id}`)
    .then(response => response.json())
    .then(result => {
        const tabelaEnderecosEntrega = document.querySelector('.corpo-tabela-enderecos-entrega');

        result.enderecosDeEntrega.forEach((entrega, index) => {
            tabelaEnderecosEntrega.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${entrega.cep}</td>
                    <td>${entrega.logradouro}</td>
                    <td>${entrega.numero}</td>
                    <td>${entrega.complemento}</td>
                    <td>${entrega.bairro}</td>
                    <td>${entrega.cidade}</td>
                    <td>${entrega.uf}</td>
                    <td>
                        <input type="radio" name="endereco" class="input-selecao-endereco" value="${index}" />
                    </td>
                </tr>
            `;
        });

        // Função para salvar o endereço selecionado no LocalStorage
        const radioButtons = document.querySelectorAll('.input-selecao-endereco');
        radioButtons.forEach((radio, index) => {
            radio.addEventListener('change', () => {
                const enderecoEntregaSelecionado = result.enderecosDeEntrega[index];
                localStorage.setItem('enderecoEntregaSelecionado', JSON.stringify(enderecoEntregaSelecionado));
                console.log(JSON.parse(localStorage.getItem('enderecoEntregaSelecionado')));
            });
        });
    });

const btnVoltarCarrinho = document.querySelector('.btn-voltar-carrinho');
btnVoltarCarrinho.addEventListener('click', () => {
    window.location.href = "/front/nice-store/pages/carrinho.html";
});

const btnSelecionarFormaPagamento = document.querySelector('.btn-selecionar-forma-pagamento');
btnSelecionarFormaPagamento.addEventListener('click', () => {
    const enderecoSelecionado = localStorage.getItem('enderecoEntregaSelecionado');
    
    if (enderecoSelecionado) {
        window.location.href = "/front/nice-store/pages/selecao-forma-pagamento.html";
    } else {
        alert('Por favor, selecione um endereço de entrega antes de prosseguir.');
    }
});