# Instruções de Uso

## Pré Requisitos

- Banco de Dados SQL - Recomendamos [MySQL](https://www.mysql.com/downloads/ 'Site downloads MySql') (versão 8 ou superior).
- [SDK ou JDK Java](https://www.oracle.com/java/technologies/downloads/ 'Oracle Java downloads') versão 17 ou mais recente.
- Ambiente de Desenvolvimento Integrado (IDE) - Recomendamos [JetBrains-Intellij](https://www.jetbrains.com/pt-br/idea/download/?section=windows 'JetBrains Intellij downloads')._*_
- Visual Studio Code com a extensão _[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer 'Site da extensão Live Server')_ instalada.
- Navegador de Internet.
- Ferramenta [Git](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer 'Site Git downloads') _(Opcional)_.

>Você pode encontrar dificuldades em abrir o projeto em algumas IDEs
>
>Recomendamos a utilização do Sistema Operacional Windows. Não garantimos o funcionamento correto em outros Sistemas Operacionais.

## Passo a Passo
1. Clone ou Extraia o Projeto para a `Área de Trabalho` ou pasta desejada.
2. Crie um novo banco de dados com o nome `"nice-api"`.*
>O projeto utiliza `migrations` e por isso irá buscar o banco de dados com esse nome.
3. Abra o projeto dentro da IDE escolhida e no Visual Studio Code (para visualizar o front).
4. Rode o Projeto dentro da IDE.
5. No Visual Studio, selecione o arquivo `index.html` na pasta `/front/nice-store`.
6. Abra o arquivo `index.html` com Live Server, se estiver mais de um navegador instalado escolha a opção desejada.

>Neste momento o seu navegador deve abrir com a página inicial do site Nice Store, caso isso não aconteça revise todos os passos. 

*Se ainda não consegue visualizar o Site Store e necessite de ajuda, verifique em ['Possíveis Erros de Execução'](./Project/Error.md).*

### Recomendações de Uso - Boas Práticas
Recomendamos não realizar grandes alterações no código fonte do projeto para evitar erros futuros. Caso o programa deixe de funcionar após alterações, exclua o projeto e realize o passo a passo novamente.