const btnCancelar = document.querySelector('.btn-cancelar');
const btnEnviar = document.getElementById('btn-enviar');
const nomeProduto = document.getElementById('nome-produto');
const avaliacaoProduto = document.getElementById('avaliacao-produto');
const precoproduto = document.getElementById('preco-produto');
const qtdEstoqueProduto = document.getElementById('qtd-estoque-produto');
const descricaoProduto = document.getElementById('descricao-produto');
let responseAPI;

import { vetorImagens } from '../utils/carregar-imagens.js'

btnEnviar.addEventListener('click', function (event) {
    event.preventDefault();
    const usuarioJSON = localStorage.getItem('usuarioLogado');
    const usuario = JSON.parse(usuarioJSON);

    const url = `http://localhost:8080/produto/registrar/${usuario.id}`;
    const data = {
        "nome": nomeProduto.value,
        "preco": parseFloat(precoproduto.value),
        "qtdEstoque": parseInt(qtdEstoqueProduto.value),
        "descricao": descricaoProduto.value,
        "avaliacao": parseFloat(avaliacaoProduto.value),
        "imagens": vetorImagens
    };

    console.log('Dados a serem enviados:', JSON.stringify(data, null, 2));

    fetch(url, {
        method: 'POST',
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
                alert("Não foi possível cadastrar o usuário. \nCampo: " + result.campo + "\nMotivo: " + result.mensagem)
            } else {
                alert("O produto '" + result.nome + "' foi criado com sucesso! 😁")
                window.location.href = "./cadastro-produto.html";
            }
        })
        .catch(error => {
            const erro = JSON.stringify(error)
            console.error('Erro:', error);
        });
});

btnCancelar.addEventListener('click', () => {
    window.location.href = "./visualizacao-usuario.html";
});