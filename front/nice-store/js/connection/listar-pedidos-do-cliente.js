const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));



fetch(`http://localhost:8080/pedido/de/${usuarioLogado.id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(result => {
        const tbody = document.getElementById("corpo-lista-pedidos-cliente");

        tbody.innerHTML = "";

        result.forEach(pedido => {
        
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            idCell.textContent = pedido.id;
            
            const dataCell = document.createElement("td");
            const data = new Date(pedido.data);
            dataCell.textContent = data.toLocaleDateString("pt-BR");
            
            const valorTotalCell = document.createElement("td");
            valorTotalCell.textContent = pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            
            const statusCell = document.createElement("td");
            statusCell.className = "status-pedido";
            statusCell.textContent = pedido.statusDeEntrega;
            
            const detalhesCell = document.createElement("td");
            detalhesCell.className = "detalhes-pedido-cliente";
            const detalheIcon = document.createElement("i");
            detalheIcon.className = "bx bx-detail";
            detalheIcon.title = "Ver detalhes do pedido";
            detalhesCell.appendChild(detalheIcon);

            detalhesCell.addEventListener('click', () => {
                console.log(pedido.id)

                fetch(`http://localhost:8080/pedido/detalhes/${pedido.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(result => {
                        console.log(result)
                        window.location.href = `/front/nice-store/pages/detalhes-pedido-realizado.html?id=${pedido.id}`;
                    })


            })

            row.appendChild(idCell);
            row.appendChild(dataCell);
            row.appendChild(valorTotalCell);
            row.appendChild(statusCell);
            row.appendChild(detalhesCell);

            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Erro:', error);
    });


    console.log()