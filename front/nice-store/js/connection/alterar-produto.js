const idProduto = document.getElementById('id-produto');
const nomeProduto = document.getElementById('nome-produto');
const avaliacaoProduto = document.getElementById('avaliacao-produto');
const precoProduto = document.getElementById('preco-produto');
const qtdEstoqueProduto = document.getElementById('qtd-estoque-produto');
const descricaoProduto = document.getElementById('descricao-produto');
const tabelaImagensProduto = document.querySelector('.imagens-carregadas-corpo-lista');
const btnCancelar = document.getElementById('btn-cancelar');
const btnEnviar = document.getElementById('btn-enviar');

import { vetorImagens } from '../utils/carregar-imagens.js'
let imagensProduto = [];
const urlID = new URL(window.location.href);
const id = urlID.searchParams.get("id");

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

            novaLinha.innerHTML = `
            <td><img src="${imagem.caminho}" alt="Imagem Produto" class="img-previa"></td>
            <td>${imagem.nome}</td>
            <td>
                <input type="radio" name="principal" value="${i}" ${principal === 1 ? 'checked' : ''}>
            </td>
            <td>
                <button class="btn-remover">X</button> <!-- Botão de remover -->
            </td>
        `;

            tabelaImagensProduto.append(novaLinha);

            const radioButton = novaLinha.querySelector('input[type="radio"]');
            radioButton.addEventListener("change", function() {
                vetorImagens.forEach((img, i) => {
                    img.principal = i === index;
                });

                console.log('Imagem principal marcada:', vetorImagens[index]);
                console.log('Vetor de imagens atualizado:', vetorImagens);
            });

            const btnRemover = novaLinha.querySelector('.btn-remover');
            btnRemover.addEventListener("click", function() {
                const rowIndex = parseInt(this.dataset.index); 
                removerImagem(rowIndex); 
            });

        }
    });

console.log(id);

btnEnviar.addEventListener('click', function (event) {

    event.preventDefault();

    const data = {
        "id": parseInt(idProduto.value, 10),
        "nome": nomeProduto.value,
        "preco": parseFloat(precoProduto.value),
        "qtdEstoque": parseInt(qtdEstoqueProduto.value, 10),
        "descricao": descricaoProduto.value,
        "avaliacao": parseFloat(avaliacaoProduto.value),
        "imagens": imagensProduto 
    };

    console.log('Dados a serem enviados:', JSON.stringify(data, null, 2));
    alert("a")
});


