const idProduto = document.getElementById('id-produto');
const nomeProduto = document.getElementById('nome-produto');
const avaliacaoProduto = document.getElementById('avaliacao-produto');
const precoProduto = document.getElementById('preco-produto');
const qtdEstoqueProduto = document.getElementById('qtd-estoque-produto');
const descricaoProduto = document.getElementById('descricao-produto');
const corpoListaImagens = document.querySelector('.imagens-carregadas-corpo-lista'); 
const btnCancelar = document.getElementById('btn-cancelar');
const btnEnviar = document.getElementById('btn-enviar');

import { vetorImagens } from '../utils/carregar-imagens.js'
import { carregarImagens } from '../utils/carregar-imagens.js'

let imagensProduto = [];
let responseAPI;
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
        carregarImagens(imagensProduto)
       
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
        "imagens": vetorImagens 
    };

    console.log('Dados a serem enviados:', JSON.stringify(data, null, 2));

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const urlAtualizar = `http://localhost:8080/produto/alterar/${usuarioLogado.id}`;

    fetch(urlAtualizar, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            responseAPI = response.status
            return response.json();
        })

        .then(result => {

            if (responseAPI === 400) {
                alert("Não foi possível alterar o usuário " + result.nome + ". \nCampo: " + result.campo + "\nMotivo: " + result.mensagem)
            } else {
                alert("Usuário '" + result.nome + "' alterado com sucesso!")
                window.location.href = "./visualizacao-usuario.html";
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            const erro = JSON.stringify(error)

        });


});


