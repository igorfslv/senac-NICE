function atualizarHeaderLogin() {
    const divUsuarioCarrinho = document.querySelector('.btns-carrinho-login');
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    const produtos = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    if (usuarioLogado !== null) {
        
        divUsuarioCarrinho.innerHTML = "";
        divUsuarioCarrinho.innerHTML += `
        <p class="msg-bem-vindo-cliente">Bem vindo (a), ${usuarioLogado.nome}!</p>
        <i class='bx bx-cart-alt btn-carrinho' onclick="window.location.href = '/front/nice-store/pages/carrinho.html'">
        <span id="badge-carrinho" class="quantidade-itens">0</span>
        </i>
        <i class='bx bxs-user'></i>
        `;
        
        const quantidadeItens = document.getElementById('badge-carrinho');
        quantidadeItens.innerHTML = produtos.length;
    }

}

atualizarHeaderLogin();