# Burger Queen

## Índice

- [1. Introdução](#1-introdução)
- [2. Wonderland Burger](#2-Wonderland-Burger)
- [3. Desevolvimento](#3-desenvolvimento)
- [3.1 Prototipação e Layout](#31-prototipação-e-Layout)
- [3.2 Funcionalidades](#32-funcionalidades)
- [3.3 Scripts](#33-scripts)
- [4. Considerações técnicas](#4-considerações-técnicas)
- [5. Autoras](#5-autoras)

---

## 1.  Introdução
O presente projeto proposto pela Laboratória foi realizado em dupla, com o objetivo de desenvolver um aplicativo web que forneça serviço à uma hamburgueria, permitindo vizualizar e manipular pedidos e fornecendo funcionalidades de acordo com as necessidades da mesma.

## 2. Wonderland Burger
Wonderland Burger é um fast food 24hrs inspirado na obra Alice no País das Maravilhas, o qual possui um cardápio diferenciado ao longo do dia: um para o café da manhã e outro para o almoço/janta.
Nosso produto se trata de um aplicativo totalmente responsivo que presta serviço para realizar os pedidos dos clientes e monitorar a cozinha no auxílio das comandas.

## 3. Desenvolvimento
Procuramos prezar pela funcionalidade da plataforma e a medida que íamos cumprindo as histórias de usuário, passamos a estilizá-lo.

Dividimos o projeto em pastas para melhor organização e componentizamos aqueles itens que seriam reutilizados futuramente. Prezamos por entregar sempre o MVP durante as sprints, e, assim que iam sendo dadas por completo, realizamos a refatoração e reestruturação do código e manipulação do css.

Durante o desenvolvimento, trabalhamos de forma autônoma, pegando pequenas funcionalidades e trabalhando nestas, mas também trabalhamos em pair programming para alinhamento inicial da estruturação do projeto.

## 3.1 Protótipação e Layout
A interface foi pensada especificamente para rodar em **tablets**, porém é responsiva para outros dispositivos, como celular e monitores.

Fizemos a prototipação do layout utilizando o Adobe XD e assim a seguimos conforme desenvolvemos nossa plataforma, realizando ajustes e melhorias conforme as sprints.

<img src='./src/assets/img-readme.png' alt='foto da prototipação'>

## 3.2 Funcionalidades
As funcionalidades foram desenvolvidas a partir das histórias de usuários listadas abaixo:

* 1 -  **Usuário deve ter seu perfil (login/senha) para acessar o sistema.**
    * Como funcionário do restaurante quero entrar na plataforma e ver apenas a tela importante para o meu trabalho.

* 2 -  **Garçom/Garçonete deve poder anotar o seu pedido.**
    * Como garçom/garçonete quero poder anotar o meu pedido saber o valor de cada produto e poder enviar o pedido para a cozinha para ser preparado.

* 3 -  **Chefe de cozinha deve ver os pedidos**
    * Como chefe de cozinha preciso ver os pedidos dos clientes em ordem, poder marcar que estão prontos e poder notificar os garçons/garçonetes que o pedido está pronto para ser entregue ao cliente.

* 4 -  **Garçom/Garçonete deve ver os pedidos prontos para servir**
    * Como garçom/garçonete quero ver os pedidos que estão prontos para entregá-los rapidamente aos clientes.

## 3.3 Scripts
**Os passos necessários para executar o projeto em sua máquina são:**

* Fazer um Fork e/ou clonar o respositório em sua máquina utilizando em seu terminal o comando ``git clone`` + o link do repositorio;

* Instalar as dependências e suas versões utilizadas executando o comando ``npm install``;

* Após verificar se todas as dependências estão instaladas, digite ``npm start`` em seu terminal, assim gerando um localhost, o qual abrirá uma guia no seu navegador com o conteúdo da plataforma.

Caso não queria realizar esse procedimento, basta acessar a plataforma através do link: [Wonderland Burger](https://projeto-burger-queen.web.app/)


## 4. Considerações técnicas
Para realizar o projeto, usamos as ferramentas, bibliotecas e linguagens listadas abaixo:
* [Adobe XD](https://www.adobe.com/br/products/xd.html)
* CSS3
* EsLint
* [Firebase](https://firebase.google.com/?hl=pt-br&gclid=CjwKCAjwydP5BRBREiwA-qrCGpsV3qyJ3VBVODmltHe5VV48ByzCX6US883DlHkqgHUSxbW3vBH77BoCfocQAvD_BwE)
* HTML5
* JavaScript ES6
* [Moment JS](https://momentjs.com/)
* [React Hooks](https://pt-br.reactjs.org/docs/hooks-intro.html)
* VS Code

## 5. Autores

Esse projeto foi desenvolvido por [Marjorie Santos](https://github.com/MarjorieSantos) e [Natasha Costa](https://github.com/narodrigues).
