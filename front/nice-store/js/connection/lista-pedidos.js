const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

console.log("aa")

let currentPage = 0;

function fetchPedidos(page) {
    fetch(`http://localhost:8080/estoquista/pedidos/${usuarioLogado.id}/${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            const tbody = document.querySelector('tbody');
            tbody.innerHTML = '';

            result.content.forEach((pedido, index) => {
                const dataFormatada = new Date(pedido.data).toLocaleDateString('pt-BR');
                const valorFormatado = pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                const row = `
                <tr>
                    <td>${pedido.id}</td>
                    <td>${dataFormatada}</td>
                    <td>${valorFormatado}</td>
                    <td class="status-pedido">${pedido.statusDeEntrega.replace(/_/g, ' ')}</td>
                    <td class="icone-editar">
                        <i class='bx bxs-edit' onclick="window.location.href='/front/nice-store/pages/atualizacao-status-pedido.html?id=${pedido.id}'"></i>
                    </td>
                </tr>
                `;
                tbody.insertAdjacentHTML('beforeend', row);
            });

            document.getElementById('prevPage').disabled = result.first;
            document.getElementById('nextPage').disabled = result.last;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function nextPage() {
    currentPage++;
    fetchPedidos(currentPage);
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        fetchPedidos(currentPage);
    }
}

fetchPedidos(currentPage);
