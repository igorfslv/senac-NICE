window.onload = async function () {
    buscarProdutos(0, ""); // Passa parâmetros corretos
    const btnEntrarLogin = document.getElementById('btn-entrar-login')
    const btnInscreverLogin = document.getElementById('btn-inscrever-login')
    const btnCarrinho = document.getElementById('btn-carrinho')

    btnEntrarLogin.addEventListener('click', () => {
        window.location.href = '/pages/login.html'; // Substitua pelo caminho da sua página
    });

    btnCarrinho.addEventListener('click', () => {
        window.location.href = '/pages/carrinho.html'; // Substitua pelo caminho da sua página
    });

}



async function buscarProdutos(pagina = 0, nomeProduto = "") {
    let url = `http://localhost:8080/produto/vitrine/${pagina}`;
    url += `?nome=${encodeURIComponent(nomeProduto)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        const { content, totalPages } = data;

        // Corrigir aqui: Definir corretamente o container de produtos
        let containerProdutos = document.querySelector(".container-produtos");
        if (!containerProdutos) {
            throw new Error("Container de produtos não encontrado");
        }

        containerProdutos.innerHTML = ""; // Limpa o container antes de adicionar novos produtos
        preencherContainerProdutos(containerProdutos, content);
        const quantidadeItens = document.getElementById('badge-carrinho')
        const produtos = JSON.parse(localStorage.getItem('carrinho')) || [];
        quantidadeItens.innerHTML = produtos.length

    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
}

function preencherContainerProdutos(container, produtos) {
    produtos.forEach(produto => {
        const divCardProduto = document.createElement('div');
        divCardProduto.className = "card-produto";
        container.appendChild(divCardProduto);

        const imgCardProduto = document.createElement('img');
        imgCardProduto.src = produto.caminho;

        let caminhoImagem = imgCardProduto.src;
        let novoCaminhoImagem = caminhoImagem.replace(/.*\/front/, ".");
        imgCardProduto.src = novoCaminhoImagem;
        divCardProduto.appendChild(imgCardProduto);

        const pCardTituloProduto = document.createElement('p');
        pCardTituloProduto.className = "card-titulo-produto";
        pCardTituloProduto.textContent = produto.nome;
        divCardProduto.appendChild(pCardTituloProduto);

        const pCardPrecoProduto = document.createElement('p');
        pCardPrecoProduto.className = "card-preco-produto";
        pCardPrecoProduto.textContent = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        divCardProduto.appendChild(pCardPrecoProduto);

        const btnCardProdutoDetalhes = document.createElement('button');
        btnCardProdutoDetalhes.className = "card-btn-detalhes";
        btnCardProdutoDetalhes.textContent = "Detalhes";
        divCardProduto.appendChild(btnCardProdutoDetalhes);

        btnCardProdutoDetalhes.addEventListener('click', () => {
            window.location.href = `./pages/detalhes-produto.html?id=${produto.id}`;
        });
    });


}

