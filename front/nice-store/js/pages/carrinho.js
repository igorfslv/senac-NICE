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


    const opcaoFrete1 = document.getElementById('opcao-frete-1');
    const opcaoFrete2 = document.getElementById('opcao-frete-2');
    const opcaoFrete3 = document.getElementById('opcao-frete-3');
    opcaoFrete1.checked = true;


    opcaoFrete1.addEventListener('click', () => {
        atualizarSubtotalComFrete(10);

        const lblOpcaoFreteCorreios = document.getElementById('opcao-frete-correios').textContent;
        localStorage.setItem('opcaoFreteSelecionada', JSON.stringify(lblOpcaoFreteCorreios));
        console.log(JSON.parse(localStorage.getItem('opcaoFreteSelecionada')));
    })

    opcaoFrete2.addEventListener('click', () => {
        atualizarSubtotalComFrete(20);

        const lblOpcaoFreteSedex = document.getElementById('opcao-frete-sedex').textContent;
        localStorage.setItem('opcaoFreteSelecionada', JSON.stringify(lblOpcaoFreteSedex));
        console.log(JSON.parse(localStorage.getItem('opcaoFreteSelecionada')));
    })

    opcaoFrete3.addEventListener('click', () => {
        atualizarSubtotalComFrete(30);

        const lblOpcaoFreteExpresso = document.getElementById('opcao-frete-expresso-especial').textContent;
        localStorage.setItem('opcaoFreteSelecionada', JSON.stringify(lblOpcaoFreteExpresso));
        console.log(JSON.parse(localStorage.getItem('opcaoFreteSelecionada')));
    })

    const btnCalularFrete = document.getElementById('btn-calular-frete');
    btnCalularFrete.addEventListener('click', () => {
        const enderecoFrete = document.getElementById('endereco-frete')
        const freteCarrinho = document.getElementById('frete-carrinho')

        fetch(`https://viacep.com.br/ws/${freteCarrinho.value.replace("-", "").replace(".", "")}/json/`)
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

    const btnFinalizarPedido = document.querySelector('.btn-finalizar-pedido');
    btnFinalizarPedido.addEventListener('click', () => {

        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

        if (usuarioLogado) {

            const produtos = JSON.parse(localStorage.getItem('carrinho')) || [];

            const itens = [];

            // Itera sobre as linhas da tabela
            let index = 0;
            carrinho.querySelectorAll('tr').forEach(row => {
                const cols = row.querySelectorAll('td');
                if (cols.length > 0) {
                    const item = {
                        id: produtos[index].id,
                        numero: cols[0].innerText,
                        imagem: cols[1].querySelector('img').src,
                        nome: cols[2].innerText,
                        precoUnitario: cols[3].innerText,
                        quantidade: cols[4].innerText,
                        subtotal: cols[6].innerText
                    };
                    itens.push(item);
                    index++;
                }
                
            });


            // Armazena o array de itens no localStorage
            localStorage.setItem('carrinhoFinalizado', JSON.stringify(itens));

            window.location.href = "../pages/selecao-endereco-entrega.html";
        } else {
            window.location.href = "../pages/login-cliente.html";
        }

    });
}

function atualizarSubtotalComFrete(valor) {
    //Guarda o valor do frete selecionado no localStorage
    const subtotalFreteGuardado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    localStorage.setItem('subtotalFrete', subtotalFreteGuardado);
    console.log(localStorage.getItem('subtotalFrete'));

    const subtotalFreteElement = document.querySelector('.subtotal-frete');
    subtotalFreteElement.innerHTML = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    atualizarSubtotalPedido();
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

    //Guarda o valor do pedido selecionado no localStorage
    const subtotalPedidoGuardado = (novoSubtotalPedido + subtotalFrete).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    localStorage.setItem('subtotalPedido', subtotalPedidoGuardado);
    console.log(localStorage.getItem('subtotalPedido'));
}

function removerItemCarrinho(produtoId) {
    let produtos = JSON.parse(localStorage.getItem('carrinho')) || [];
    produtos = produtos.filter(produto => produto.id !== produtoId);
    localStorage.setItem('carrinho', JSON.stringify(produtos));
    renderizarCarrinho(); // Re-renderizar o carrinho após remoção
}

function renderizarInputBuscarEndereco() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const inputFreteDiv = document.querySelector('.input-frete');
    const h3SubtituloEndereco = document.querySelector('.subtitulo-endereco');
    const enderecoFrete = document.querySelector('#endereco-frete');

    if (usuarioLogado) {
        inputFreteDiv.innerHTML = "";
        h3SubtituloEndereco.innerHTML = "";
        enderecoFrete.innerHTML = "";
    }
}

// Renderização inicial
renderizarCarrinho();
renderizarInputBuscarEndereco();