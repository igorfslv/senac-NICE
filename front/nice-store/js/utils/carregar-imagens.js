const btnCarregarArquivos = document.getElementById("btn-carregar-arquivos");
const inputCarregarImagens = document.getElementById("input-carregar-imagens");
const nomeArquivoSpan = document.getElementById("nome-arquivo");
const corpoListaImagens = document.querySelector(".imagens-carregadas-corpo-lista");

export let vetorImagens = [];
export let arquivosSelecionados = []; // Array para manter os arquivos

btnCarregarArquivos.addEventListener("click", function (event) {
    event.preventDefault();
    inputCarregarImagens.click();
});

inputCarregarImagens.addEventListener("change", function () {
    carregarImagens([]);
});

export function carregarImagens(preArquivos) {
    const arquivos = Array.from(inputCarregarImagens.files);
    arquivosSelecionados = arquivosSelecionados.concat(arquivos);

    nomeArquivoSpan.textContent = `${arquivosSelecionados.length} arquivo(s) selecionado(s)`;

    // Adiciona os arquivos carregados ao vetor de imagens
    const arquivosCarregados = arquivos.map((arquivo) => ({
        caminho: "../img/" + arquivo.name,
        principal: false
    }));
    
    vetorImagens.push(...arquivosCarregados);
    arquivosSelecionados = [];

    if (preArquivos.length > 0) {
        vetorImagens.push(...preArquivos);
    }
    
    recarregarTabela();
}

function removerImagem(index) {
    vetorImagens.splice(index, 1);
    recarregarTabela();
}

function recarregarTabela() {
    corpoListaImagens.innerHTML = "";

    vetorImagens.forEach((imagem, index) => {
        const novaLinha = document.createElement("tr");

        novaLinha.innerHTML = `
            <td><img src="${imagem.caminho}" alt="Imagem Produto" class="img-previa"></td>
            <td>${imagem.caminho.split("/").pop()}</td>
            <td>
                <input type="radio" name="principal" value="${index}" ${imagem.principal ? 'checked' : ''} required>
            </td>
            <td>
                <button class="btn-remover" data-index="${index}">X</button>
            </td>
        `;

        corpoListaImagens.appendChild(novaLinha);

        const radioButton = novaLinha.querySelector('input[type="radio"]');
        radioButton.addEventListener("change", function () {
            vetorImagens.forEach((img, i) => {
                img.principal = i === index;
            });

            console.log('Imagem principal marcada:', vetorImagens[index]);
            console.log('Vetor de imagens atualizado:', vetorImagens);
        });

        const btnRemover = novaLinha.querySelector('.btn-remover');
        btnRemover.style.backgroundColor = 'red';
        btnRemover.style.color = 'white';
        btnRemover.style.border = 'none';
        btnRemover.style.padding = '5px 10px';
        btnRemover.style.cursor = 'pointer';
        btnRemover.style.fontWeight = 'bold';
        btnRemover.addEventListener("click", function () {
            const rowIndex = parseInt(this.dataset.index); 
            removerImagem(rowIndex);
        });
    });

    // Atualiza a contagem de arquivos
    nomeArquivoSpan.textContent = `${vetorImagens.length} arquivo(s) selecionado(s)`;
}
