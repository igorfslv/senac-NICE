const nomeCliente = document.getElementById("nome-cliente");
const cpfCliente = document.getElementById("cpf-cliente");
const dataNascimentoCliente = document.getElementById("data-nascimento-cliente");
const generoCliente = document.getElementById("genero-cliente");

const cepClienteFaturamento = document.getElementById("cep-cliente-faturamento");
const logradouroClienteFaturamento = document.getElementById("logradouro-cliente-faturamento");
const numeroClienteFaturamento = document.getElementById("numero-cliente-faturamento");
const complementoClienteFaturamento = document.getElementById("complemento-cliente-faturamento");
const bairroClienteFaturamento = document.getElementById("bairro-cliente-faturamento");
const cidadeClienteFaturamento = document.getElementById("cidade-cliente-faturamento");
const ufClienteFaturamento = document.getElementById("uf-cliente-faturamento");

const cepClienteEntrega = document.getElementById("cep-cliente-entrega");
const logradouroClienteEntrega = document.getElementById("logradouro-cliente-entrega");
const numeroClienteEntrega = document.getElementById("numero-cliente-entrega");
const complementoClienteEntrega = document.getElementById("complemento-cliente-entrega");
const bairroClienteEntrega = document.getElementById("bairro-cliente-entrega");
const cidadeClienteEntrega = document.getElementById("cidade-cliente-entrega");
const ufClienteEntrega = document.getElementById("uf-cliente-entrega");

const emailCliente = document.getElementById("email-cliente");
const senhaCliente = document.getElementById("senha-cliente");
const confirmarSenhaCliente = document.getElementById("confirmar-senha-cliente");
const btnInscreverSe = document.getElementById("btn-inscrever-se");

const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const btnAtualizarCadastroCliente = document.getElementById("btn-atualizar-cadastro-cliente");
const btnAddEnderecoEntrega = document.getElementById("btn-add-endereco-entrega");
let novosEnderecos = []
let enderecoPadraoIndex = 0
let indexEnderecos = 0

fetch(`http://localhost:8080/cliente/${usuarioLogado.id}`)
    .then(response => response.json())
    .then(result => {
        // Atribuindo valores aos campos de informações pessoais
        nomeCliente.value = result.nome;
        cpfCliente.value = result.cpf;
        dataNascimentoCliente.value = result.dataDeNascimento.split("T")[0]; // Pegando apenas a data
        console.log(generoCliente.options[3].text.toUpperCase().replace(/\s/g, "_"))
        console.log(result.genere)
        console.log(result)

        for (let i = 0; i < generoCliente.options.length; i++) {
            if (generoCliente.options[i].text.toUpperCase().replace(/\s/g, "_") == result.genere) {
                generoCliente.selectedIndex = i
            }

        }

        // Atribuindo valores aos campos de endereço de faturamento
        const faturamento = result.enderecoDeFaturamento;
        cepClienteFaturamento.value = faturamento.cep;
        logradouroClienteFaturamento.value = faturamento.logradouro;
        numeroClienteFaturamento.value = faturamento.numero;
        complementoClienteFaturamento.value = faturamento.complemento;
        bairroClienteFaturamento.value = faturamento.bairro;
        cidadeClienteFaturamento.value = faturamento.cidade;
        ufClienteFaturamento.value = faturamento.uf;

        // Atribuindo valores aos campos de endereço de entrega


        // Atribuindo valores aos campos de email e senha
        emailCliente.value = result.email;
        senhaCliente.value = ''; // Deixar vazio por motivos de segurança
        confirmarSenhaCliente.value = ''; // Deixar vazio por motivos de segurança

        result.enderecosDeEntrega.forEach((entrega, index) => {
            // Clonando a div original
            const novoEndereco = document.getElementById('enderecos-container');
        
            novoEndereco.innerHTML += `<div class="inscricao-dados-inputs">
                <section class="formulario-cep-entrega">
                    <label for="cep-cliente-e">CEP</label>
                    <span>
                        <input type="text" name="cep-cliente-entrega" id="cep-cliente-entrega-${index}" placeholder="00000-000" 
                        value="${entrega.cep}" disabled>              
                    </span>
                </section>

                <div class="enderecos">
                    <div>
                        <div>
                            <label for="logradouro-cliente-entrega">Logradouro</label>
                            <input type="text" name="logradouro-cliente-entrega" id="logradouro-cliente-entrega-${index}" class="logradouro-cliente-entrega"
                            value="${entrega.logradouro}" placeholder="Ex.: Rua das Camélias" disabled>
                        </div>
                        <div>
                            <label for="numero-cliente-entrega">Número</label>
                            <input type="text" name="numero-cliente-entrega" id="numero-cliente-entrega-${index}" class="numero-cliente-entrega"
                            value="${entrega.numero}" disabled>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="complemento-cliente-entrega">Complemento</label>
                            <input type="text" name="complemento-cliente-entrega" id="complemento-cliente-entrega-${index}" class="complemento-cliente-entrega" 
                            value="${entrega.complemento}" disabled>
                        </div>
                        <div>
                            <label for="bairro-cliente-entrega">Bairro</label>
                            <input type="text" name="bairro-cliente-entrega" id="bairro-cliente-entrega-${index}" class="bairro-cliente-entrega" 
                            value="${entrega.bairro}" disabled>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="cidade-cliente-entrega">Cidade</label>
                            <input type="text" name="cidade-cliente-entrega" id="cidade-cliente-entrega-${index}" class="cidade-cliente-entrega"
                            value="${entrega.cidade}" disabled>
                        </div>
                        <div>
                            <label for="uf-cliente-entrega">UF</label>
                            <input type="text" name="uf-cliente-entrega" id="uf-cliente-entrega-${index}" class="uf-cliente-entrega"
                            value="${entrega.uf}" disabled>
                        </div>
                    </div>
                    <div class="endereco-padrao-container">
                        <input type="radio" name="endereco-padrao" value="${index}" id="endereco-padrao-${index}" ${entrega.enderecoPadrao ? "checked" : ""}>
                        <label for="endereco-padrao-${index}">Endereço Padrão</label>
                    </div>
                </div>
            </div>
            <div class="separador"></div>
            `;

            if (entrega.enderecoPadrao) {
                enderecoPadraoIndex = index
            }

            indexEnderecos++


        });
        
        
        // Captura a seleção do endereço padrão
        novoEnderecoFoiAdicionado()
        
        
 
        


    })
    .catch(error => console.error('Erro ao buscar os dados do cliente:', error));


    function novoEnderecoFoiAdicionado() {
        const radioButtons = document.querySelectorAll('input[name="endereco-padrao"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', (event) => {

                enderecoPadraoIndex = event.target.value

                const selectedValue = event.target.value; // Captura o valor (índice do endereço)
                console.log("Endereço padrão selecionado:", enderecoPadraoIndex);
                // Aqui você pode salvar a informação como desejar, por exemplo, enviar para um servidor ou armazenar em uma variável
            });
        });
    }

    btnAtualizarCadastroCliente.addEventListener("click", (event) => {
        event.preventDefault();

        const senhaClienteValor = senhaCliente.value
        const confirmarSenhaClienteValor = confirmarSenhaCliente.value

        if (senhaClienteValor != confirmarSenhaClienteValor) {
            alert("As senhas devem ser iguais!")
            return
        } else {
            const data = {
                nome: nomeCliente.value,
                cpf: cpfCliente.value,
                dataDeNascimento: dataNascimentoCliente.value,
                genere: generoCliente.options[generoCliente.selectedIndex].text.replace(/\s+/g, "_").toUpperCase(),
                enderecosDeEntrega: novosEnderecos,
                enderecoPadrao: enderecoPadraoIndex,
                senha: senhaClienteValor
            }
    
            console.log(data)
    
            
    
            fetch(`http://localhost:8080/cliente/atualizar/${usuarioLogado.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(result => {
                    alert("Cliente " + result.nome + " atualizado com sucesso!");
                })
        }
       

       



        
            


    })
    
    

    btnAddEnderecoEntrega.addEventListener("click", (event) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário
    
        // Exibe o alert (agora a página não vai atualizar antes)
        alert("Endereço adicionado!");
    
        // Pega os valores dos inputs
        const cepClienteEntrega = document.getElementById("cep-cliente-novo").value;
        const logradouroClienteEntrega = document.getElementById("logradouro-cliente-novo").value;
        const numeroClienteEntrega = document.getElementById("numero-cliente-novo").value;
        const complementoClienteEntrega = document.getElementById("complemento-cliente-novo").value;
        const bairroClienteEntrega = document.getElementById("bairro-cliente-novo").value;
        const cidadeClienteEntrega = document.getElementById("cidade-cliente-novo").value;
        const ufClienteEntrega = document.getElementById("uf-cliente-novo").value;
    
        // Cria um objeto com os valores dos inputs
        const novoEndereco = {
            cep: cepClienteEntrega,
            logradouro: logradouroClienteEntrega,
            numero: numeroClienteEntrega,
            complemento: complementoClienteEntrega,
            enderecoPadrao: false,
            bairro: bairroClienteEntrega,
            cidade: cidadeClienteEntrega,
            uf: ufClienteEntrega
        };
    
        // Log para verificar o objeto
        console.log(novoEndereco);
        
        const documentNovoEndereco = document.getElementById('enderecos-container');
        let index = indexEnderecos + novosEnderecos.length
        console.log(index)

        documentNovoEndereco.innerHTML += `<div class="inscricao-dados-inputs">
                <section class="formulario-cep-entrega">
                    <label for="cep-cliente-e">CEP</label>
                    <span>
                        <input type="text" name="cep-cliente-entrega" id="cep-cliente-entrega-${index}" placeholder="00000-000" 
                        value="${novoEndereco.cep}" disabled>              
                    </span>
                </section>

                <div class="enderecos">
                    <div>
                        <div>
                            <label for="logradouro-cliente-entrega">Logradouro</label>
                            <input type="text" name="logradouro-cliente-entrega" id="logradouro-cliente-entrega-${index}" class="logradouro-cliente-entrega"
                            value="${novoEndereco.logradouro}" placeholder="Ex.: Rua das Camélias" disabled>
                        </div>
                        <div>
                            <label for="numero-cliente-entrega">Número</label>
                            <input type="text" name="numero-cliente-entrega" id="numero-cliente-entrega-${index}" class="numero-cliente-entrega"
                            value="${novoEndereco.numero}" disabled>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="complemento-cliente-entrega">Complemento</label>
                            <input type="text" name="complemento-cliente-entrega" id="complemento-cliente-entrega-${index}" class="complemento-cliente-entrega" 
                            value="${novoEndereco.complemento}" disabled>
                        </div>
                        <div>
                            <label for="bairro-cliente-entrega">Bairro</label>
                            <input type="text" name="bairro-cliente-entrega" id="bairro-cliente-entrega-${index}" class="bairro-cliente-entrega" 
                            value="${novoEndereco.bairro}" disabled>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="cidade-cliente-entrega">Cidade</label>
                            <input type="text" name="cidade-cliente-entrega" id="cidade-cliente-entrega-${index}" class="cidade-cliente-entrega"
                            value="${novoEndereco.cidade}" disabled>
                        </div>
                        <div>
                            <label for="uf-cliente-entrega">UF</label>
                            <input type="text" name="uf-cliente-entrega" id="uf-cliente-entrega-${index}" class="uf-cliente-entrega"
                            value="${novoEndereco.uf}" disabled>
                        </div>
                    </div>
                    <div class="endereco-padrao-container">
                        <input type="radio" name="endereco-padrao" value="${index}" id="endereco-padrao-${index}" ${novoEndereco.enderecoPadrao ? "checked" : ""}>
                        <label for="endereco-padrao-${index}">Endereço Padrão</label>
                    </div>
                </div>
            </div>
            <div class="separador"></div>
            `

            novosEnderecos.push(novoEndereco)
            novoEnderecoFoiAdicionado()


    });
    



