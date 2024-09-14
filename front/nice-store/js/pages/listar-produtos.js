// async function exibirOpcaoAcaoUsuario() {
//     const grupoUsuarioLogado = document.querySelector('.grupo-usuario-logado').textContent;
//     let containerVisualizacaoUsuario = document.querySelector('.container-visualizacao-usuario');
//     containerVisualizacaoUsuario.innerHTML = ""; // Limpa o container
//     containerVisualizacaoUsuario.style.height = "auto"; // Ajusta o layout

//     // Cria e exibe a barra de pesquisa e tabela de produtos
//     const { barraDePesquisa, btnPesquisarProdutoPeloNome } = criarBarraDePesquisa(containerVisualizacaoUsuario);
//     const { tabelaProdutos, tabelaBody } = criarTabelaProdutos();

//     // Adiciona a tabela no container de visualização
//     containerVisualizacaoUsuario.appendChild(tabelaProdutos);

//     try {
//         // Buscar produtos da API, caso esteja conectado a uma.
//         const produtos = await buscarProdutosPorNome();

//         // Preenche a tabela de produtos com os dados obtidos
//         preencherTabelaProdutos(tabelaBody, produtos);

//         // Atualiza a coluna de ações com base no grupo do usuário logado
//         if (grupoUsuarioLogado === "ADMINISTRADOR") {
//             document.querySelector('#tabela-produtos-acao').textContent = "Editar";
//         } else if (grupoUsuarioLogado === "ESTOQUISTA") {
//             document.querySelector('#tabela-produtos-acao').textContent = "Atualizar Estoque";
//         }

//     } catch (error) {
//         console.error("Erro ao listar produtos:", error);
//     }


//     preencherTabelaProdutos(tabelaBody, produtos);
// };

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
        await listarProdutosPesquisados(nomeProduto);

    });

    return { barraDePesquisa, btnPesquisarProdutoPeloNome };
}

function criarTabelaProdutos() {
    let tabelaProdutos = document.createElement("table");
    let tabelaHead = document.createElement("thead");
    let tabelaTrHead = document.createElement("tr");

    const cabecalhos = ["ID Produto", "Nome", "Qtd Estoque", "Valor", "Status", "Editar", "Visualizar", "Habilitação"];
    cabecalhos.forEach(cabecalho => {
        let th = document.createElement("th");
        th.textContent = cabecalho;
        tabelaTrHead.appendChild(th);
    });

    tabelaProdutos.appendChild(tabelaHead);
    tabelaHead.appendChild(tabelaTrHead);

    const tabelaBody = document.createElement("tbody");
    tabelaProdutos.appendChild(tabelaBody);

    return { tabelaProdutos, tabelaBody };
}

function preencherTabelaProdutos(tabelaBody, produtos) {
    produtos.forEach(produto => {
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
        const admIdObj = JSON.parse(localStorage.getItem('usuarioLogado'));

        if(admIdObj.grupoId === "ESTOQUISTA") {
            tabelaTdHabilitacaoBtn.disabled = true
            tabelaTdHabilitacaoBtn.style.backgroundColor = "#   ";
            tabelaTdHabilitacaoBtn.style.color = "#A9A9A9";
        }

        
        tabelaTdHabilitacaoBtn.addEventListener('click', () => {
            let msgConfirmacao = window.prompt("Tem certeza que deseja alterar o status do produto? Digite '1 - SIM' ou '2 - NÃO'");

            if (msgConfirmacao == 1) {
                
                const url = `http://localhost:8080/produto/alternarStatus/${admIdObj.id}/${produto.id}`;

                fetch(url, {
                    method: 'DELETE',
                })
                .then(response => response.json())
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
            // window.location.href = `./atualizacao-produto.html?id=${produto.id}`;
        });

        tabelaTdVisualizarIcone.addEventListener('click', () => {
            // window.location.href = `./visualizacao-produto.html?id=${produto.id}`;
        });
    });
}

function criarBotoesTelaUsuario(container) {

    const divBotoesTelaUsuario = document.createElement("div");
    divBotoesTelaUsuario.className = "btns-tela-usuario";
    container.appendChild(divBotoesTelaUsuario);

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
}

async function listarProdutosPesquisados(nomeProduto) {
    let containerVisualizacaoUsuario = document.querySelector(".container-visualizacao-usuario");
    containerVisualizacaoUsuario.innerHTML = "";
    containerVisualizacaoUsuario.style.height = "auto";

    const tituloListaProdutos = document.createElement("h2");
    tituloListaProdutos.textContent = "Lista de Produtos Cadastrados";
    containerVisualizacaoUsuario.appendChild(tituloListaProdutos);

    const { barraDePesquisa, btnPesquisarProdutoPeloNome } = criarBarraDePesquisa(containerVisualizacaoUsuario);
    const { tabelaProdutos, tabelaBody } = criarTabelaProdutos();

    containerVisualizacaoUsuario.appendChild(tabelaProdutos);

    try {
        const produtos = await buscarProdutosPorNome(nomeProduto);
        preencherTabelaProdutos(tabelaBody, produtos);
    } catch (error) {
        console.error('Erro ao listar os usuários:', error);
    }

    criarBotoesTelaUsuario(containerVisualizacaoUsuario);
}

async function buscarProdutosPorNome(nomeProduto = "") {
    const admIdObj = JSON.parse(localStorage.getItem('usuarioLogado'));
    const admId = admIdObj.id;
    const numeroDaPaginaBancoDeDados = 0;

    let url = `http://localhost:8080/produto/getProdutos/${numeroDaPaginaBancoDeDados}`;

    url += `?nome=${encodeURIComponent(nomeProduto)}`;


    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }
        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        return [];
    }
}

export async function listarProdutos() {
    let containerVisualizacaoUsuario = document.querySelector(".container-visualizacao-usuario");
    containerVisualizacaoUsuario.innerHTML = "";
    containerVisualizacaoUsuario.style.height = "auto";

    const tituloListaProdutos = document.createElement("h2");
    tituloListaProdutos.textContent = "Lista de Produtos Cadastrados";
    containerVisualizacaoUsuario.appendChild(tituloListaProdutos);

    const { barraDePesquisa, btnPesquisarProdutoPeloNome } = criarBarraDePesquisa(containerVisualizacaoUsuario);
    const { tabelaProdutos, tabelaBody } = criarTabelaProdutos();

    containerVisualizacaoUsuario.appendChild(tabelaProdutos);


    try {
        const produtos = await buscarProdutos();
        preencherTabelaProdutos(tabelaBody, produtos);

    } catch (error) {
        console.error('Erro ao listar os usuários:', error);
    }

    criarBotoesTelaUsuario(containerVisualizacaoUsuario);
}

async function buscarProdutos() {
    const admIdObj = JSON.parse(localStorage.getItem('usuarioLogado'));
    const admId = admIdObj.id;
    const numeroDaPaginaBancoDeDados = 0;

    let url = `http://localhost:8080/produto/getProdutos/${numeroDaPaginaBancoDeDados}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Dados retornados pela API:", data);
        return data.content;
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        return [];
    }
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