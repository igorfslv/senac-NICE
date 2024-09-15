const btnCarregarArquivos = document.getElementById("btn-carregar-arquivos");
const inputCarregarImagens = document.getElementById("input-carregar-imagens");
const nomeArquivoSpan = document.getElementById("nome-arquivo");
const corpoListaImagens = document.querySelector(".imagens-carregadas-corpo-lista");

// Quando clicar no botão, abre o seletor de arquivos
btnCarregarArquivos.addEventListener("click", function(event) {
    event.preventDefault(); // Impede comportamento padrão do botão
    inputCarregarImagens.click();
});

// Quando arquivos forem selecionados
inputCarregarImagens.addEventListener("change", function() {
    const arquivos = inputCarregarImagens.files;

    console.log('Arquivos selecionados:', arquivos); // Verifica se arquivos estão sendo selecionados

    if (arquivos.length > 0) {
        nomeArquivoSpan.textContent = `${arquivos.length} arquivo(s) selecionado(s)`;

        corpoListaImagens.innerHTML = '';

        const urlsImagens = [];

        for (let i = 0; i < arquivos.length; i++) {
            const arquivo = arquivos[i];

            // Cria um objeto URL para a pré-visualização da imagem
            const urlImagem = URL.createObjectURL(arquivo);
            urlsImagens.push(urlImagem); // Armazena o URL para liberar mais tarde

            console.log(`URL da imagem criada: ${urlImagem}`); // Verifica o URL criado

            const novaLinha = document.createElement("tr");

            novaLinha.innerHTML = `
                <td><img src="${urlImagem}" alt="Imagem Produto" class="img-previa"></td>
                <td>${arquivo.name}</td>
                <td>
                    <input type="radio" name="principal" value="${i + 1}">
                </td>
            `;

            corpoListaImagens.appendChild(novaLinha);
        }

        // Libera os URLs depois de usá-los
        urlsImagens.forEach((url) => URL.revokeObjectURL(url));
    } else {
        nomeArquivoSpan.textContent = "Nenhum arquivo selecionado";
    }
});
