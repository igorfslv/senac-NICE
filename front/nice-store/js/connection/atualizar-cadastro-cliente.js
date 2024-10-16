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

        

        result.enderecosDeEntrega.forEach(entrega => {
            // Clonando a div original
            const novoEndereco = document.getElementById('enderecos-container');
        
            novoEndereco.innerHTML += `<div class="enderecos">
                                            <div>
                                                <div>
                                                    <label for="logradouro-cliente-entrega">Logradouro</label>
                                                    <input type="text" name="logradouro-cliente-entrega" id="logradouro-cliente-entrega" class="logradouro-cliente-entrega"
                                                    value=${entrega.cep} placeholder="Ex.: Rua das Camélias" disabled>
                                                </div>
                                                <div>
                                                    <label for="numero-cliente-entrega">Número</label>
                                                    <input type="text" name="numero-cliente-entrega" id="numero-cliente-entrega" class="numero-cliente-entrega"
                                                    value=${entrega.numero} disabled>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <label for="complemento-cliente-entrega">Complemento</label>
                                                    <input type="text" name="complemento-cliente-entrega" id="complemento-cliente-entrega" class="complemento-cliente-entrega" 
                                                    value=${entrega.complemento} disabled>
                                                </div>
                                                <div>
                                                    <label for="bairro-cliente-entrega">Bairro</label>
                                                    <input type="text" name="bairro-cliente-entrega" id="bairro-cliente-entrega" class="bairro-cliente-entrega" 
                                                    value=${entrega.bairro} disabled>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <label for="cidade-cliente-entrega">Cidade</label>
                                                    <input type="text" name="cidade-cliente-entrega" id="cidade-cliente-entrega" class="cidade-cliente-entrega"
                                                    value=${entrega.cidade} disabled>
                                                </div>
                                                <div>
                                                    <label for="uf-cliente-entrega">UF</label>
                                                    <input type="text" name="uf-cliente-entrega" id="uf-cliente-entrega" class="uf-cliente-entrega"
                                                    value=${entrega.uf} disabled>
                                                </div>
                                            </div>
                                            <div class="endereco-padrao-container">
                                                <input type="radio" name="endereco-padrao" ${entrega.enderecoPadrao ? "checked" : "unchecked"}>
                                                <label>Endereço Padrão</label>
                                            </div>
                                        </div> <hr>  <br>`
        
         
           
        });

    })
    .catch(error => console.error('Erro ao buscar os dados do cliente:', error));


const listaDeEnderecos = [ // Lista com o número de réplicas que você quer criar
    { logradouro: "Rua das Camélias", numero: "123", complemento: "Apt 1", bairro: "Centro", cidade: "São Paulo", uf: "SP" },
    { logradouro: "Avenida Paulista", numero: "456", complemento: "", bairro: "Bela Vista", cidade: "São Paulo", uf: "SP" },
    { logradouro: "Rua das Flores", numero: "789", complemento: "Casa 2", bairro: "Jardim", cidade: "São Paulo", uf: "SP" }
];



//console.log(result.enderecosDeEntrega.length)

// Iterando sobre a lista de endereços

