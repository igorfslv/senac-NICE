export function listarUsuarios() {
    
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

    // Chamada à API (no momento dados estáticos num método)
    buscarUsuarios().then(usuarios => {
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
            tabelaTdGrupo.textContent = usuario.grupo;

            let tabelaTdStatus = document.createElement("td");
            tabelaTdStatus.textContent = usuario.status;

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

            tabelaTdEditarIcone.addEventListener('click', () => {
                window.location.href = "./atualizacao-cadastro-usuario.html";
            });
        });

        const divBotoesTelaUsuario =  document.createElement("div");
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
    });
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


// Exemplo de função fictícia para buscar os usuários do banco de dados
async function buscarUsuarios() {
    // Essa função deve fazer uma chamada ao banco de dados ou API e retornar um array de objetos
    // Aqui é só um exemplo estático, que será substituido pelo código da nossa API

    return [
        {
            id: 1,
            nome: "João Silva",
            cpf: "123.456.789-00",
            email: "joao.silva@exemplo.com",
            grupo: "Administrador",
            status: "Ativo"
        },
        {
            id: 2,
            nome: "Maria Oliveira",
            cpf: "987.654.321-00",
            email: "maria.oliveira@exemplo.com",
            grupo: "Estoquista",
            status: "Inativo"
        }
    ];
}