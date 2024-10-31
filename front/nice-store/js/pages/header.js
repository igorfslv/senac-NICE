function atualizarHeaderLogin() {
    const divUsuarioCarrinho = document.querySelector('.btns-carrinho-login');
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    const produtos = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (usuarioLogado !== null) {

        divUsuarioCarrinho.innerHTML = "";
        divUsuarioCarrinho.innerHTML += `
            <p class="msg-bem-vindo-cliente">Bem vindo (a), ${usuarioLogado.nome}!</p>
            <i class='bx bx-user' title="Opções Usuário"></i>
            <i class='bx bx-cart-alt btn-carrinho' title="Carrinho" onclick="window.location.href = '../pages/carrinho.html'">
                <span id="badge-carrinho" class="quantidade-itens">0</span>
            </i>
            <i class='bx bx-log-out' id="btn-log-out" title="Sair"></i>
        `;

        const quantidadeItens = document.getElementById('badge-carrinho');
        quantidadeItens.innerHTML = produtos.length;

        const btnLogOut = document.getElementById('btn-log-out');
        btnLogOut.addEventListener('click', () => {
            localStorage.removeItem('usuarioLogado');
            localStorage.removeItem('carrinho');
            alert("Você se desconectou da sua conta.")
            window.location.href = "../pages/login-cliente.html";
        });
    } else {
        const quantidadeItens = document.getElementById('badge-carrinho')
        quantidadeItens.innerHTML = produtos.length;
    }

}

function menuFlutuanteCliente() {
    const iconeCliente = document.querySelector('.bx-user');
    const header = document.querySelector('.header-tela-principal');
    
    iconeCliente.addEventListener('click', () => {

        header.innerHTML += `
            <div class="opcoes-visualizacao-cliente">
                <ul>
                    <li title="Meu Cadastro" onclick="window.location.href = '../pages/atualizacao-cadastro-cliente.html'">
                        <i class='bx bxs-user-detail'></i>
                        <p>Meu Cadastro</p>
                    </li>
                    <li title="Meus Pedidos" onclick="window.location.href = '../pages/listagem-pedidos-cliente.html'">
                        <i class='bx bxs-package'></i>
                        <p>Meus Pedidos</p>
                    </li>
                </ul>
            </div>
        `;

    });
}

atualizarHeaderLogin();
menuFlutuanteCliente();