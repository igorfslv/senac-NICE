function renderizarInformacoesResumoPedido() {
    // Recupera os valores do LocalStorage
    const enderecoEntregaSelecionado = JSON.parse(localStorage.getItem('enderecoEntregaSelecionado'));
    const formaPagamentoSelecionada = localStorage.getItem('metodoPagamento')?.replace(/^"|"$/g, '');
    const opcaoFreteSelecionada = localStorage.getItem('opcaoFreteSelecionada')?.replace(/^"|"$/g, '');
    const valorSubtotalFrete = localStorage.getItem('subtotalFrete')?.replace(/^"|"$/g, '');
    const valorSubtotalPedido = localStorage.getItem('subtotalPedido')?.replace(/^"|"$/g, '');

    const enderecoEntrega = document.querySelector('.endereco-entrega-selecionado p');
    const formaPagamento = document.querySelector('#metodo-pagamento-resumo');
    const opcaoFrete = document.querySelector('.opcao-frete p');
    const valorFrete = document.querySelector('.subtotal-frete');
    const valorPedido = document.querySelector('.subtotal-pedido');

    if (enderecoEntregaSelecionado) {
        enderecoEntrega.textContent = `${enderecoEntregaSelecionado.logradouro}, 
                                       ${enderecoEntregaSelecionado.numero} - 
                                       ${enderecoEntregaSelecionado.complemento || ''}, 
                                       ${enderecoEntregaSelecionado.bairro}, 
                                       ${enderecoEntregaSelecionado.cidade} - 
                                       ${enderecoEntregaSelecionado.uf}, CEP: 
                                       ${enderecoEntregaSelecionado.cep}`;
    } else {
        enderecoEntrega.textContent = "Endereço não selecionado.";
    }

    formaPagamento.textContent = formaPagamentoSelecionada;
    opcaoFrete.textContent = opcaoFreteSelecionada;
    valorFrete.textContent = valorSubtotalFrete;
    valorPedido.textContent = valorSubtotalPedido;
}

function renderizarResumoCarrinho() {
    const carrinho = document.querySelector('.tabela-carrinho-resumo tbody');
    const produtos = JSON.parse(localStorage.getItem('carrinhoFinalizado')) || []; // Aqui você busca pelo 'carrinho'

    carrinho.innerHTML = "";

    // Atualiza a quantidade de itens no carrinho
    const quantidadeItens = document.getElementById('badge-carrinho');
    quantidadeItens.innerHTML = produtos.length;

    produtos.forEach((produto, index) => {
        const linhaItem = document.createElement('tr');

        // Número do produto
        const tdNumero = document.createElement('td');
        tdNumero.textContent = index + 1;
        linhaItem.appendChild(tdNumero);

        // Imagem do produto
        const tdImagem = document.createElement('td');
        const img = document.createElement('img');
        img.src = produto.imagem; // Modificado para usar a estrutura do carrinho
        img.alt = `Imagem do Produto ${produto.nome}`;
        img.classList.add('img-produto-carrinho');
        tdImagem.appendChild(img);
        linhaItem.appendChild(tdImagem);

        // Nome do produto
        const tdNome = document.createElement('td');
        tdNome.textContent = produto.nome;
        linhaItem.appendChild(tdNome);

        // Preço unitário do produto
        const tdPreco = document.createElement('td');
        tdPreco.textContent = produto.precoUnitario; // Modificado para usar a estrutura do carrinho
        linhaItem.appendChild(tdPreco);

        // Quantidade do produto
        const tdQuantidade = document.createElement('td');
        tdQuantidade.textContent = produto.quantidade; // Modificado para usar a quantidade real do carrinho
        linhaItem.appendChild(tdQuantidade);

        // Subtotal do item
        const tdSubtotal = document.createElement('td');
        const subtotalItem = produto.subtotal; // Cálculo do subtotal
        tdSubtotal.textContent = subtotalItem.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        linhaItem.appendChild(tdSubtotal);

        carrinho.appendChild(linhaItem);
    });
}

renderizarInformacoesResumoPedido();
renderizarResumoCarrinho();
