export async function listarUsuarios() {
    let containerVisualizacaoUsuario = document.querySelector(".container-visualizacao-usuario");

    containerVisualizacaoUsuario.innerHTML = "";
    containerVisualizacaoUsuario.style.height = "auto";

    const tituloListaUsuarios = document.createElement("h2");
    tituloListaUsuarios.textContent = "Lista de Usuários Cadastrados";
    containerVisualizacaoUsuario.appendChild(tituloListaUsuarios);

    const listagemUsuarios = document.createElement("div");
    listagemUsuarios.className = "listagem-usuarios";
    containerVisualizacaoUsuario.appendChild(listagemUsuarios);

    let tabelaUsuarios = document.createElement("table");
    let tabelaHead = document.createElement("thead");
    let tabelaTrHead = document.createElement("tr");

    const cabecalhos = ["ID", "Nome", "CPF", "E-mail", "Grupo", "Status", "Editar"];
    cabecalhos.forEach(cabecalho => {
        let th = document.createElement("th");
        th.textContent = cabecalho;
        tabelaTrHead.appendChild(th);
    });

    tabelaUsuarios.appendChild(tabelaHead);
    tabelaHead.appendChild(tabelaTrHead);

    let tabelaBody = document.createElement("tbody");
    tabelaUsuarios.appendChild(tabelaBody);
    listagemUsuarios.appendChild(tabelaUsuarios);

    try {
        const usuarios = await buscarUsuarios();

        if (usuarios.length === 0) {
            console.log("Nenhum usuário encontrado.");
        }

        usuarios.forEach(usuario => {
            let tabelaTrBody = document.createElement("tr");
        
            let tabelaTdID = document.createElement("td");
            tabelaTdID.textContent = usuario.id;
        
            let tabelaTdNome = document.createElement("td");
            tabelaTdNome.textContent = usuario.nome;
        
            let tabelaTdCPF = document.createElement("td");
            tabelaTdCPF.textContent = usuario.cpf;
        
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
        
            tabelaTrBody.appendChild(tabelaTdID);
            tabelaTrBody.appendChild(tabelaTdNome);
            tabelaTrBody.appendChild(tabelaTdCPF);
            tabelaTrBody.appendChild(tabelaTdEmail);
            tabelaTrBody.appendChild(tabelaTdGrupo);
            tabelaTrBody.appendChild(tabelaTdStatus);
            tabelaTrBody.appendChild(tabelaTdEditar);
        
            tabelaBody.appendChild(tabelaTrBody);
        
            // Captura o ID do usuário ao clicar no ícone de edição
            tabelaTdEditarIcone.addEventListener('click', (event) => {
                // Localiza a linha da tabela que contém o botão clicado
                const linha = event.target.closest('tr');
        
                // Acessa a primeira célula (ID) da linha
                const userId = linha.querySelector('td').textContent;
        
                // Redireciona para a página de atualização com o ID do usuário na URL
                window.location.href = `./atualizacao-cadastro-usuario.html?id=${userId}`;
            });
        });        

        const divBotoesTelaUsuario = document.createElement("div");
        divBotoesTelaUsuario.className = "btns-tela-usuario";
        containerVisualizacaoUsuario.appendChild(divBotoesTelaUsuario);

        let btnRetornarTelaAnterior = document.createElement("button");
        btnRetornarTelaAnterior.className = "btn-primario";
        btnRetornarTelaAnterior.textContent = "Retornar à tela anterior";
        divBotoesTelaUsuario.appendChild(btnRetornarTelaAnterior);

        retornarTelaInicialUsuario();

        const btnAdicionarNovoUsuario = document.createElement("button");
        btnAdicionarNovoUsuario.className = "btn-add-usuario";
        btnAdicionarNovoUsuario.textContent = "Adicionar Novo Usuário";
        divBotoesTelaUsuario.appendChild(btnAdicionarNovoUsuario);

        btnAdicionarNovoUsuario.addEventListener('click', redirecionarTelaCadastro);
    } catch (error) {
        console.error('Erro ao listar os usuários:', error);
    }
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
        console.log("Dados retornados pela API:", data); // Log dos dados
        return data.content; // Retorna o array de usuários
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        return [];
    }
}