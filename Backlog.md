# Backlog do Produto 

Inicialmente é apresentado pelo _Instrutor_ da matéria de PI o Backlog geral do produto contendo informações básicas e necessárias do projeto, em seguida o _Instrutor_ no papel de `Scrum Master` divide o `Backlog do Produto` em 06 Sprints de duração 14 dias cada. 

No primeiro dia da Sprint _(que sempre cai no dia da aula)_,  é apresentado os requisitos da Sprint, neste momento é reservado um tempo para que os alunos possam entrar em maiores detalhes e tire suas dúvidas, os grupos tem 14 dias corridos _(2 semanas)_ até a próxima Sprint para desenvolver os requisitos solicitados. 

No último dia de cada Sprint o _Instrutor_ realiza uma avaliação do requisitos atendidos pelo `Sistema` e atribui uma nota ao grupo sobre aquela Sprint. _A apresentação de cada grupo é realizada de forma individual._ 

Após todas a avaliações, é apresentada a próxima Sprint e seus requisitos, _o último dia da Sprint anterior é o primeiro dia da Sprint seguinte_.

Por conta da grade curricular e cronograma de aulas, as Sprints não podem sofrer alterações para que não haja imprevistos na data final de entrega do Sistema. O(s) grupo(s) que não entregarem ou atenderem todos os requisitos de uma Sprint entram em `débito técnico`, podendo entregar os requisitos em atraso na próxima Sprint com 50% da nota daquele requisito. 


## Esquema de Data/Nota de cada Sprint

A tabela a seguir informa a quantidade de Sprints, seus pesos correspondentes para cada avaliação, e a data que foi realizada a avaliação _(que corresponde ao último dia da Sprint)_. Após as 06 Sprints concluídas acontece a última avaliação chamada _Final_, nela o instrutor passar por todas funcionalidades cruciais do `Sistema`, com todas elas com funcionamento correto é atribuido a nota com base no peso.

Sprint|Sprint 1|Sprint 2|Sprint 3|Sprint 4|SPrint 5|Sprint 6|Final|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|Data|09/09/24|23/09/24|07/10/24|21/10/24|11/11/24|25/11/24|02/12/24|
|Peso|1|2|4|8|16|32|64|
	
A média é calculada com a Seguinte Formula:

```
( (nota1 * 1) + (nota2 * 2) + (nota3 * 4) + (nota4 * 8)  +  (nota5 * 16) +  (nota6 * 32) + (notaFinal * 64) )/127
```

# SprintPlanning

O _Instrutor_ da matéria também solicita que o grupo organize as Sprints dentro de um _To do List_ no estilo _Kanban_, o recomendado pelo mesmo é a plataforma _Trello_, os mesmos integrantes do grupo e também o próprio _Instrutor_ devem fazer parte da equipe dentro da plataforma. 

Durante o período de uma Sprint o grupo se responsabiliza entre os integrantes a distribuição de tarefas e o tempo em que cada um realizará.


Por questões de visualização enumeramos os requisitos em 04 digitos em sequência `#0000`, sendo os 02 primeiros digitos `#00XX` representado pela Sprint a qual aquele requisito pertence, e os dois últimos digitos `#XX00` a ordem daquele requisito dentro daquela Sprint. Exemplo `#0101` representa o requisito um da primeira sprint.

>Para requisitos que possam conter um segundo caminho ou condição incluimos em uma lista de itens `(A); (B); (C) ... etc` para cada variação.
>
>Foram adicionadas pequenas alterações nos textos que descrevem os requisitos pois poderiam dar um entendimento diferente dependendo do contexto.


## Sprint 01

### Requisito #0101
#### **Narrativa:**
- **Como Um :** `Usuário` não logado.
- **Eu quero/Eu posso:** Me identificar no `Sistema`.
- **Para que:** Possa entrar no Backoffice.

#### **Critério(s) de aceite:**

  1. Os dados de login devem ser validados no banco de dados _(O login é o email do_ `Usuário` _cadastrado)._
     - A senha do `Usuário` deve ser encriptada no início antes de validação no banco de dados _( o dado no banco de dados também estará encriptado)._ 
        - (A). Não localizando o `Usuário`, o Sistema deve negar a entrada do usuário no Backoffice.
        - (B). Com `Usuário` localizado, o `Sistema` deve cair na tela principal do Backoffice _(somente se `Usuário` e senha corretos e função habilitado - ativo)_, onde terão as opções de `listar produtos` _(para todos os PERSONAS*)_; E `lista de usuários` para `Administrador`.
>   
> *Personas* ou *personagens* são todos os tipos de perfis que podemos classificar dentro do `Sistema`, em _Nice Store_ temos os personas `Administrador`, `Estoquista` e `Cliente`.      

2. O Sistema deve perguntar qual opção o `Usuário` quer acessar _(1 para listar produto e 2 – quando usuário for Administrador – para listar usuário).
    - Estando logado o `Sistema` deve criar a sessão com o usuáro e seu grupo (podendo ser `Administrador` ou `Estoquista`). Esta Tela é a de `Usuário` e portanto, se um `Cliente` entrar com email e senha o mesmo deve ser rejeitado.
   >Esta tela de login é apenas para `Usuários` de Backoffice.
>`Usuários` são classificados apenas o personas `Administrador` e `Estoquista`.

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

### Requisito 05
#### **Narrativa:**
- **Como Um :** Administrador.
- **Eu quero/Eu posso:** Alterar um usuário.
- **Para que:** Possa manter os dados de um usuário no backoffice.

#### **Critério(s) de aceite:**
1. Critério 01:
   - Ao entrar a tela deve listar os dados os dados do usuário escolhido – id, nome, cpf, e-mail, status, grupo. É permitido apenas alterar o grupo (se não for o usuário logado no momento). É permitido alterar o nome, cpf e grupo. Não é permitido alterar o email.
   - As validações de cpf, grupo e email devem ser feitas. Toda alteração deve refletir no banco de dados. Se selecionar o N em salvar deve voltar para a tela anterior.

---

### Requisito 06
#### **Narrativa:**
- **Como Um :** Administrador.
- **Eu quero/Eu posso:** Alterar Senha.
- **Para que:** Possa Alterar a senha de acesso do usuário.

#### **Critério(s) de aceite:**
1. Critério 01:
   - Ao entrar a tela deve listar os dados do usuário escolhido – id, nome, cpf, e-mail, status, grupo. É preciso entrar com a senha 2 vezes e ela deve ser atualizada no banco de forma encriptada. Se a senha e contra senha não forem iguais, o sistema não pode permitir a troca. Se selecionar o N em salvar deve voltar para a tela anterior.
   
### História 07
#### **Narrativa:**
- **Como Um :** Administrador.
- **Eu quero/Eu posso:** Ativar ou Desativar um usuário.
- **Para que:** Remover ou conceder acesso a um usuário cadastado no Backoffice.

#### **Critério(s) de aceite:**
1. Critério 01:
   - Ao entrar a tela deve listar os dados os dados do usuário escolhido – id, nome, cpf, e-mail, status, grupo. Deve apresentar a opção contrária do status do usuário. Se o status do usuário estiver ativo a mensagem é para `Desativar Usuário` ou se o usuário estiver desativado a mensagem será `Ativar Usuário`. Ao selecionar salvar Y, o sistema deve atualizar o status contrário no banco de dados. Se selecionar o N em salvar deve voltar para a tela anterior.
   
## Sprint 02
## Sprint 03
## Sprint 04
## Sprint 05
## Sprint 06
