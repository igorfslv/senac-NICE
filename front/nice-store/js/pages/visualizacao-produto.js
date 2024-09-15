const imgPrincipal = document.querySelector('.img-principal');
const imagensSecundarias = document.querySelectorAll('.imagens-secundarias img');
const setaEsquerda = document.querySelector('.bx-chevron-left');
const setaDireita = document.querySelector('.bx-chevron-right');

// Variável para controlar o índice da imagem atual no carrossel
let imgIndex = 0;

// Função para alterar a imagem principal ao clicar nas setas ou nas miniaturas
function atualizarImagemPrincipal(index) {
    const novaImagem = imagensSecundarias[index].src;
    imgPrincipal.src = novaImagem;
}

// Adiciona o evento de clique para cada imagem secundária
imagensSecundarias.forEach((img, index) => {
    img.addEventListener('click', () => {
        imgIndex = index; // Atualiza o índice atual
        atualizarImagemPrincipal(imgIndex);
    });
});

// Função para alternar para a próxima imagem no carrossel
function proximaImagem() {
    imgIndex = (imgIndex + 1) % imagensSecundarias.length; // Volta ao início quando chegar à última imagem
    atualizarImagemPrincipal(imgIndex);
}

// Função para alternar para a imagem anterior no carrossel
function imagemAnterior() {
    imgIndex = (imgIndex - 1 + imagensSecundarias.length) % imagensSecundarias.length; // Vai para a última imagem quando passar da primeira
    atualizarImagemPrincipal(imgIndex);
}

// Adiciona eventos de clique para as setas
setaDireita.addEventListener('click', proximaImagem);
setaEsquerda.addEventListener('click', imagemAnterior);
