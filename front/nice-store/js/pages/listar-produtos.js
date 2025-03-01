import { verificarGrupoUsuarioLogado } from "../utils/verificar-grupo-usuario-logado.js";

function criarBarraDePesquisa(container) {
    const divBarraDePesquisa = document.createElement("div");
    divBarraDePesquisa.className = "container-barra-pesquisa";

    const barraDePesquisa = document.createElement("input");
    barraDePesquisa.id = "barra-pesquisa";
    barraDePesquisa.className = "barra-pesquisa";
    barraDePesquisa.type = "text";
    barraDePesquisa.placeholder = "Digite o nome de um produto:";

    const btnPesquisarProdutoPeloNome = document.createElement("button");
    btnPesquisarProdutoPeloNome.id = "btn-pesquisar";
    btnPesquisarProdutoPeloNome.className = "btn-pesquisar";
    btnPesquisarProdutoPeloNome.textContent = "Buscar";

    divBarraDePesquisa.appendChild(barraDePesquisa);
    divBarraDePesquisa.appendChild(btnPesquisarProdutoPeloNome);

    container.appendChild(divBarraDePesquisa);

    btnPesquisarProdutoPeloNome.addEventListener('click', async () => {
        const nomeProduto = barraDePesquisa.value;
        console.log(nomeProduto);
        await listarProdutosPesquisados(nomeProduto);

    });

    return { barraDePesquisa, btnPesquisarProdutoPeloNome };
}

function criarTabelaProdutos() {
    let tabelaProdutos = document.createElement("table");
    tabelaProdutos.className = "tabela-produtos";
    let tabelaHead = document.createElement("thead");
    let tabelaTrHead = document.createElement("tr");

    if (verificarGrupoUsuarioLogado() === "ADMINISTRADOR") {
        const cabecalhos = ["ID Produto", "Nome", "Qtd Estoque", "Valor", "Status", "Editar", "Visualizar", "Habilitação"];
        cabecalhos.forEach(cabecalho => {
            let th = document.createElement("th");
            th.textContent = cabecalho;
            tabelaTrHead.appendChild(th);
        });

    } else if (verificarGrupoUsuarioLogado() === "ESTOQUISTA") {
        const cabecalhos = ["ID Produto", "Nome", "Qtd Estoque", "Valor", "Status", "Editar"];
        cabecalhos.forEach(cabecalho => {
            let th = document.createElement("th");
            th.textContent = cabecalho;
            tabelaTrHead.appendChild(th);
        });
    }


    tabelaProdutos.appendChild(tabelaHead);
    tabelaHead.appendChild(tabelaTrHead);

    const tabelaBody = document.createElement("tbody");
    tabelaProdutos.appendChild(tabelaBody);

    return { tabelaProdutos, tabelaBody };
}

function preencherTabelaProdutos(tabelaBody, produtos) {
    produtos.forEach(produto => {

        if (verificarGrupoUsuarioLogado() === "ADMINISTRADOR") {
            const admIdObj = JSON.parse(localStorage.getItem('usuarioLogado'));

            let tabelaTrBody = document.createElement("tr");

            let tabelaTdID = document.createElement("td");
            tabelaTdID.textContent = produto.id;

            let tabelaTdNome = document.createElement("td");
            tabelaTdNome.textContent = produto.nome;

            let tabelaTdQtdEstoque = document.createElement("td");
            tabelaTdQtdEstoque.textContent = produto.qtdEstoque;

            let tabelaTdValor = document.createElement("td");
            tabelaTdValor.textContent = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            let tabelaTdStatus = document.createElement("td");
            tabelaTdStatus.textContent = produto.ativo ? "ATIVO" : "INATIVO";

            let tabelaTdEditar = document.createElement("td");
            let tabelaTdEditarIcone = document.createElement("i");
            tabelaTdEditarIcone.className = "bx bxs-edit";
            tabelaTdEditar.appendChild(tabelaTdEditarIcone);
            tabelaTdEditar.className = "icone-editar";

            let tabelaTdVisualizar = document.createElement("td");
            let tabelaTdVisualizarIcone = document.createElement("i");
            tabelaTdVisualizarIcone.className = "bx bx-show-alt";
            tabelaTdVisualizar.appendChild(tabelaTdVisualizarIcone);
            tabelaTdVisualizar.className = "icone-visualizar";

            let tabelaTdHabilitacao = document.createElement("td");
            let tabelaTdHabilitacaoBtn = document.createElement("button");
            tabelaTdHabilitacaoBtn.className = "btn-habilitacao";
            tabelaTdHabilitacao.appendChild(tabelaTdHabilitacaoBtn);
            tabelaTdHabilitacaoBtn.textContent = produto.ativo ? "DESATIVAR" : "ATIVAR";

            if (produto.ativo) {
                tabelaTdHabilitacaoBtn.style.backgroundColor = "#f0f0f0";
                tabelaTdHabilitacaoBtn.style.color = "#d15b5b";
            } else {
                tabelaTdHabilitacaoBtn.style.backgroundColor = "#f0f0f0";
                tabelaTdHabilitacaoBtn.style.color = "#0fc71e";
            }

            tabelaTrBody.appendChild(tabelaTdID);
            tabelaTrBody.appendChild(tabelaTdNome);
            tabelaTrBody.appendChild(tabelaTdQtdEstoque);
            tabelaTrBody.appendChild(tabelaTdValor);
            tabelaTrBody.appendChild(tabelaTdStatus);
            tabelaTrBody.appendChild(tabelaTdEditar);
            tabelaTrBody.appendChild(tabelaTdVisualizar);
            tabelaTrBody.appendChild(tabelaTdHabilitacao);

            tabelaBody.appendChild(tabelaTrBody);

            tabelaTdHabilitacaoBtn.addEventListener('click', () => {
                let msgConfirmacao = window.prompt("Tem certeza que deseja alterar o status do produto? Digite '1 - SIM' ou '2 - NÃO'");

                if (msgConfirmacao == 1) {

                    const url = `http://localhost:8080/produto/alternarStatus/${admIdObj.id}/${produto.id}`;

                    fetch(url, {
                        method: 'DELETE',
                    })
                        .then(response => {
                            console.log(response)
                            return response.json()
                        })
                        .then(result => {
                            alert("Produto '" + result.nome + "' foi " + (result.ativo ? "Ativado" : "Desativado"));
                            listarProdutosPesquisados();
                        })
                        .catch(error => console.error("Erro ao alterar status do produto:", error));

                } else if (msgConfirmacao == 2) {
                    alert("Alteração de status cancelada.");
                } else {
                    alert("Opção Inválida.");
                }
            });

            tabelaTdEditarIcone.addEventListener('click', () => {
                window.location.href = `./atualizacao-cadastro-produto.html?id=${produto.id}`;
            });

            tabelaTdVisualizarIcone.addEventListener('click', () => {
                window.location.href = `./visualizacao-produto.html?id=${produto.id}`;
            });

        } else if (verificarGrupoUsuarioLogado() === "ESTOQUISTA") {

            let tabelaTrBody = document.createElement("tr");

            let tabelaTdID = document.createElement("td");
            tabelaTdID.textContent = produto.id;

            let tabelaTdNome = document.createElement("td");
            tabelaTdNome.textContent = produto.nome;

            let tabelaTdQtdEstoque = document.createElement("td");
            tabelaTdQtdEstoque.textContent = produto.qtdEstoque;

            let tabelaTdValor = document.createElement("td");
            tabelaTdValor.textContent = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            let tabelaTdStatus = document.createElement("td");
            tabelaTdStatus.textContent = produto.ativo ? "ATIVO" : "INATIVO";

            let tabelaTdEditar = document.createElement("td");
            let tabelaTdEditarIcone = document.createElement("i");
            tabelaTdEditarIcone.className = "bx bxs-edit";
            tabelaTdEditar.appendChild(tabelaTdEditarIcone);
            tabelaTdEditar.className = "icone-editar";

            tabelaTrBody.appendChild(tabelaTdID);
            tabelaTrBody.appendChild(tabelaTdNome);
            tabelaTrBody.appendChild(tabelaTdQtdEstoque);
            tabelaTrBody.appendChild(tabelaTdValor);
            tabelaTrBody.appendChild(tabelaTdStatus);
            tabelaTrBody.appendChild(tabelaTdEditar);

            tabelaBody.appendChild(tabelaTrBody);

            tabelaTdEditarIcone.addEventListener('click', () => {
                window.location.href = `./atualizacao-cadastro-produto.html?id=${produto.id}`;
            });

        }

    });
}

function criarBotoesTelaUsuario(container) {

    const divBotoesTelaUsuario = document.createElement("div");
    divBotoesTelaUsuario.className = "btns-tela-usuario";
    container.appendChild(divBotoesTelaUsuario);

    if (verificarGrupoUsuarioLogado() === "ADMINISTRADOR") {
        
        const btnRetornarTelaAnterior = document.createElement("button");
        btnRetornarTelaAnterior.className = "btn-primario";
        btnRetornarTelaAnterior.textContent = "Retornar à tela anterior";
        divBotoesTelaUsuario.appendChild(btnRetornarTelaAnterior);

        btnRetornarTelaAnterior.addEventListener('click', retornarTelaInicialUsuario);

        const btnAdicionarNovoProduto = document.createElement("button");
        btnAdicionarNovoProduto.className = "btn-add-usuario";
        btnAdicionarNovoProduto.textContent = "Adicionar Novo Produto";
        divBotoesTelaUsuario.appendChild(btnAdicionarNovoProduto);

        btnAdicionarNovoProduto.addEventListener('click', redirecionarTelaCadastroProduto);
        
    } else if (verificarGrupoUsuarioLogado() === "ESTOQUISTA") {

        const btnRetornarTelaAnterior = document.createElement("button");
        btnRetornarTelaAnterior.className = "btn-primario";
        btnRetornarTelaAnterior.textContent = "Retornar à tela anterior";
        divBotoesTelaUsuario.appendChild(btnRetornarTelaAnterior);

        btnRetornarTelaAnterior.addEventListener('click', retornarTelaInicialUsuario);
    }


}

async function listarProdutosPesquisados(nomeProduto) {
    let containerVisualizacaoUsuario = document.querySelector(".container-visualizacao-usuario");
    containerVisualizacaoUsuario.innerHTML = ""; // Limpa o container
    containerVisualizacaoUsuario.style.height = "auto";

    const tituloListaProdutos = document.createElement("h2");
    tituloListaProdutos.textContent = "Lista de Produtos Cadastrados";
    containerVisualizacaoUsuario.appendChild(tituloListaProdutos);

    const { barraDePesquisa, btnPesquisarProdutoPeloNome } = criarBarraDePesquisa(containerVisualizacaoUsuario);
    const { tabelaProdutos, tabelaBody } = criarTabelaProdutos();

    containerVisualizacaoUsuario.appendChild(tabelaProdutos);

    try {
        // Faz a busca pelos produtos pelo nome
        const produtos = await buscarProdutosPorNome(nomeProduto);
        console.log(produtos);

        // Verifica se encontrou produtos com o nome pesquisado
        if (produtos.length > 0) {
            // Preenche a tabela com os produtos encontrados
            preencherTabelaProdutos(tabelaBody, produtos);
            criarPaginacao(containerVisualizacaoUsuario, 0, 1, buscarProdutosPagina);
        } else {
            // Caso não haja produtos encontrados, mostra uma mensagem
            const mensagemSemProdutos = document.createElement("p");
            mensagemSemProdutos.textContent = "Nenhum produto encontrado.";
            containerVisualizacaoUsuario.appendChild(mensagemSemProdutos);
        }

    } catch (error) {
        console.error('Erro ao listar os produtos pesquisados:', error);
    }

    criarBotoesTelaUsuario(containerVisualizacaoUsuario);
}


async function buscarProdutosPorNome(nomeProduto = "") {
    const admIdObj = JSON.parse(localStorage.getItem('usuarioLogado'));
    const admId = admIdObj.id;
    const numeroDaPaginaBancoDeDados = 0;

    let url = `http://localhost:8080/produto/getProdutos/${numeroDaPaginaBancoDeDados}`;

    url += `?nome=${encodeURIComponent(nomeProduto)}`;

    console.log(url);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data.content);
        return data.content;
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        return [];
    }
}


function criarPaginacao(container, paginaAtual, totalPaginas, buscarProdutosPagina) {
    const divPaginacao = document.createElement("div");
    divPaginacao.className = "paginacao";
    container.appendChild(divPaginacao);

    // Botão de página anterior
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "Anterior";
    btnAnterior.className = "btn-paginacao";
    btnAnterior.disabled = paginaAtual === 0;
    divPaginacao.appendChild(btnAnterior);

    btnAnterior.addEventListener("click", () => {
        if (paginaAtual > 0) {
            buscarProdutosPagina(paginaAtual - 1);
        }
    });

    // Exibe a página atual e o total de páginas
    const spanPaginaAtual = document.createElement("span");
    spanPaginaAtual.textContent = `Página ${paginaAtual + 1} de ${totalPaginas}`;
    divPaginacao.appendChild(spanPaginaAtual);

    // Botão de próxima página
    const btnProximo = document.createElement("button");
    btnProximo.textContent = "Próximo";
    btnProximo.className = "btn-paginacao";
    btnProximo.disabled = paginaAtual === totalPaginas - 1;
    divPaginacao.appendChild(btnProximo);

    btnProximo.addEventListener("click", () => {
        if (paginaAtual < totalPaginas - 1) {
            buscarProdutosPagina(paginaAtual + 1);
        }
    });

    if (paginaAtual === 0) {
        btnAnterior.style.backgroundColor = "#ccc";
    } else if (paginaAtual === totalPaginas - 1) {
        btnProximo.style.backgroundColor = "#ccc";
    }
}

async function buscarProdutosPagina(pagina = 0, nomeProduto = "") {
    const admIdObj = JSON.parse(localStorage.getItem('usuarioLogado'));
    let url = `http://localhost:8080/produto/getProdutos/${pagina}`;
    url += `?nome=${encodeURIComponent(nomeProduto)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }
        const data = await response.json();
        const { content, totalPages } = data;

        let containerVisualizacaoUsuario = document.querySelector(".container-visualizacao-usuario");
        containerVisualizacaoUsuario.innerHTML = "";

        const tituloListaProdutos = document.createElement("h2");
        tituloListaProdutos.textContent = "Lista de Produtos Cadastrados";
        containerVisualizacaoUsuario.appendChild(tituloListaProdutos);

        const { barraDePesquisa, btnPesquisarProdutoPeloNome } = criarBarraDePesquisa(containerVisualizacaoUsuario);

        const { tabelaProdutos, tabelaBody } = criarTabelaProdutos();
        containerVisualizacaoUsuario.appendChild(tabelaProdutos);
        preencherTabelaProdutos(tabelaBody, content);

        // Criar a paginação
        criarPaginacao(containerVisualizacaoUsuario, pagina, totalPages, buscarProdutosPagina);

        criarBotoesTelaUsuario(containerVisualizacaoUsuario);

    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
}

export async function listarProdutos() {
    buscarProdutosPagina();
}

function redirecionarTelaCadastroProduto() {
    window.location.href = "../pages/cadastro-produto.html";
}

function retornarTelaInicialUsuario() {
    let btnRetornarTelaAnterior = document.querySelector(".btn-primario");

    btnRetornarTelaAnterior.addEventListener('click', () => {
        location.reload();
    });
}