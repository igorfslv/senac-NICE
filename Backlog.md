# Backlog do Produto 

## Requisitos 

# SprintPlanning
## Sprint 01
- *Como Um :*Usuário não logado.
- *Eu quero/Eu posso:* Identificar no Sistema.
- *Para que:* Possa entrar no Backoffice.
### *Critério(s) de aceite:* 
1. Os dados de login devem ser validados no banco de dados (O login é o email do usuário).
2. A senha deve ser encriptada na ponta antes de validação com o dado no banco (que também estará encriptado)._Não localizando o sistema deve negar a entrada do usuário no Backoffice._
3. Logando (com usuário e senha corretos e habilitado - ativo) o sistema deve cair na tela principal do backoffice onde terão as opções de listar produtos (todos PERSONAS) e lista de usuários para administrador.
4. O sistema deve perguntar qual opção o usuário quer acessar (1 para listar produto e 2 – quando usuário for administrador – para listar usuário).

|Usuário não logado|Identificar no sistema|Possa entrar no backoffice|Logando também o sistema deve criar a sessão com o usuáro e seu grupo(administrador ou estoquista).Esta Tela é a de usuário e portanto, se um CLIENTE entrar com email e senha o mesmo deve ser rejeitado. Esta tela de login é apenas para usuários de backoffice|
|Administrador|Listar Usuário|Possa acessar as opções de incluir, alterar e habilitar/desabilitar|Na tela principal do backoffice, ao selecionar Listar usuários o sistema deve lista todos os usuários cadastrados mostrando o ID (sequencial numérico), Nome, email, status, Grupo.|
|Administrador|Listar Usuário|Possa acessar as opções de incluir, alterar e habilitar/desabilitar|O sistema deve permitir escolher um dos usuários (selecionando seu ID) para a tela de opções de usuário ou 0 para voltar a tela principal do backoffice oi I para incluir usuário.|
|Administrador|Cadastrar um usuário|Posso incluir um acesso ao backoffice|Cadastrar o nome do usuário, cpf, email, grupo, senha, no banco de dados.No cadastro, pedir a senha 2 vezes. Só permitir o cadastro quando as 2 senhas estiverem iguais.Validar email do usuário. A senha deve ser encriptada antes de enviar para o banco de dados. O cadastro de usuário cadastra o registro como ativo (sempre). Não é permitido cadastrar dois usuários com mesmo login (email). O cpf deve ser validado antes da gravação. Os grupos permitidos são – Administrador ou Estoquista.|
|Administrador|Escolher opção de edição do usuário|Possa alterar dados do usuário e ativá-lo ou desativa-lo|- Ao entrar a tela deve listar os dados os dados do usuário escolhido – id, nome, cpf, e-mail, status, grupo. Listar o dado do usuário escolhido, id, nome, cpf, e-mail, status e grupo. Listar as opções para o usuário – 1) Alterar usuário, 2) Alterar senha, 3) Ativar/Desativar, 4 voltar a listar usuário. Ler a opção selecionada pelo usuário.|
|Administrador|Alterar um usuário|Possa manter os dados de um usuário no backoffice|Ao entrar a tela deve listar os dados os dados do usuário escolhido – id, nome, cpf, e-mail, status, grupo. É permitido apenas alterar o grupo (se não for o usuário logado no momento). É permitido alterar o nome, cpf e grupo. Não é permitido alterar o email. As validações de cpf, grupo e email devem ser feitas. Toda alteração deve refletir no banco de dados. Se selecionar o N em salvar deve voltar para a tela anterior.|
|Administrador|Alterar Senha|Possa Alterar a senha de acesso do usuário|Ao entrar a tela deve listar os dados os dados do usuário escolhido – id, nome, cpf, e-mail, status, grupo. É preciso entrar com a senha 2 vezes e ela deve ser atualizada no banco de forma encriptada. Se a senha e contra senha não forem iguais não pode permitir a troca. Se selecionar o N em salvar deve voltar para a tela anterior.|
|Administrador|Ativar ou Desativar um usuário|Remover ou conceder acesso a um usuário cadastado no backoffice|Ao entrar a tela deve listar os dados os dados do usuário escolhido – id, nome, cpf, e-mail, status, grupo. Deve apresentar a opção contrária do status do usuário. Se o status do usuário estiver ativo a mensagem é para `Desativar Usuário` ou se o usuário estiver desativado a mensagem será `Ativar Usuário`. Ao selecionar salvar Y, o sistema deve atualizar o status contrário no banco de dados. Se selecionar o N em salvar deve voltar para a tela anterior|
