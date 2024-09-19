const btnCarregarArquivos = document.getElementById("btn-carregar-arquivos");
const inputCarregarImagens = document.getElementById("input-carregar-imagens");
const nomeArquivoSpan = document.getElementById("nome-arquivo");
const corpoListaImagens = document.querySelector(".imagens-carregadas-corpo-lista");

export let vetorImagens = [];
let arquivosSelecionados = []; // Array para manter os arquivos

btnCarregarArquivos.addEventListener("click", function (event) {
    event.preventDefault();
    inputCarregarImagens.click();
});

inputCarregarImagens.addEventListener("change", function () {
    carregarImagens();
});

function carregarImagens() {
    const arquivos = Array.from(inputCarregarImagens.files);
    arquivosSelecionados = arquivosSelecionados.concat(arquivos);
    
    if (arquivosSelecionados.length > 0) {
        nomeArquivoSpan.textContent = `${arquivosSelecionados.length} arquivo(s) selecionado(s)`;

        corpoListaImagens.innerHTML = "";

        vetorImagens = arquivosSelecionados.map((arquivo, index) => ({
            caminho: "../img/" + arquivo.name,
            principal: false
        }));

        vetorImagens.forEach((imagem, index) => {
            const urlImagem = URL.createObjectURL(arquivosSelecionados[index]);

            const novaLinha = document.createElement("tr");

            novaLinha.innerHTML = `
                <td><img src="${urlImagem}" alt="Imagem Produto" class="img-previa"></td>
                <td>${arquivosSelecionados[index].name}</td>
                <td>
                    <input type="radio" name="principal" value="${index}">
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

        console.log('Vetor de imagens:', vetorImagens);
    } else {
        nomeArquivoSpan.textContent = "Nenhum arquivo selecionado";
    }
}

function removerImagem(index) {
    vetorImagens.splice(index, 1);
    arquivosSelecionados.splice(index, 1); 
    recarregarTabela();
}

function recarregarTabela() {
    corpoListaImagens.innerHTML = "";

    vetorImagens.forEach((imagem, index) => {
        const urlImagem = URL.createObjectURL(arquivosSelecionados[index]);

        const novaLinha = document.createElement("tr");

        novaLinha.innerHTML = `
            <td><img src="${urlImagem}" alt="Imagem Produto" class="img-previa"></td>
            <td>${imagem.caminho.split("/").pop()}</td>
            <td>
                <input type="radio" name="principal" value="${index}" ${imagem.principal ? "checked" : ""}>
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
}
