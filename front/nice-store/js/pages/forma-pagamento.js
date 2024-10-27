const btnCartao = document.querySelector('.btn-cartao');
const btnPix = document.querySelector('.btn-pix');
const containerMetodoCartao = document.querySelector('.container-metodo-cartao');

containerMetodoCartao.innerHTML = "";

let metodoPagamentoSelecionado = ""; // Variável global para armazenar o método selecionado

function definirMetodoPagamento() {
    btnCartao.addEventListener('click', () => {
        console.log('Botão Cartão clicado');

        if (btnPix.classList.contains('metodo-selecionado')) {
            btnPix.classList.remove('metodo-selecionado');
        }
        btnCartao.classList.add('metodo-selecionado');

        containerMetodoCartao.innerHTML = `
            <div class="dados-cartao">
                <p class="titulo-secao-cartao">Dados Cartão</p>
                <div class="cartao-dados-inputs cartao-cliente">
                    <div>
                        <label for="cartao-nome-titular">Nome do Títular</label>
                        <input type="text" name="cartao-nome-titular" id="cartao-nome-titular" placeholder="Ex.: Guilherme Mateus">
                    </div>
                    <div>
                        <label for="cartao-numero">Número</label>
                        <input type="text" name="cartao-numero" maxlength="19" id="cartao-numero" placeholder="0000 0000 0000 0000" required>        
                    </div>
                    <div>
                        <label for="cartao-data-validade">Data de Validade</label>
                        <input type="month" name="cartao-data-validade" id="cartao-data-validade" required>
                    </div>
                    <div>
                        <label for="cartao-cvv">CVV</label>
                        <input type="text" maxlength="3" name="cartao-cvv" id="cartao-cvv" placeholder="Ex.: 123" required>
                    </div>
                    <div>
                        <label for="cartao-qtd-parcelas">Quantidade de Parcelas</label>
                        <input type="text" maxlength="2" name="cartao-qtd-parcelas" id="cartao-qtd-parcelas" required>
                    </div>
                </div>
            </div>
        `;
        
        containerMetodoCartao.style.display = "flex";

        metodoPagamentoSelecionado = "Cartão";
        console.log("Método Pagamento: " + metodoPagamentoSelecionado);

        aplicarMascaras();
    });

    btnPix.addEventListener('click', () => {
        console.log('Botão Pix clicado');

        if (btnCartao.classList.contains('metodo-selecionado')) {
            btnCartao.classList.remove('metodo-selecionado');
        }
        btnPix.classList.add('metodo-selecionado');

        containerMetodoCartao.innerHTML = "";
        containerMetodoCartao.style.display = 'none';

        metodoPagamentoSelecionado = "PIX";
        console.log("Método Pagamento: " + metodoPagamentoSelecionado);
    });
}

function aplicarMascaras() {
    const numeroCartao = document.getElementById('cartao-numero');
    const cvvCartao = document.getElementById('cartao-cvv');
    const qtdParcelas = document.getElementById('cartao-qtd-parcelas');

    numeroCartao.addEventListener('input', () => {
        numeroCartao.value = numeroCartao.value
            .replace(/\D/g, '')                 // Remove tudo que não é dígito
            .replace(/(\d{4})(?=\d)/g, '$1 ');  // Adiciona espaço a cada 4 dígitos
    });

    cvvCartao.addEventListener('input', () => {
        cvvCartao.value = cvvCartao.value.replace(/\D/g, ''); // Permite apenas dígitos
    });

    qtdParcelas.addEventListener('input', () => {
        qtdParcelas.value = qtdParcelas.value.replace(/\D/g, ''); // Permite apenas dígitos
    });
}

function salvarMetodoPagamento() {
    const btnResumoPedido = document.querySelector('.btn-resumo-pedido');

    btnResumoPedido.addEventListener('click', () => {
        if (!metodoPagamentoSelecionado) {
            alert("Selecione um método de pagamento!");
            return;
        }

        if (metodoPagamentoSelecionado === "Cartão") {
            const nomeTitularCartao = document.getElementById('cartao-nome-titular')?.value.trim();
            const numeroCartao = document.getElementById('cartao-numero')?.value.trim();
            const validadeCartao = document.getElementById('cartao-data-validade')?.value.trim();
            const cvvCartao = document.getElementById('cartao-cvv')?.value.trim();
            const qtdParcelas = document.getElementById('cartao-qtd-parcelas')?.value.trim();

            if (!nomeTitularCartao || !numeroCartao || !validadeCartao || !cvvCartao || !qtdParcelas) {
                alert("Por favor, preencha todos os campos do cartão!");
                return;
            }
        
            const dadosCartao = {
                nomeTitularCartao, 
                numeroCartao,
                validadeCartao, 
                cvvCartao, 
                qtdParcelas
            };
        
            localStorage.setItem('metodoPagamento', JSON.stringify(metodoPagamentoSelecionado));
            localStorage.setItem('dadosCartao', JSON.stringify(dadosCartao));

            console.log("Método Pagamento Selecionado: " + JSON.parse(localStorage.getItem('metodoPagamento')));
            console.log(JSON.parse(localStorage.getItem('dadosCartao')));

            window.location.href = "../pages/resumo-pedido.html/";
            
        } else if (metodoPagamentoSelecionado === "PIX") {
            localStorage.setItem('metodoPagamento', JSON.stringify(metodoPagamentoSelecionado));
            console.log("Método Pagamento Selecionado: " + JSON.parse(localStorage.getItem('metodoPagamento')));
            
            window.location.href = "../pages/resumo-pedido.html";
        }
    });
}

definirMetodoPagamento();
salvarMetodoPagamento();
