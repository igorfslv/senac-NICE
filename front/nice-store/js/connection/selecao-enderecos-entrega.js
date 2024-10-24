const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

fetch(`http://localhost:8080/cliente/${usuarioLogado.id}`)
    .then(response => response.json())
    .then(result => {
        result.enderecosDeEntrega.forEach((entrega, index) => {

            const tabelaEnderecosEntrega = document.querySelector('.corpo-tabela-enderecos-entrega');

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
                        <input type="radio" name="endereco" class="input-selecao-endereco" value="${index + 1}" />
                    </td>
                </tr>

            `;

        });
    });

const btnVoltarCarrinho = document.querySelector('.btn-voltar-carrinho');
btnVoltarCarrinho.addEventListener('click', () => {
    window.location.href = "/front/nice-store/pages/carrinho.html";
});

const btnSelecionarFormaPagamento = document.querySelector('.btn-selecionar-forma-pagamento');
btnSelecionarFormaPagamento.addEventListener('click', () => {
    window.location.href = "#";
});