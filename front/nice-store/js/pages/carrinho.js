function renderizarCarrinho() {
    const carrinho = document.querySelector('.tabela-carrinho tbody');
    const produtos = JSON.parse(localStorage.getItem('carrinho')) || [];
    const subtotalPedidoElement = document.querySelector('.subtotal-pedido');
    const subtotalFreteElement = document.querySelector('.subtotal-frete');
    let subtotalPedido = 0;
    let subtotalFrete = 30; // Frete fixo

    carrinho.innerHTML = "";

    produtos.forEach((produto, index) => {
        const linhaItem = document.createElement('tr');

        // Número do produto
        const tdNumero = document.createElement('td');
        tdNumero.textContent = index + 1;
        linhaItem.appendChild(tdNumero);

        // Imagem do produto
        const tdImagem = document.createElement('td');
        const img = document.createElement('img');
        const imagemPrincipal = produto.imagens.find(img => img.principal);
        img.src = imagemPrincipal ? imagemPrincipal.caminho : produto.imagens[0].caminho;
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
        tdPreco.textContent = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });;
        linhaItem.appendChild(tdPreco);

        // Quantidade do produto
        const tdQuantidade = document.createElement('td');
        tdQuantidade.textContent = 1; // Quantidade inicial definida como 1
        linhaItem.appendChild(tdQuantidade);

        // Ações (botões de adicionar e diminuir quantidade)
        const tdAcoes = document.createElement('td');
        const divAcoes = document.createElement('div');
        divAcoes.classList.add('acoes-qtd-produto-carrinho');

        // Botão de diminuir quantidade
        const btnDiminuir = document.createElement('button');
        btnDiminuir.classList.add('btn-diminuir-qtd-item');
        btnDiminuir.innerHTML = "<i class='bx bx-minus'></i>";
        btnDiminuir.addEventListener('click', () => {
            const quantidadeAtual = parseInt(tdQuantidade.textContent);
            if (quantidadeAtual > 1) {
                tdQuantidade.textContent = quantidadeAtual - 1;
                atualizarSubtotalItem(tdQuantidade, tdSubtotal, produto.preco);
                atualizarSubtotalPedido();
            }
        });

        // Botão de aumentar quantidade
        const btnAdd = document.createElement('button');
        btnAdd.classList.add('btn-add-qtd-item');
        btnAdd.innerHTML = "<i class='bx bx-plus'></i>";
        btnAdd.addEventListener('click', () => {
            const quantidadeAtual = parseInt(tdQuantidade.textContent);
            if (quantidadeAtual < produto.qtdEstoque) {
                tdQuantidade.textContent = quantidadeAtual + 1;
                atualizarSubtotalItem(tdQuantidade, tdSubtotal, produto.preco);
                atualizarSubtotalPedido();
            }
        });

        divAcoes.appendChild(btnDiminuir);
        divAcoes.appendChild(btnAdd);
        tdAcoes.appendChild(divAcoes);
        linhaItem.appendChild(tdAcoes);

        // Subtotal do item
        const tdSubtotal = document.createElement('td');
        const subtotalItem = produto.preco * 1; // Quantidade inicial é 1
        tdSubtotal.textContent = subtotalItem.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        linhaItem.appendChild(tdSubtotal);

        // Atualizar subtotal do pedido
        subtotalPedido += subtotalItem;

        // Botão de remover item
        const tdRemover = document.createElement('td');
        const btnRemover = document.createElement('button');
        btnRemover.classList.add('btn-remover-item-carrinho');
        btnRemover.innerHTML = "<i class='bx bx-x'></i>";
        btnRemover.addEventListener('click', () => {
            removerItemCarrinho(produto.id);
        });
        tdRemover.appendChild(btnRemover);
        linhaItem.appendChild(tdRemover);

        carrinho.appendChild(linhaItem);
    });

    // Atualizar valores de subtotais e total
    subtotalPedidoElement.textContent = (subtotalPedido + subtotalFrete).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    subtotalFreteElement.textContent = subtotalFrete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarSubtotalItem(tdQuantidade, tdSubtotal, precoUnitario) {
    const quantidade = parseInt(tdQuantidade.textContent);
    const novoSubtotal = quantidade * precoUnitario;

    tdSubtotal.textContent = novoSubtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarSubtotalPedido() {
    const subtotalPedidoElement = document.querySelector('.subtotal-pedido');
    const subtotalFreteElement = document.querySelector('.subtotal-frete');
    const subtotais = document.querySelectorAll('.tabela-carrinho tbody tr td:nth-child(7)');
    let novoSubtotalPedido = 0;

    subtotais.forEach(subtotal => {
        novoSubtotalPedido += parseFloat(subtotal.textContent.replace('R$', '').trim());
    });

    const subtotalFrete = parseFloat(subtotalFreteElement.textContent.replace('R$', '').trim());
    subtotalPedidoElement.textContent = (novoSubtotalPedido + subtotalFrete).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function removerItemCarrinho(produtoId) {
    let produtos = JSON.parse(localStorage.getItem('carrinho')) || [];
    produtos = produtos.filter(produto => produto.id !== produtoId);
    localStorage.setItem('carrinho', JSON.stringify(produtos));
    renderizarCarrinho(); // Re-renderizar o carrinho após remoção
}

// Renderização inicial
renderizarCarrinho();