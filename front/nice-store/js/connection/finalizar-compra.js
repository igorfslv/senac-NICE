const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");

btnFinalizarCompra,addEventListener("click", (event) => {

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
    console.log(enderecoEntregaSelecionado)


    const carrinho = document.querySelector('.tabela-carrinho-resumo tbody');
    const produtos = JSON.parse(localStorage.getItem('carrinhoFinalizado')) || [];

    console.log(produtos)

})