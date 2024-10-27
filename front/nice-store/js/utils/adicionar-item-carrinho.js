const addCarrinho = document.querySelector('.btn-add-carrinho');

addCarrinho.addEventListener('click', () => {
    const url = `http://localhost:8080/produto/${id}`;

    fetch(url)
        .then(response => response.json())
        .then(result => {
            const produtoJSON = result;
            console.log(produtoJSON);

            let produtosSalvosCarrinho = localStorage.getItem('carrinho');
            let listaProdutos = produtosSalvosCarrinho ? JSON.parse(produtosSalvosCarrinho) : [];

            // Verifica se o produto já está no carrinho
            const produtoExistente = listaProdutos.find(produto => produto.id === produtoJSON.id);

            if (!produtoExistente) {
                listaProdutos.push(produtoJSON);
                alert("Produto " + result.nome + " foi adicionado ao carrinho!")
            } else {
                alert("Produto " + result.nome + " já está no carrinho!")
            }

            localStorage.setItem('carrinho', JSON.stringify(listaProdutos));

            console.log("Produto adicionado ou atualizado no carrinho: ", produtoJSON);


            window.location.href = "./carrinho.html";
        });
});