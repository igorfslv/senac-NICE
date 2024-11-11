const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");

btnFinalizarCompra.addEventListener("click", (event) => {

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
   // console.log(enderecoEntregaSelecionado)


    const carrinho = document.querySelector('.tabela-carrinho-resumo tbody');
    const produtos = JSON.parse(localStorage.getItem('carrinhoFinalizado')) || [];


    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const produtosTransformados = produtos.map(produto => ({
        idProduto: produto.id,
        unidades: parseInt(produto.quantidade, 10)
    }));

    data = {
        idCliente: usuarioLogado.id,
        idEndereco: enderecoEntregaSelecionado.id,
        tipoDeFrete: opcaoFrete.textContent.toUpperCase().replace(/\s+/g, "_"),
        formaDePagamento: formaPagamento.textContent.toUpperCase() .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_"),
        statusDeEntrega: "AGUARDANDO_PAGAMENTO",
        // valorTotal: valorPedido.textContent.replace(/R\$\s*/g, "").replace(/./g, "").replace(/,/g, "."),
        valorTotal: parseFloat(valorPedido.textContent.replace("R$", "").replace(/\./g, "").replace(",", ".")),
        itens: produtosTransformados
    }

    console.log(data)


    fetch(`http://localhost:8080/pedido/finalizar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            alert("Pedido realizado")
        })
        .catch(error => {
            const erro = JSON.stringify(error)
            console.error('Erro:', error);
        });






})