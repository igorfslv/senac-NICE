window.onload = function exibirOpcaoAcaoUsuario() {
    const grupoUsuarioLogado = document.querySelector('.grupo-usuario-logado').textContent;
    const tabelaProdutos = document.querySelector('.tabela-produtos tbody');
    const tabelaHeadAcao = document.querySelector('#tabela-produtos-acao');

    // Objeto JSON simulado de produtos
    const produtos = [
        {
            id: 1,
            imagem: "imagem1.jpg",
            nome: "Produto A",
            preco: 100.00,
            qtdEstoque: 50
        },
        {
            id: 2,
            imagem: "imagem2.jpg",
            nome: "Produto B",
            preco: 200.00,
            qtdEstoque: 30
        },
        {
            id: 3,
            imagem: "imagem3.jpg",
            nome: "Produto C",
            preco: 150.00,
            qtdEstoque: 20
        }
    ];

    tabelaProdutos.innerHTML = '';

    produtos.forEach(produto => {
        // Cria a linha da tabela (tr)
        const tr = document.createElement('tr');

        // Cria e preenche as células (td) para o produto
        const tdId = document.createElement('td');
        tdId.textContent = produto.id;
        tr.appendChild(tdId);

        const tdImagem = document.createElement('td');
        const imgProduto = document.createElement('img');
        imgProduto.src = produto.imagem;
        imgProduto.alt = produto.nome;
        imgProduto.width = 50;
        imgProduto.height = 50;
        tdImagem.appendChild(imgProduto);
        tr.appendChild(tdImagem);

        const tdNome = document.createElement('td');
        tdNome.textContent = produto.nome;
        tr.appendChild(tdNome);

        const tdPreco = document.createElement('td');
        tdPreco.textContent = `R$ ${produto.preco.toFixed(2)}`;
        tr.appendChild(tdPreco);

        const tdQtdEstoque = document.createElement('td');
        tdQtdEstoque.textContent = produto.qtdEstoque;
        tr.appendChild(tdQtdEstoque);

        if (grupoUsuarioLogado === "ADMINISTRADOR") {

            tabelaHeadAcao.textContent = "Editar";
            
            const tdEditar = document.createElement('td');
            const iconeEditar = document.createElement('i');
            iconeEditar.className = "bx bxs-edit icone-editar";
            tdEditar.appendChild(iconeEditar);
            tr.appendChild(tdEditar);
        } 
        else if (grupoUsuarioLogado === "ESTOQUISTA") {
            
            tabelaHeadAcao.textContent = "Atualizar Estoque";

            const tdAtualizarEstoque = document.createElement('td');
            const iconeAtualizarEstoque = document.createElement('i');
            iconeAtualizarEstoque.className = "bx bx-package icone-atualizar-estoque";
            tdAtualizarEstoque.appendChild(iconeAtualizarEstoque);
            tr.appendChild(tdAtualizarEstoque);
        }

        tabelaProdutos.appendChild(tr);
    });
}

export function listarProdutos() {
    window.location.href = "../pages/lista-produtos.html";
}