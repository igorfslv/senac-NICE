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

            listaProdutos.push(produtoJSON);

            localStorage.setItem('carrinho', JSON.stringify(listaProdutos));

            console.log("Produto adicionado: ", produtoJSON);

            window.location.href = "./carrinho.html";
        });
});