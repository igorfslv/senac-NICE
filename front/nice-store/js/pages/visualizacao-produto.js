const nomeProdutoIndividual = document.getElementById('nome-principal-produto');
const avaliacaoProdutoIndividual = document.getElementById('avaliacao-produto');
const pontosProdutoAvaliacao = document.getElementById('pontos-avaliacao');
const precoProdutoIndividual = document.getElementById('preco-produto');
const qtdEstoqueProdutoIndividual = document.getElementById('qtd-estoque-produto-p');
const descricaoProdutoIndividual = document.getElementById('descricao-produto');
let imagensProduto = [];

const imgPrincipal = document.querySelector('.img-principal');
const imagensSecundarias = document.querySelector('.imagens-secundarias');
const setaEsquerda = document.querySelector('.bx-chevron-left');
const setaDireita = document.querySelector('.bx-chevron-right');

const urlID = new URL(window.location.href);
const id = urlID.searchParams.get("id");

console.log(id);

const url = `http://localhost:8080/produto/${id}`;

fetch(url)
    .then(response => response.json())
    .then(result => {
        const produtoJSON = result;
        console.log(produtoJSON);

        // Preenche as outras informações do produto
        nomeProdutoIndividual.textContent = produtoJSON.nome;
        precoProdutoIndividual.textContent = produtoJSON.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        qtdEstoqueProdutoIndividual.textContent = produtoJSON.qtdEstoque;
        descricaoProdutoIndividual.textContent = produtoJSON.descricao;
        pontosProdutoAvaliacao.textContent = produtoJSON.avaliacao;

        // Preenche as estrelas de acordo com a avaliação
        preencherEstrelas(produtoJSON.avaliacao);

        imagensProduto = produtoJSON.imagens;
        imagensSecundarias.innerHTML = "";

        for (let i = 0; i < imagensProduto.length; i++) {
            const imagem = imagensProduto[i];
            const novaImagem = document.createElement("img");

            // Define a imagem principal
            if (imagem.principal === "true" || imagem.principal === true) {
                imgPrincipal.src = imagem.caminho;
                console.log("Imagem principal carregada");
            }

            // Adiciona imagens ao carrossel de secundárias
            novaImagem.src = imagem.caminho;
            novaImagem.alt = "Imagem Carrossel";
            novaImagem.classList.add("imagem-secundaria");

            imagensSecundarias.append(novaImagem);
        }

        // Adiciona o evento de clique para cada imagem secundária após serem carregadas no DOM
        const imagensSecundariasArray = document.querySelectorAll('.imagem-secundaria');
        imagensSecundariasArray.forEach((img, index) => {
            img.addEventListener('click', () => {
                imgIndex = index; // Atualiza o índice atual
                atualizarImagemPrincipal(imgIndex);
            });
        });
    });

// Variável para controlar o índice da imagem atual no carrossel
let imgIndex = 0;

// Função para alterar a imagem principal ao clicar nas setas ou nas miniaturas
function atualizarImagemPrincipal(index) {
    const novaImagem = imagensProduto[index].caminho;
    imgPrincipal.src = novaImagem;
}

// Função para alternar para a próxima imagem no carrossel
function proximaImagem() {
    imgIndex = (imgIndex + 1) % imagensProduto.length; // Volta ao início quando chegar à última imagem
    atualizarImagemPrincipal(imgIndex);
}

// Função para alternar para a imagem anterior no carrossel
function imagemAnterior() {
    imgIndex = (imgIndex - 1 + imagensProduto.length) % imagensProduto.length; // Vai para a última imagem quando passar da primeira
    atualizarImagemPrincipal(imgIndex);
}

// Adiciona eventos de clique para as setas
setaDireita.addEventListener('click', proximaImagem);
setaEsquerda.addEventListener('click', imagemAnterior);


function preencherEstrelas(avaliacao) {
    avaliacaoProdutoIndividual.innerHTML = '';

    const numeroEstrelas = 5; // Total de estrelas

    // Loop para criar as estrelas cheias, meias e vazias
    for (let i = 1; i <= numeroEstrelas; i++) {
        const estrela = document.createElement('i');
        
        if (i <= Math.floor(avaliacao)) {
            // Estrela cheia
            estrela.classList.add('bx', 'bxs-star');
        } else if (i === Math.ceil(avaliacao) && avaliacao % 1 !== 0) {
            // Meia estrela
            estrela.classList.add('bx', 'bxs-star-half');
        } else {
            // Estrela vazia
            estrela.classList.add('bx', 'bx-star');
        }

        // Adiciona a estrela ao container
        avaliacaoProdutoIndividual.appendChild(estrela);
    }
}