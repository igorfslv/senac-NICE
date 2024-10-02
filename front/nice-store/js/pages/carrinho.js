function renderizarCarrinho() {
    const carrinho = document.querySelector('.tabela-carrinho tbody');
    const produtos = JSON.parse(localStorage.getItem('carrinho')) || [];
    const subtotalPedidoElement = document.querySelector('.subtotal-pedido');
    const subtotalFreteElement = document.querySelector('.subtotal-frete');
    let subtotalPedido = 0;
    let subtotalFrete = 10; // Frete fixo

    carrinho.innerHTML = "";

    //Quantidade itens carrinho
    const quantidadeItens = document.getElementById('badge-carrinho')
    quantidadeItens.innerHTML = produtos.length

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
        tdPreco.textContent = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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

    
    
    const btnEntrarLogin = document.getElementById('btn-entrar-login')
    const btnInscreverLogin = document.getElementById('btn-inscrever-login')
    const btnCarrinho = document.getElementById('btn-carrinho')

    btnEntrarLogin.addEventListener('click', () => {
        window.location.href = 'login.html'; // Substitua pelo caminho da sua página
    });

    btnCarrinho.addEventListener('click', () => { 
        window.location.href = 'carrinho.html'; // Substitua pelo caminho da sua página
    });

  
    const opcaoFrete1 = document.getElementById('opcao-frete-1')
    const opcaoFrete2 = document.getElementById('opcao-frete-2')
    const opcaoFrete3 = document.getElementById('opcao-frete-3')
    opcaoFrete1.checked = true




    opcaoFrete1.addEventListener('click', () => {
        atualizarSubtotalComFrete(10)
    })

    opcaoFrete2.addEventListener('click', () => {
        atualizarSubtotalComFrete(20)
    })

    opcaoFrete3.addEventListener('click', () => {
        atualizarSubtotalComFrete(30)
    })

    const btnCalularFrete = document.getElementById('btn-calular-frete');
    btnCalularFrete.addEventListener('click', () => {
        const enderecoFrete = document.getElementById('endereco-frete')
        const freteCarrinho = document.getElementById('frete-carrinho')

        fetch(`https://viacep.com.br/ws/${freteCarrinho.value.replace("-", "").replace(".","")}/json/`)
            .then(response => response.json())
            .then(data => {
                atualizarSubtotalPedido()
                if (data.erro) {
                    enderecoFrete.innerHTML = "CEP inválido";
                } else {
                    atualizarSubtotalPedido()
                    enderecoFrete.innerHTML = `${data.logradouro} ${data.bairro}<br>${data.localidade} - ${data.uf}`;
                }
            })
            .catch(error => {
                atualizarSubtotalPedido()
                enderecoFrete.innerHTML = "CEP inválido";
            });
    })

    // Atualizar valores de subtotais e total
    subtotalPedidoElement.textContent = (subtotalPedido + subtotalFrete).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    subtotalFreteElement.textContent = subtotalFrete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarSubtotalComFrete(valor) {
    const subtotalFreteElement = document.querySelector('.subtotal-frete');
    subtotalFreteElement.innerHTML = "R$ " + valor
    atualizarSubtotalPedido()
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
        novoSubtotalPedido += parseFloat(subtotal.textContent.replace('R$', '').replace('.', '').replace(',', '.').trim());
    });

    const subtotalFrete = parseFloat(subtotalFreteElement.textContent.replace('R$', '').replace('.', '').replace(',', '.').trim());
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