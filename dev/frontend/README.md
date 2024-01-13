## Como rodar o Frontend

Para rodar o frontend, certifique-se de estar utilizando a mesma versão do Node.js que consta no arquivo `.nvmrc`.

### Definindo as váriaveis de ambiente

Todas as váriaveis de ambiente utilizadas estão no arquivo de exemplo das váriaveis de ambiente `.env.example`.

Insira as váriaveis com seus respectivos valores em um arquivo `.env`.

### Instalando as dependências

```bash
npm install
```

### Servidor de desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento ficará disponível em: `http://localhost:3000`

### Montando aplicação para produção

```bash
npm run build
```

Para rodar sua build de produção utilize

```bash
node .output/server/index.mjs
```

O servidor de produção fica disponível no mesmo endereço que o servidor de desenvolvimento.
