## iHeros - Teste Fullstack

O projeto está disponivel em: https://exquisite-choux-c9758b.netlify.app

![Painel do aplicativo com um mapa mostrando as alocações dos heróis](https://i.imgur.com/Ny4m5pZ.png)

### Introdução ao código

O projeto foi desenvolvido utilizando **Node.js** e todos os 5 níveis foram realizados.

No frontend utilizei **Nuxt.js** devido a minha experiência prévia com ele e com **Vue**, além disso, pelos benefícios que ele entrega, como a possibilidade de renderização do lado do servidor (SSR) e por recursos que simplificam o desenvolvimento, como importações e roteamento automático.

Já no backend foi utilizado **Nest.js**, devido a sua robustez e escalabilidade, garantida, principalmente, por meio de sua arquitetura bem planejada.

Para manipular os dados do banco utilizei o **Prisma**, um ORM, devido, principalmente aos tipos de consulta, que foram todas baseadas em CRUD. Desta forma o **Prisma** não se torna uma limitação, e a simplicidade de manipular os dados acaba sendo muito proveitosa.

Optei pelo **PostgreSQL**, um banco de dados relacional, já que o formato dos dados era previsível e havia relações entre eles.

### Como rodar

Siga as instruções em cada parte do projeto (backend e frontend):

- [Frontend](./dev/frontend/README.md)
- [Backend](./dev/backend/README.md)

### Recursos adicionais

- **Rastreamento de ameaças com mapa**
  As ameaças sendo combatidas são mostradas em um mapa pra deixar mais legal a utilização do aplicativo.
- **Status de combate de ameaça e de herói**
  As tabelas de herói e histórico possibilitam a visualização da disponibilidade do herói e se uma ameaça presente no histórico já foi finalizada.

### Proxímos passos

- Adicionar testes no frontend (no momento só têm no backend)
- Refatorar algumas partes do frontend - agrupar funções de fetch e reduzir possíveis repetições de código
- Configurar Docker
- Procurar por uma melhor maneira de desalocar um herói (utilizando useTimeout no momento)

### Conclusão

Foi muito legal desenvolver o projeto, e gostei dos desafios que enfrentei. Amei planejar o código de alocação inteligente e depois implementá-lo e vê-lo funcionando. Também já fazia um tempo que não trabalhava com **WebSockets**, então foi muito prazeroso utilizar novamente eles. Agradeço a **ZRP** por disponibilizar este teste técnico em seu repositório e incentivar a sua realização.

Também aproveito pra dizer que seria um prazer trabalhar na empresa de vocês. 😉
