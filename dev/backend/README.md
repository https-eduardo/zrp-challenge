## Como rodar o Backend

### Definindo as váriaveis de ambiente

Todas as váriaveis de ambiente utilizadas estão no arquivo de exemplo das váriaveis de ambiente `.env.example`.

Insira as váriaveis com seus respectivos valores em um arquivo `.env`.

### Instalando dependências

```bash
yarn install
```

### Servidor de desenvolvimento

```bash
yarn start:dev
```

A API ficará disponível em: http://localhost:{PORT}

### Montando aplicação para produção

```bash
yarn build

yarn start
```

### Executando os testes

```bash
# Testes unitários
yarn run test

# Testes E2E
yarn run test:e2e
```

### Documentação

Como foi utilizado Swagger para documentar o backend, é possível visualizar as rotas da API em: http://localhost:{PORT}/api
