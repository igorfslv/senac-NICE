# ![Logo Nice Store](front/nice-store/img/img-logotipo-branco.png "Logo usada no Projeto")
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

# Sobre o Nice Store
_Nice Store_ é um site de vendas (E-Commerce) de produtos elétricos e eletrodomésticos com Sistema Web de Back-Office integrado. 
_Nice Store_ é o resultado do projeto acadêmico de Sistema Web desenvolvido pelos alunos do _[Centro Universitário Senac](https://www.sp.senac.br/centro-universitario-senac-santo-amaro 'Site Oficial Senac')_ ao decorrer da matéria _**"Projeto Integrador - PI" do 4º semestre.**_ 

- Realiza _Pedidos de Vendas_ fictícios.
- Engloba todos os pontos cruciais de um _Sistema Web._
- Utiliza padrões de Arquitetura de Sistemas Web desde o _EndPoint_ até inserção/alteração no _Banco de Dados_.

 
## O Projeto - Desenvolvimento de Sistemas Orientado a Web.

O objetivo inicial do projeto é desenvolver um site E-Commerce de vendas de produtos com Sistema de Back-Office integrado. Para atender o objetivo proposto os alunos devem utilizar todo o conhecimento adquirido durante o curso de _Análise de Desenvolvimento de Sistemas_, entre elas estão algumas como:
 - Utilizar a linguagem **Java** no Back-End;
 - Utilizar o padrão de arquitetura **Model View Controller - MVC**;
 - Disponibilizar uma interface Front-End para interação com Usuário;
 - Utilizar Metodologia ágil **Scrum**.
 
Como entrega final, o projeto de Sistema E-Commerce deve atender a uma lista de requisitos e funcionalidades previamente descritas pelo instrutor em forma de _Backlog de Produto_, a cada funcionalidade que o Sistema atenda com sucesso, o grupo receberá os pontos como nota final da matéria. Em resumo, os requisitos são:

- O Sistema deve ser capaz de efetuar um _login_ de `Administrador` no `Back-Office` e com esse _login_, `criar`, `alterar`, `salvar` e `excluir` perfis do tipo `Administrador`/`Estoquista`;
- O Sistema deve ser capaz de efetuar um _login_ de `Estoquista` no `Back-Office` e com esse _login_, _visualizar_ e `alterar` status de pedidos dos clientes;
- O `Cliente` deve ter a possibilidade de _visualizar e escolher_ produtos na tela inicial e colocá-los no `carrinho` (sem que esteja previamente logado);
- O `Cliente` deve criar um `cadastro` para concluir seu `pedido`, caso já tenha um cadastro ativo, deve _logar_ para concluir o seu `pedido`.
- Além de criar o `cadastro`, o `Cliente` deve ter a possibilidade de `alterar` determinadas informações do `cadastro` e adicionar `endereços`.
- Durante o processo de compra, o `Cliente` logado deve passar por todas as etapas de conclusão de pedido: escolher `produto` e colocar produto no `carrinho`, adicionar um `endereço` fictício de entrega, adicionar `pagamento` fictício, `visualizar` um resumo e detalhes do pedido na tela de `checkout`.
- `Cliente` deve _visualizar_ uma `lista de pedidos` realizados e seus detalhes dentro do seu `perfil`.

O Objetivo final do Projeto é simular uma aplicação de um Sistema Web de E-Commers de vendas, contribuindo para experiência prévia do aluno ao mercado de trabalho. _[Mais detalhes sobre o Projeto Integrador do Senac](O Projeto.md)._ 

>_Acesse mais detalhes sobre o Desenvolvimento do Projeto, detalhes da Metodologia, _[SprintPlaning e Backlog do Produto]()_.



# Ferramentas Utilizadas
- **Back-End :** Linguagem Java 17 e Java Script para integração de API Rest;
- **Framework:** Java Springboot;
- **Banco de Dados:** MySQL;
- **Front-End:** HTML/CSS/JavaScript;


Para executar a metodologia ágil _**Scrum**_ foi utilizada a plataforma _**Trello**_ como _To Do List_ e gerenciamento das _Sprints._

>Acesse mais detalhes técnicos do Sistema como [Telas](); [API EndPoints](); [Modelagem Banco de Dados](); [Estrutura do Banco de Dados]() e [Documentação]().

# Como executar Nice Store
Se você tem interesse em visualizar o projeto final e sua execução disponibilizamos [Instruções de Uso]().

# Instruções de Uso

## Pré Requisitos

- Banco de Dados SQL - Recomendamos MySQL.
- SDK ou JDK Java versão 17 ou mais recente.
- Ambiente de Desenvolvimento Integrado (IDE) - Recomendamos Intellij.
- Visual Studio Code com a extensão _[Live Server]()_ instalada.
- Navegador de Internet.

>Recomendamos a utilização do Sistema Operacional Windows. Não garantimos que irá funcionar corretamente em outros Sistemas Operacionais.

## Passo a Passo
1. Clone ou Extraia o Projeto para a `Área de Trabalho`.
2. Crie um novo banco de dados com o nome `"nice-api"`.*
3. Abra o projeto dentro da IDE escolhida e no Visual Studio Code.
4. Rode o Projeto dentro da IDE.
5. No Visual Studio, selecione o arquivo `index.html` na pasta `/front/nice-store`.
6. Abra o arquivo `index.html` com Live Server, se estiver mais de um navegador instalado escolha a opção desejada.


**Neste momento o seu navegador deve abrir com a página inicial do site Nice Store, caso isso não aconteça, revise os passos até aqui.** 

**Se ainda nao consegue visualizar o Site Store e necessite de ajuda, verifique em ['Possíveis Erros de Execução']().**

### Recomendações de Uso - Boas Práticas
Recomendamos não realizar grande alterações no código fonte do projeto para evitar erros futuros

# Contribuintes
Nice Store foi desenvolvidos em grupo pelos integrantes:
- Igor Felipe (Este Perfil);
- [Matheus]();
- [Elina]();
- [Nataia]();
# Licença
Este projeto possui licença XXX que permite a visualização e utilização para fins educacionais. Não pode ser revendido ou comercializado.
