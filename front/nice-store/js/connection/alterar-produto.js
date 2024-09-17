const idProduto = document.getElementById('id-produto');
const nomeProduto = document.getElementById('nome-produto');
const avaliacaoProduto = document.getElementById('avaliacao-produto');
const precoProduto = document.getElementById('preco-produto');
const qtdEstoqueProduto = document.getElementById('qtd-estoque-produto');
const descricaoProduto = document.getElementById('descricao-produto');
const tabelaImagensProduto = document.querySelector('.imagens-carregadas-corpo-lista');
let imagensProduto = [];

const urlID = new URL(window.location.href);
const id = urlID.searchParams.get("id");

console.log(id);

const url = `http://localhost:8080/produto/${id}`;

fetch(url)
    .then(response => response.json())
    .then(result => {
        const produtoJSON = result;

        idProduto.value = produtoJSON.id;
        nomeProduto.value = produtoJSON.nome;
        avaliacaoProduto.value = produtoJSON.avaliacao;
        precoProduto.value = produtoJSON.preco;
        qtdEstoqueProduto.value = produtoJSON.qtdEstoque;
        descricaoProduto.value = produtoJSON.descricao;

        imagensProduto = produtoJSON.imagens;

        for (let i = 0; i < imagensProduto.length; i++) {
            const imagem = imagensProduto[i];
            const novaLinha = document.createElement("tr");
            const principal = imagem.principal === "true" || imagem.principal === true ? 1 : 0;

            // Verifica se a imagem é a principal e adiciona o atributo checked
            novaLinha.innerHTML = `
                <td><img src="${imagem.caminho}" alt="Imagem Produto" class="img-previa"></td>
                <td>${imagem.nome}</td>
                <td>
                    <input type="radio" name="principal" value="${i}" ${principal === 1 ? 'checked' : ''}>
                </td>
            `;

            tabelaImagensProduto.append(novaLinha);
        }
    });


