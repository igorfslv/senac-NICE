function renderizarInformacoesResumoPedido() {
    // Recupera o objeto completo do LocalStorage
    const idPedido = JSON.parse(localStorage.getItem('pedidoDetalhesID'));
    const pedido = JSON.parse(localStorage.getItem('pedidoDetalhes'));

    console.log(pedido);

    const numeroPedido = document.querySelector('#numero-pedido');
    const enderecoEntrega = document.querySelector('.endereco-entrega-selecionado p');
    const formaPagamento = document.querySelector('#metodo-pagamento-resumo');
    const opcaoFrete = document.querySelector('.opcao-frete p');
    const valorFrete = document.querySelector('.subtotal-frete');
    const valorPedido = document.querySelector('.subtotal-pedido');

    if (pedido && pedido.endereco) {
        enderecoEntrega.textContent = `${pedido.endereco.logradouro}, 
                                       ${pedido.endereco.numero} - 
                                       ${pedido.endereco.complemento || ''}, 
                                       ${pedido.endereco.bairro}, 
                                       ${pedido.endereco.cidade} - 
                                       ${pedido.endereco.uf}, CEP: 
                                       ${pedido.endereco.cep}`;
    } else {
        enderecoEntrega.textContent = "Endereço não selecionado.";
    }

    numeroPedido.textContent = "Pedido Nº " + (idPedido || 'Desconhecido');
    formaPagamento.textContent = pedido?.formaDePagamento || "Método de pagamento não informado";
    opcaoFrete.textContent = pedido?.tipoDeFrete || "Opção de frete não selecionada";

    let valorFreteCalculado = 0;
    if (pedido?.tipoDeFrete === "EXPRESSO_ESPECIAL") {
        valorFreteCalculado = 30.0;
    } else if (pedido?.tipoDeFrete === "CORREIOS") {
        valorFreteCalculado = 10.0;
    } else if (pedido?.tipoDeFrete === "SEDEX") {
        valorFreteCalculado = 20.0;
    }

    valorFrete.textContent = valorFreteCalculado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const valorTotalComFrete = (pedido?.valorTotal || 0) + valorFreteCalculado;
    valorPedido.textContent = valorTotalComFrete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderizarResumoCarrinho() {
    const carrinho = document.querySelector('.tabela-carrinho-resumo tbody');
    const pedido = JSON.parse(localStorage.getItem('pedidoDetalhes')); 
    const produtos = pedido?.itens || []; // Busca os itens do pedido

    carrinho.innerHTML = "";

    produtos.forEach((item, index) => {
        const linhaItem = document.createElement('tr');

        const tdNumero = document.createElement('td');
        tdNumero.textContent = index + 1;
        linhaItem.appendChild(tdNumero);

        const tdImagem = document.createElement('td');
        const img = document.createElement('img');
        img.src = item.produto.caminho;
        img.alt = `Imagem do Produto ${item.produto.nome}`;
        img.classList.add('img-produto-carrinho');
        tdImagem.appendChild(img);
        linhaItem.appendChild(tdImagem);


        const tdNome = document.createElement('td');
        tdNome.textContent = item.produto.nome; 
        linhaItem.appendChild(tdNome);

        const tdPreco = document.createElement('td');
        tdPreco.textContent = item.valorUnitarioPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        linhaItem.appendChild(tdPreco);

        const tdQuantidade = document.createElement('td');
        tdQuantidade.textContent = item.unidades;
        linhaItem.appendChild(tdQuantidade);

        const tdSubtotal = document.createElement('td');
        const subtotalItem = item.total; 
        tdSubtotal.textContent = subtotalItem.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        linhaItem.appendChild(tdSubtotal);

        carrinho.appendChild(linhaItem);
    });
}

renderizarInformacoesResumoPedido();
renderizarResumoCarrinho();
