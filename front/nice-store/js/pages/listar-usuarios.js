function criarBarraDePesquisa(container) {
    const divBarraDePesquisa = document.createElement("div");
    divBarraDePesquisa.className = "container-barra-pesquisa";

    const barraDePesquisa = document.createElement("input");
    barraDePesquisa.id = "barra-pesquisa";
    barraDePesquisa.className = "barra-pesquisa";
    barraDePesquisa.type = "text";
    barraDePesquisa.placeholder = "Digite o nome de um usuário:";

    const btnPesquisarUsuarioPeloNome = document.createElement("button");
    btnPesquisarUsuarioPeloNome.id = "btn-pesquisar";
    btnPesquisarUsuarioPeloNome.className = "btn-pesquisar";
    btnPesquisarUsuarioPeloNome.textContent = "Buscar";

    divBarraDePesquisa.appendChild(barraDePesquisa);
    divBarraDePesquisa.appendChild(btnPesquisarUsuarioPeloNome);

    container.appendChild(divBarraDePesquisa);

    btnPesquisarUsuarioPeloNome.addEventListener('click', async () => {
        const nomeUsuario = barraDePesquisa.value;
        await listarUsuariosPesquisados(nomeUsuario);

    });

    return { barraDePesquisa, btnPesquisarUsuarioPeloNome };
}

function criarTabelaUsuarios() {
    let tabelaUsuarios = document.createElement("table");
    let tabelaHead = document.createElement("thead");
    let tabelaTrHead = document.createElement("tr");

    const cabecalhos = ["ID", "Nome", "E-mail", "Grupo", "Status", "Editar", "Habilitação"];
    cabecalhos.forEach(cabecalho => {
        let th = document.createElement("th");
        th.textContent = cabecalho;
        tabelaTrHead.appendChild(th);
    });

    tabelaUsuarios.appendChild(tabelaHead);
    tabelaHead.appendChild(tabelaTrHead);

    const tabelaBody = document.createElement("tbody");
    tabelaUsuarios.appendChild(tabelaBody);

    return { tabelaUsuarios, tabelaBody };
}

function preencherTabelaUsuarios(tabelaBody, usuarios) {
    usuarios.forEach(usuario => {
        let tabelaTrBody = document.createElement("tr");

        let tabelaTdID = document.createElement("td");
        tabelaTdID.textContent = usuario.id;

        let tabelaTdNome = document.createElement("td");
        tabelaTdNome.textContent = usuario.nome;

        let tabelaTdEmail = document.createElement("td");
        tabelaTdEmail.textContent = usuario.email;

        let tabelaTdGrupo = document.createElement("td");
        tabelaTdGrupo.textContent = usuario.grupoId;

        let tabelaTdStatus = document.createElement("td");
        tabelaTdStatus.textContent = usuario.ativo ? "ATIVO" : "INATIVO";

        let tabelaTdEditar = document.createElement("td");
        let tabelaTdEditarIcone = document.createElement("i");
        tabelaTdEditarIcone.className = "bx bxs-edit";
        tabelaTdEditar.appendChild(tabelaTdEditarIcone);
        tabelaTdEditar.className = "icone-editar";

        let tabelaTdHabilitacao = document.createElement("td");
        let tabelaTdHabilitacaoBtn = document.createElement("button");
        tabelaTdHabilitacaoBtn.className = "btn-habilitacao";
        tabelaTdHabilitacao.appendChild(tabelaTdHabilitacaoBtn);
        tabelaTdHabilitacaoBtn.textContent = usuario.ativo ? "INATIVAR" : "ATIVAR";

        if (tabelaTdHabilitacaoBtn.textContent === "INATIVAR") {
            tabelaTdHabilitacaoBtn.style.backgroundColor = "#f0f0f0";
            tabelaTdHabilitacaoBtn.style.color = "#d15b5b";
        }
        else if (tabelaTdHabilitacaoBtn.textContent === "ATIVAR") {
            tabelaTdHabilitacaoBtn.style.backgroundColor = "#f0f0f0";
            tabelaTdHabilitacaoBtn.style.color = "#0fc71e";
        }

        tabelaTrBody.appendChild(tabelaTdID);
        tabelaTrBody.appendChild(tabelaTdNome);
        tabelaTrBody.appendChild(tabelaTdEmail);
        tabelaTrBody.appendChild(tabelaTdGrupo);
        tabelaTrBody.appendChild(tabelaTdStatus);
        tabelaTrBody.appendChild(tabelaTdEditar);
        tabelaTrBody.appendChild(tabelaTdHabilitacao);

        tabelaBody.appendChild(tabelaTrBody);

        tabelaTdHabilitacaoBtn.addEventListener('click', () => {

            let msgConfirmacao = window.prompt("Tem certeza que deseja alterar o status do usuário em questão? Digite '1 - SIM' ou '2 - NÃO'");

            if (msgConfirmacao == 1) {

                const admIdObj = JSON.parse(localStorage.getItem('usuarioLogado'));
                const url = `http://localhost:8080/admin/alternarStatus/${usuario.id}/${admIdObj.id}`;

                fetch(url, {
                    method: 'DELETE',
                })
                    .then(response => response.json())
                    .then(result => {

                        alert("Usuario '" + result.nome + "' foi " + (result.ativo ? "Ativado" : "Desativado"))
                        listarUsuarios()
                    })

            } else if (msgConfirmacao == 2) {
                alert("Alteração de status cancelada.");
            } else {
                alert("Opção Inválida.");
            }
        });

        tabelaTdEditarIcone.addEventListener('click', () => {
            window.location.href = `./atualizacao-cadastro-usuario.html?id=${usuario.id}`;
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

    const btnAdicionarNovoUsuario = document.createElement("button");
    btnAdicionarNovoUsuario.className = "btn-add-usuario";
    btnAdicionarNovoUsuario.textContent = "Adicionar Novo Usuário";
    divBotoesTelaUsuario.appendChild(btnAdicionarNovoUsuario);

    btnAdicionarNovoUsuario.addEventListener('click', redirecionarTelaCadastro);
}

export async function listarUsuarios() {
    let containerVisualizacaoUsuario = document.querySelector(".container-visualizacao-usuario");
    containerVisualizacaoUsuario.innerHTML = "";
    containerVisualizacaoUsuario.style.height = "auto";

    const tituloListaUsuarios = document.createElement("h2");
    tituloListaUsuarios.textContent = "Lista de Usuários Cadastrados";
    containerVisualizacaoUsuario.appendChild(tituloListaUsuarios);

    const { barraDePesquisa, btnPesquisarUsuarioPeloNome } = criarBarraDePesquisa(containerVisualizacaoUsuario);
    const { tabelaUsuarios, tabelaBody } = criarTabelaUsuarios();

    containerVisualizacaoUsuario.appendChild(tabelaUsuarios);


    try {
        const usuarios = await buscarUsuarios();
        preencherTabelaUsuarios(tabelaBody, usuarios);

    } catch (error) {
        console.error('Erro ao listar os usuários:', error);
    }

    criarBotoesTelaUsuario(containerVisualizacaoUsuario);
}

async function listarUsuariosPesquisados(nomeUsuario) {
    let containerVisualizacaoUsuario = document.querySelector(".container-visualizacao-usuario");
    containerVisualizacaoUsuario.innerHTML = "";
    containerVisualizacaoUsuario.style.height = "auto";

    const tituloListaUsuarios = document.createElement("h2");
    tituloListaUsuarios.textContent = "Lista de Usuários Cadastrados";
    containerVisualizacaoUsuario.appendChild(tituloListaUsuarios);

    const { barraDePesquisa, btnPesquisarUsuarioPeloNome } = criarBarraDePesquisa(containerVisualizacaoUsuario);
    const { tabelaUsuarios, tabelaBody } = criarTabelaUsuarios();

    containerVisualizacaoUsuario.appendChild(tabelaUsuarios);

    try {
        const usuarios = await buscarUsuariosPorNome(nomeUsuario);
        preencherTabelaUsuarios(tabelaBody, usuarios);
    } catch (error) {
        console.error('Erro ao listar os usuários:', error);
    }

    criarBotoesTelaUsuario(containerVisualizacaoUsuario);
}

function redirecionarTelaCadastro() {
    window.location.href = "../pages/cadastro.html";
}

function retornarTelaInicialUsuario() {
    let btnRetornarTelaAnterior = document.querySelector(".btn-primario");

    btnRetornarTelaAnterior.addEventListener('click', () => {
        location.reload();
    });
}

async function buscarUsuariosPorNome(nomeUsuario = "") {
    const admIdObj = JSON.parse(localStorage.getItem('usuarioLogado'));
    const admId = admIdObj.id;
    const numeroDaPaginaBancoDeDados = 0;

    // Adiciona o nome do usuário na URL da API, se fornecido
    let url = `http://localhost:8080/admin/getUsuarios/${admId}/${numeroDaPaginaBancoDeDados}`;

    url += `?nome=${encodeURIComponent(nomeUsuario)}`;


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

async function buscarUsuarios() {
    const admIdObj = JSON.parse(localStorage.getItem('usuarioLogado'));
    const admId = admIdObj.id;
    const numeroDaPaginaBancoDeDados = 0;

    let url = `http://localhost:8080/admin/getUsuarios/${admId}/${numeroDaPaginaBancoDeDados}`;

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