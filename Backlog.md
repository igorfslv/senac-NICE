# Backlog do Produto 

Inicialmente é apresentado pelo _Instrutor_ da matéria de PI o Backlog geral do produto contendo informações básicas e necessárias do projeto, em seguida o _Instrutor_ no papel de `Scrum Master` divide o `Backlog do Produto` em 06 Sprints de duração 14 dias cada. 

No primeiro dia da Sprint _(que sempre cai no dia da aula)_,  é apresentado os requisitos da Sprint, neste momento é reservado um tempo para que os alunos possam entrar em maiores detalhes e tire suas dúvidas, os grupos tem 14 dias corridos _(2 semanas)_ até a próxima Sprint para desenvolver os requisitos solicitados. 

No último dia de cada Sprint o _Instrutor_ realiza uma avaliação dos requisitos atendidos pelo `Sistema` e atribui uma nota ao grupo sobre aquela Sprint. _A apresentação de cada grupo é realizada de forma individual._ 

Após todas a avaliações, é apresentada a próxima Sprint e seus requisitos, _o último dia da Sprint anterior é o primeiro dia da Sprint seguinte_.

Por conta da grade curricular e cronograma de aulas, as Sprints não podem sofrer alterações para que não haja imprevistos na data final de entrega do `Sistema`. O(s) grupo(s) que não entregarem ou atenderem todos os requisitos de uma Sprint entram em `débito técnico`, podendo entregar os requisitos em atraso na próxima Sprint com 50% da nota daquele requisito. 


## Esquema de Data/Nota de cada Sprint

A tabela a seguir informa a quantidade de Sprints, seus pesos correspondentes para cada avaliação, e a data que foi realizada a avaliação _(que corresponde ao último dia da Sprint)_. Após as 06 Sprints concluídas acontece a última avaliação chamada _Final_, nela o instrutor passar por todas funcionalidades cruciais do `Sistema`, com todas elas em funcionamento correto é atribuido a nota com base no peso.

Sprint|Sprint 1|Sprint 2|Sprint 3|Sprint 4|Sprint 5|Sprint 6|Final|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|Data|09/09/24|23/09/24|07/10/24|21/10/24|11/11/24|25/11/24|02/12/24|
|Peso|1|2|4|8|16|32|64|
	
A média é calculada com a Seguinte Formula:

```
Média = ( (nota1 * 1) + (nota2 * 2) + (nota3 * 4) + (nota4 * 8)  +  (nota5 * 16) +  (nota6 * 32) + (notaFinal * 64) ) / 127
```

# SprintPlanning

O _Instrutor_ da matéria também solicita que o grupo organize as Sprints dentro de um _To do List_ no estilo _Kanban_, o recomendado pelo mesmo é a plataforma _Trello_, os mesmos integrantes do grupo e também o próprio _Instrutor_ devem fazer parte da equipe dentro da plataforma. 

Durante o período de uma Sprint o grupo se responsabiliza entre os integrantes a distribuição de tarefas e o tempo em que cada um realizará.


Por questões de visualização enumeramos os requisitos em 04 digitos em sequência `#0000`, sendo os 02 primeiros digitos `#00XX` representado pela Sprint a qual aquele requisito pertence, e os dois últimos digitos `#XX00` a ordem daquele requisito dentro daquela Sprint. Exemplo `#0101` representa o requisito um da primeira Sprint.

>Para requisitos que possam conter um segundo caminho ou condição incluimos em uma lista de itens `(A); (B); (C) ... etc` para cada variação.
>
>Foram adicionadas pequenas alterações nos textos que descrevem os requisitos pois poderiam dar um entendimento diferente dependendo do contexto.


# Sprint 01

### Requisito #0101
#### **Narrativa:**
- **Como Um :** `Usuário` não logado.
- **Eu quero/Eu posso:** Me identificar no `Sistema`.
- **Para que:** Possa entrar no Backoffice.

#### **Critério(s) de aceite:**

  1. Os dados de login devem ser validados no banco de dados _(O login é o email do_ `Usuário` _cadastrado)._
     - A senha do `Usuário` deve ser encriptada no início antes de validação no banco de dados _( o dado no banco de dados também estará encriptado)._ 
        - (A). Não localizando o `Usuário`, o Sistema deve negar a entrada no Backoffice.
        - (B). Com `Usuário` localizado, o `Sistema` deve cair na tela principal do Backoffice _(somente se o `email` e `senha` estiverem corretos e o campo `Status = ativo`)_, onde terão os botões de `listar produtos` _(para todos os personas*)_; E `lista de usuários` somente para `Administrador`.
        - (C). Se o `Usuário` estiver com o `Status = inativo` o `Sistema` deve negar a entrada no Backoffice.
>   
> *Personas* ou *personagens* são todos os tipos de perfis que podemos classificar dentro do `Sistema`, em _Nice Store_ temos os personas `Administrador`, `Estoquista` e `Cliente`.      

2. O Sistema deve perguntar qual opção o `Usuário` quer acessar _(1 para listar produto e 2 – quando usuário for Administrador – para listar usuário).
    - Estando logado o `Sistema` deve criar a sessão com o usuáro e seu grupo (podendo ser `Administrador` ou `Estoquista`). Esta Tela é a de `Usuário` e portanto, se um `Cliente` entrar com email e senha o mesmo deve ser rejeitado.
   >Esta tela de login é apenas para `Usuários` de Backoffice.
>`Usuários` são classificados com o personas `Administrador` e `Estoquista`.

---

### Requisito #0102
#### **Narrativa:**
- **Como Um :** Administrador.
- **Eu quero/Eu posso:** Listar Usuário.
- **Para que:** Possa acessar as opções de incluir, alterar e habilitar/desabilitar.
  
#### **Critério(s) de aceite:** 
1. Na tela principal do Backoffice, ao selecionar `Listar Usuários` o `Sistema` deve listar todos os `Usuários` cadastrados mostrando o `ID`_(sequencial numérico)_, `Nome`, `Email`, `Status` e `Grupo`.
    - O `Sistema` deve permitir escolher um dos `Usuários`_(selecionando seu ID)_ para a tela de opções de usuário ou 0 para voltar a tela principal do backoffice oi I para incluir usuário.
 
---

### Requisito #0103
#### **Narrativa:**
- **Como Um :** Administrador.
- **Eu quero/Eu posso:** Cadastrar um Usuário.
- **Para que:** Possa incluir um novo acesso ao Backoffice.

#### **Criterio(s) de Aceite:**
1. Cadastrar o `Nome` do Usuário, `CPF`, `Email`, `Grupo` e `Senha` no banco de dados. No cadastro, pedir a senha 2 vezes. 
    - Só permitir o cadastro quando as 2 senhas estiverem iguais.Validar email do usuário. A senha deve ser encriptada antes de enviar para o banco de dados.
   - O novo Usuário cadastrado sempre é registrado com o `Status = Ativo`. Não é permitido cadastrar dois usuários com mesmo login(`Email`). 
   - O `CPF` deve ser validado antes da gravação.
   - Os grupos permitidos são – `Administrador` ou `Estoquista`.

---

### Requisito #0104
#### **Narrativa:**
- **Como Um :** Administrador.
- **Eu quero/Eu posso:** Escolher opção de editar `Usuário`.
- **Para que:** Possa alterar dados do usuário e ativá-lo ou desativa-lo.

#### **Critério(s) de aceite:**

- Ao entrar a tela deve listar os dados os dados do usuário escolhido – id, nome, cpf, e-mail, status, grupo.
- Listar o dado do usuário escolhido, id, nome, cpf, e-mail, status e grupo. Listar as opções para o usuário – 1) Alterar usuário, 2) Alterar senha, 3) Ativar/Desativar, 4 voltar a listar usuário. Ler a opção selecionada pelo usuário.

---

### Requisito #0105
#### **Narrativa:**
- **Como Um :** Administrador.
- **Eu quero/Eu posso:** Alterar um usuário.
- **Para que:** Possa manter os dados de um usuário no backoffice.

#### **Critério(s) de aceite:**
1. Critério 01:
   - Ao entrar a tela deve listar os dados os dados do usuário escolhido – id, nome, cpf, e-mail, status, grupo. É permitido apenas alterar o grupo (se não for o usuário logado no momento). É permitido alterar o nome, cpf e grupo. Não é permitido alterar o email.
   - As validações de cpf, grupo e email devem ser feitas. Toda alteração deve refletir no banco de dados. Se selecionar o N em salvar deve voltar para a tela anterior.

---

### Requisito #0106
#### **Narrativa:**
- **Como Um :** Administrador.
- **Eu quero/Eu posso:** Alterar Senha.
- **Para que:** Possa Alterar a senha de acesso do usuário.

#### **Critério(s) de aceite:**
1. Critério 01:
   - Ao entrar a tela deve listar os dados do usuário escolhido – id, nome, cpf, e-mail, status, grupo. É preciso entrar com a senha 2 vezes e ela deve ser atualizada no banco de forma encriptada. Se a senha e contra senha não forem iguais, o sistema não pode permitir a troca. Se selecionar o N em salvar deve voltar para a tela anterior.

   
---

### Requisito #0107
#### **Narrativa:**
- **Como Um :** Administrador.
- **Eu quero/Eu posso:** Ativar ou Desativar um usuário.
- **Para que:** Remover ou conceder acesso a um usuário cadastado no Backoffice.

#### **Critério(s) de aceite:**
1. Critério 01:
   - Ao entrar a tela deve listar os dados os dados do usuário escolhido – id, nome, cpf, e-mail, status, grupo. Deve apresentar a opção contrária do status do usuário. Se o status do usuário estiver ativo a mensagem é para `Desativar Usuário` ou se o usuário estiver desativado a mensagem será `Ativar Usuário`. Ao selecionar salvar Y, o sistema deve atualizar o status contrário no banco de dados. Se selecionar o N em salvar deve voltar para a tela anterior.
   

# Sprint 02
### Requisito #0201
#### **Narrativa:**
- **Como Um :** Administrador.
- **Eu quero/Eu posso:** Listar os produtos da loja
- **Para que:** Possa incluir, alterar, visualizar e habilitar/inabilitar o produto.

#### **Critério(s) de aceite:**
1. Após sucesso com login de `Administrador`, a tela principal do Backoffice terá o botão de `Listar Produtos`.
    - Ao clicar no botão haverá a abertura da tela de `produtos` e ela, por default, deve fazer a busca de todos os produtos no banco de dados e listar os últimos (decrescente) produtos inseridos na base.
    - Um campo de busca de produto, com busca parcial - Ex. smart _(vai trazer todos produtos que conter 'smart'no_ `Nome do Produto`_)_.
2. A lista deve apresentar o `Código do Produto`, o `Nome do Produto`, a `Quantidade em Estoque`, o `Valor` e o `Status` (`Ativo` ou `Inativo`).
    - Terá um botão para requisitar a tela de cadastro de novo produto _(representado por um sinal de_ `+`_)._
    - Listará no máximo 10 produtos na página e criará uma barra de paginação.
    - Para cada produto um ícone/link com a ação permitida para o produto _(alterar, inativar, reativar, visualizar)._
    

---

### Requisito #0202
#### **Narrativa:**
- **Como Um :** Administrador.
- **Eu quero/Eu posso:** Cadastrar um novo produto e suas imagens.
- **Para que:** Possa disponibilizar o produto na loja.

#### **Critério(s) de aceite:**

 1. Incluir dados:
    - Nome de produto (max 200 caracteres); 
    - Avaliação (de min.1 - max.5 variando de 0,5 em 0,5) 
    - Descrição detalhada (max.2000 caracteres); 
    - Preço Produto (valor monetário) de 2 casas decimais
    - Quantidade em estoque (valor inteiro).
 2. Incluir e associar multiplas imagens ao mesmo produto (não limitado).
    - Nas imagens, uma delas tem que ser definida como padrão.
    - A imagem tem que ser carregada antes no diretório do projeto (pelo botão procurar).
    - Ao carregar a imagem o sistema deve trocar o nome e armazenar o caminho com o novo nome no banco de dados. (para remontar o caminho novamente apenas consultando o banco)
    - É necessário criar um marcador na imagem que será considerada principal e será mostrada na página de landing page.
 3. Botão salvar
    - Salva o produto e as referencias das imagens no banco de dados e volta para a tela de lista de produto.
    - Botão cancelar, volta para a tela de lista de  produto.
    - Os dados tem que ser gravados no banco de dados.


---

### Requisito #0203
#### **Narrativa:**
- **Como Um :** Administrador.
- **Eu quero/Eu posso:** Alterar um produto ou suas imagens.
- **Para que:** Possa manter o produto atualizado na loja.

#### **Critério(s) de aceite:**

 1. Como administrador, alterar todas as informações e imagens de um produto.
    - Estas alterações tem que ser refletidas no banco de dados.

---

### Requisito #0204
#### **Narrativa:**
- **Como Um :** Administrador.
- **Eu quero/Eu posso:** Habilitar/inabilitar um produto na loja.
- **Para que:** Possa colocar ou retirar um produto da página principal.

#### **Critério(s) de aceite:**

 1. Não é preciso entrar em tela de edição
    - Ao clicar no botão de inativar/reativar, é alternado o flag do produto referente ao Status. Se ele estiver ativo, deve mudar para inativo e se estiver inativo deve mudar para ativo.
    - Antes de mudar é necessario aparecer um pop-up (na tela) perguntando se confirma ou não a alteração.
    - Estas alterações tem que ser gravadas no banco de dados.

---

### Requisito #0205
#### **Narrativa:**
- **Como Um :** Estoquista
- **Eu quero/Eu posso:** Listar os produtos da loja
- **Para que:** Possa visualizar os produtos que eu posso alterar

#### **Critério(s) de aceite:**

1. Após o login do Estoquista com sucesso, na tela principal do backoffice terá o botão de Produtos.
    - Ao clicar no botão haverá a abertura da tela de produtos e ela, por default, deve fazer a procura de todos os produtos e listar os últimos (decrescente) produtos inseridos na base.
    - Um campo de busca de produto, com busca parcial - Ex. smart (vai trazer tudo que conter smart no nome do produto.
    - A lista deve apresentar o código do produto, o nome do produto, a quantidade em estoque, o valor e o status (ativo ou desativado)
    - Listará no máximo 10 produtos na página e criará uma barra de paginação.
    - Para cada produto um ícone/link com a ação permitida para o produto (apenas alterar).

---

### Requisito #0206
#### **Narrativa:**
- **Como Um :** Estoquista.
- **Eu quero/Eu posso:** Alterar a quantidade de produtos no estoque.
- **Para que:** Entrar ou retirar produtos do estoque.

#### **Critério(s) de aceite:**

1. Entrar na tela de alteração de produto.
    - Todos os campos devem estar desabilitados. Apenas o campo de quantidade pode ser alterada.
    - É possível, como estoquista, alterar apenas a qtd de produto.
    - Estas alterações tem que ser refletidas no banco de dados.
    
### Requisito #0207
#### **Narrativa:**
- **Como Um :** Administrador
- **Eu quero/Eu posso:** Visualizar um produto como é vendido na loja
- **Para que:** Identificar qualquer má informação da página de detalhe.

#### **Critério(s) de aceite:**

1. Tela vai mostrar como a página de detalhe do produto será mostrada para o `Cliente` final.
    - O botão de comprar, nesta tela, ficará desabilitado.
    - O carrocel com as imagens deve ser funcional, aparecer o produto, a avaliação.

# Sprint 03

Sprint
Como Um
Eu quero, eu posso
Para que
Critério de aceite
3
Cliente Logado, Cliente não logado
Escolher um produto na pagina principal
Eu posssa ver os detalhes desse produto
 - Tem que ter o logo da loja.
 - Ter os ícones de carrinho no lado direito.
 - Ter o link (não precisa funcionar) para identificação do cliente (faça login/crie seu login)
 - A lista de produto tem que ser no formato de cards e apresentar a imagem configurada como principal no cadastro.
 - deve conter no card, pelo menos, a imagem principal cadastrada, o nome do produto, preço e um botão para detalhe.
 - Ao clicar no detalhe abrir a página de detalhe do produto
3
Cliente Logado, Cliente não logado
Visualizar os detalhes do produto selecionado na landing page
Possa ver mais detalhes e imagens do produto e poder colocá-lo no carrinho
 - O carrocel com as imagens deve ser funcional
 - Deve apresentar nome do produto, descrição detalhada, valor, a avaliação
 - semelhante a tela criada no sprint 2 (Visualizar um produto como é vendido na loja)
- clicando em comprar o produto é colocado no carrinho.
- O carrinho acumula os produtos selecionados
3
Cliente não Logado ou Cliente Logado
Colocar um produto no carrilho de compras
Posso adicionar o produto ao meu carrinho de compras
- Posso comprar 2 vezes o mesmo produto e irá adicionar mais 1 item a quantidade.
- ao clicar em comprar, na página de detalhe ou principal, deve ser redirecionado para o carrinho ou página inicial (continuar comprando - o indicador do carrinho precisa adicionar mais um item)
- Este item deve estar gravado no carrinho (sessão, banco, o que escolher)
3
Cliente não Logado ou Cliente Logado
Adicionar mais um produto ao carrinho
Possa incluir um produto a mais no carrinho de compras
-- Posso aumentar os itens  de um produto no carrinho.
- O subtotal deve ser recalculado
- O subtotal deve levar em consideração o frete calculado
3
Cliente não Logado ou Cliente Logado
Diminuir um produto do carrinho
Possa diminuir o n[umero do mesmo produto no carrinho
-- Posso diminuir os itens  de um produto no carrinho.
- O subtotal deve ser recalculado
- O subtotal deve levar em consideração o frete calculado
3
Cliente não Logado ou Cliente Logado
Remover um produto do carrinho
Posssa remever todos os itens de um produto no carrinho
-- Posso remover o item de um produto no carrinho.
- O subtotal deve ser recalculado
- O subtotal deve levar em consideração o frete calculado
3
Cliente não Logado
Calcular o frete para meu CEP
Possa ver o total estimado da compra para o cep informado
 - - O frete para cliente não logado é de livre escolha
- Escolher entre 3 valores de frete.

# Sprint 04

Sprint 
Como um 
Eu quero, Eu posso 
Para que 
Critérios de aceite 
4 
Cliente não logado 
Escolher Cadastrar-se na tela de login (criar nova conta) 
Possa informar os dados de cadastro 
- O email do cliente não pode existir na base. 
 - O cpf deve ser único e validado. 
 - O endereço de faturamento é obrigatório (endereço completo no formato dos correios- CEP, logradouro, Número, complemento, bairro, cidade, uf) 
 - Dados, nome completo, data de nascimento, genero também devem ser lidos. 
 - O cep deve vir validado por uma api - ex - https://viacep.com.br/ws/09760280/json/ 
 - O endreço de entrega é obrigatório e pode ser copiado do endereço de faturamento. 
 - O endreço de entrega pode ter mais de um. (vários). 
 - O nome do cliente tem que ter 2 palavras e no mínimo 3 letras em cada palavra. 
 - Senha encriptada no banco de dados. 
 - Ao final do cadastro o cliente armazenado na base de dados. 
 - O cliente deve ser direcionado a tela de login. 
4 
Cleinte  logado 
Alterar os dados do cliente 
Para que eu possa modificar os dados do meu cadastro. 
-Permitido a troca do nome do cliente logado, data de nascimento e genero. 
 - Deve ser permitido também a alteração da senha. 
 - Você pode incluir mais endereços de entrega. 
4 
Cleinte  logado 
adicionar novos endereços de entrega 
Poder adicionar novos endereços de entrega e ecolher os endereços padrões. 
- Deve permitir a alteração do cadastro para incluir um novo endereço de entrega. 
 - A partir do segundo endereço, é possível escolher qual endereço é o endereço Padrão (que será pré-carregado) no checkout. 
 A validação e funcionalidade (consulta a api) do endereço é a mesma do cadastramento. 
4 
Cliente logado 
Editar o endereço padrão de entrega  
Fazer a loja faça a entrega no endereço correto 
- Permitir a mudança se o endereço de entrega é padrão ou não. Não é permitido alterar os dados de endereço de entrega. Deve-se adicionar um novo. 
4 
cliente não logado 
Informar meus dados de login 
Possa me identificar no sistema 
-Validar usuário e senha (usuário = email) no banco de dados. 
 - Se existir, cria sessão com o cliente logado. 
 - Caso não exista ele deve gerar erro informando que não localizou o usuário e/ou senha 
4 
Cliente logado 
Deslogar do Sistem 
Possa limpar a sessão do sistema 
- Alertar que está da sainda da sessão 
 - Limpar a sessão do login do cliente 

# Sprint 05

print
Agrupador
Como Um
Eu quero
Para quê
Critérios de Aceitação
5
Carrinho de compras
Cliente não Logado ou Cliente Logado
Fazer o checkout do carrinho (Finalizar a Compra)
Possa me registrar no sistema e finalziar compra
- Caso o cliente não esteja logado, ao clicar em finalizar pedido o sistema deve enviar para a tela de login do cliente.
- Se for cliente logado, tela de inicio de checkout
- Na tela de login o cliente pode selecionar cadastre-se e ser enviando ao cadastro de cliente.
- Ao finalizar o cadastro, o cliente deve ser redirecionado ao carrinho (pode ser manual). - O carrinho não se perde no cadastro do cliente.
5
Chechout
Cliente Logado
Escolher meu endereço de entrega
Possa me registrar no sistema e finalziar compra
- Opção de escolher um dos endereços cadastrados como endereço de entrega
- O cliente deverá escolher um dos endereços válidos (marcados como endereço de entrega) para entrega do produto.
- O sistema só deve permitir passar para a próxima etapa (escolher a forma de pagamento) se um endereço estiver selecionado.
5
Chechout
Cliente Logado
Adicionar um endereço de entrega
Possa adicionar um endereço de entra a mais para o cliente
 - Opção de adicionar um endereço de entraga
- O sistema só deve permitir passar para a próxima etapa (escolher a forma de pagamento) se um endereço estiver selecionado.
5
Chechout
Cliente Logado
Escolher uma forma de pagamento
possa escoher como pagar meu pedido
 - O cliente poderá escolher entre, pelo menos, 2 formas de pagamento. No Mínimo – boleto ou cartão.
- No caso de cartão, o mesmo deve pedir o número, código verificador, Nome Completo, data de vencimento e quantidade de parcelas.
- O sistema só deve permitir passar para a próxima etapa (Validar pedido final) se uma forma de pagamento estiver selecionado e/ou preenchida.
5
Chechout
Cliente Logado
Visualizar o resumo de meu pedido
Possa corrigir qualquer produto ou endereço no pedido
- Tela de resumo do pedido, com todos os produtos, valores unitários, quantidades, valores totais, frete, total geral, endereço de entrega, forma de pagamento e apresentar o botão de concluir compra e voltar.
- clicou em voltar o sistema volta para escolha de pagamento.
- Esta tela pode estar buscando da sessão ou do banco
5
Chechout
Cliente Logado
Finalizar a compra
Possa adquirir os produtos da cesta com entrega no endereço selecionado e forma de pagamento selecionada
-- Ao ser concluído o pedido, o mesmo deve ser criado no banco com o status de “aguardando pagamento”.
- Um número sequencial do pedido deve ser gerado
- Um aviso na tela informando o número do pedido, valor e se foi gravado com sucesso ou erro deve ser mostrado ao cliente
5
Meus Pedidos
Cliente Logado
Visualizar a lista de pedidos e status
Possa ver o histórico e acompanhar o status de entrega do pedido
- No cliente, ter um ítem de menu para poder visualizar os pedidos criados.
- Este menu lista todos os pedidos informando o número, data, valor total, status e botão de mais detalhe.



# Sprint 06

Sprint
Como Um
Eu quero
Para quê
Critérios de Aceitação
6
Cliente Logado
Visualizar detalhe do pedido
(semelhante a história do sprint 5 "visualizar o resumo do meu pedido")
Possa visualizar os detalhes dos itens pedido, o endereço e forma pagamento do pedido.
- Semelhante a tela de "visualizar o resumo do meu pedido" sem o botão de concluir compra e voltar.
- Os dados recuperados para esta tela devem vir do banco de dados.
Tela de resumo tem que trazer a lista de produtos, suas quantidades, valores totais por produto, valor frete, valor total do pedido, endereço de entrega e forma de pagamento
6
Usuário Estoquista
Visualizar a lista de pedidos e status
(semelhante a história do sprint 5 "Visualizar a lista de pedidos e status")
Para que serja possível mudar o status do pedido
- Uma lista com todos os pedidos feitos, odenados por data de forma decrescente.
- Semelhante a "Visualizar a lista de pedidos e status" - Data de pedido, número do pedido, valor total e status -   e botão de editar pedido
6
Usuário Estoquista
Alterar o pedido
Possa registrar a etapa da entrega do pedido.
- Alterar o status entre os valores (aguardando pagamento, pagamento rejeitado, pagamento com sucesso, aguardando retirada, em transito, entregue).
- Uma vez alterado o status o mesmo deve ser registrado no banco.
6
Usuário não Logado ou usuário logado
Filtrar um produto
possa localizar um  ou mais produto na loja
 Opcional
6
Usuário não Logado ou usuário logado
Selecionar uma categoria
possa licalizar um ou mais produtos daquela categoria
 Opciona
