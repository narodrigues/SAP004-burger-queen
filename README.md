# Burger Queen

## Índice

- [1. Introdução](#1-introdução)
- [2. Wonderland Burger](#2-Wonderland-Burger)
- [3. Desevolvimento](#3-desenvolvimento)
- [3.1 Protótipação e Layout](#3.1-Protótipação-e-Layout)
- [3.2 Funcionalidades](#3.2-Funcionalidades)
- [3.3 Scripts](#3.3-Scripts)
- [4. Considerações técnicas](#4-considerações-técnicas)
- [5. Autores](#5-autores)

---

## 1.  Introdução
O presente projeto proposto pela Laboratória foi realizado em duplas, com o objetivo de desenvolver um aplicativo web que forneça serviço à uma hamburgeria permitindo vizualizar e manipular pedidos, fornecendo funcionalidades de acordo com as necessidades e histórias de usuário.

## 2. Wonderland Burger
Wonderland Burger é um fast food 24hrs que possue um aplicativo que presta serviço para realizar pedidos e monitorar a cozinha no auxilio das comandas.
Este possue dois menus, um para o café da manhã e outro para o restante do dia.

## 3. Desenvolvimento

Procuramos prezar pela funcionalidade da plataforma e a medida que íamos cumprindo as histórias de usuário, passamos a estilizá-lo.

Dividimos o projeto em pastas para melhor organização e componentizamos aqueles itens que seriam reutilizados futuramente. Prezamos por entregar sempre o MVP durante as sprints, e assim que iam sendo dadas por completo, realizamos a reestruturação do código e manipulação do css.

Trabalhamos com o banco de dados do Firebase ([Cloud Firestore](https://firebase.google.com/docs/firestore)) e para conseguirmos desenvolver, separamos algumas tarefas simples e também trabalhamos em pair programming em alguns momentos.

## 3.1 Protótipação e Layout
A interface foi pensada específicamente para rodar em **tablets**, porém é adaptável para outros dispositivos, como celular e monitores.

Com isso, fizemos a prototipação do layout e desenvolvemos nossa plataforma seguindo-o conforme dava.

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

* Fazer um Fork e/ou clonar o respositório em sua máquina com o comando ``git clone`` (terminal) + o link do repositorio;

* Instalar as dependências e versões executando o comando ``npm install``;

* Após verificar se todas as dependências estão instaladas e os arquivos nos lugares corretos, digite ``npm start`` em seu terminal, assim abrindo uma aba no seu navegador contendo o conteúdo da plataforma.

Caso não queria realizar esse procedimento, basta acessar a plataforma através do link: [Wonderland Burger](https://projeto-burger-queen.web.app/)


## 4. Considerações técnicas
Para realizar o projeto, usamos as ferramentas e linguagens listadas abaixo:
 * [React Hooks](https://pt-br.reactjs.org/docs/hooks-intro.html)
 * JavaScript ES6
 * CSS3
 * HTML5
 * [Firebase](https://firebase.google.com/?hl=pt-br&gclid=CjwKCAjwydP5BRBREiwA-qrCGpsV3qyJ3VBVODmltHe5VV48ByzCX6US883DlHkqgHUSxbW3vBH77BoCfocQAvD_BwE)
 * VS Code
 * [Adobe XD](https://www.adobe.com/br/products/xd.html)
 * EsLint
 * [Moment JS](https://momentjs.com/)

## 5. Autores

Esse projeto foi desenvolvido por [Marjorie Santos](https://github.com/MarjorieSantos) e [Natasha Costa](https://github.com/narodrigues)
