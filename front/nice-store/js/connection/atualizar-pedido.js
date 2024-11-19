const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

console.log(id);

const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

fetch('http://localhost:8080/pedido/detalhes/' + id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(dados => {
        // Atualizando o valor total
        const valorTotalElement = document.getElementById("preco")
        valorTotalElement.textContent = `R$ ${dados.valorTotal.toFixed(2).replace('.', ',')}`;

        const dataElement = document.getElementById("data") 
        const dataFormatada = new Date(dados.data).toLocaleDateString('pt-BR');  // Converte a data para o formato brasileiro
        dataElement.textContent = dataFormatada;

        const idElement = document.getElementById("id")
        idElement.textContent = dados.id

        const selectStatus = document.getElementById('status-pedido-editar');
        const statusMap = {
            'AGUARDANDO_PAGAMENTO': '1',
            'PAGAMENTO_REJEITADO': '2',
            'PAGAMENTO_COM_SUCESSO': '3',
            'AGUARDANDO_RETIRADA': '4',
            'EM_TRÂNSITO': '5',
            'ENTREGUE': '6'
        };

        selectStatus.value = statusMap[dados.statusDeEntrega] || '1';
    })
    .catch(error => {
        console.error('Erro ao carregar os detalhes do pedido:', error);
    });


const botaoSalvar = document.getElementById("btn-salvar-status")
botaoSalvar.addEventListener("click", () => {

    const selectStatus = document.getElementById('status-pedido-editar');
    const statusSelecionado = selectStatus.options[selectStatus.selectedIndex].text;
    const statusMap = {
        'AGUARDANDO PAGAMENTO': 'AGUARDANDO_PAGAMENTO',
        'PAGAMENTO REJEITADO': 'PAGAMENTO_REJEITADO',
        'PAGAMENTO COM SUCESSO': 'PAGAMENTO_COM_SUCESSO',
        'AGUARDANDO RETIRADA': 'AGUARDANDO_RETIRADA',
        'EM TRÂNSITO': 'EM_TRANSITO',
        'ENTREGUE': 'ENTREGUE'
    };

    data = {
        "idPedido": id,
        "statusDeEntrega": statusMap[statusSelecionado]
    }

    fetch('http://localhost:8080/estoquista/pedido/alterarStatus/' + usuarioLogado.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert("Pedido " + result.id + " teve o status alterado para " + result.statusDeEntrega)
    })
    .catch(error => {
        alert('Erro ao alterar o status do pedido');
    });


})

