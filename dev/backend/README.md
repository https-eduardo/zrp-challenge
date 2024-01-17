## Como rodar o Backend

Caso não for utilizar Docker, certifique-se de estar utilizando a mesma versão do Node.js que consta no arquivo `.nvmrc`.

### Definindo as váriaveis de ambiente

Todas as váriaveis de ambiente utilizadas estão no arquivo de exemplo das váriaveis de ambiente `.env.example`.

Insira as váriaveis com seus respectivos valores em um arquivo `.env`.

### Docker

Se você quiser rodar a aplicação dentro de um container Docker, basta utilizar os seguintes comandos:

```bash
docker compose build
docker compose up -d
```

O backend já estará disponível depois da execução desses comandos.

Se optar por rodar a API sem Docker, siga os passos abaixo.

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
