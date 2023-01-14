<p align="center">
   <a href="https://www.nkinfo.com.br/">
        <img src="https://www.nkinfo.com.br/img/logo.svg" height="120">
    </a>
	<h1 align="center">My Bank - Server of application - Embraer test</h1>
</p>

## Primeiros Passos

### 1 - Clonando o projeto

```bash
$ git clone https://github.com/nsbbezerra/embraer-teste-server.git
```

```bash
$ cd embraer-teste-server
```

```bash
$ npm install
# ou
$ yarn install
```

### 2 - Configurando do ambiente

`ESTE PROJETO UTILIZA O POSTGRES COMO DB PRINCIPAL`

- Variáveis de Ambiente

  - Adicione nas configurações do servidor, ou crie um arquivo `.env` na raíz do projeto e as seguintes variáveis:
  - `DB_NAME`
  - `DB_USER`
  - `DB_PASSWORD`
  - `PORT` - Porta onde a aplicação irá iniciar.

- Scripts Obrigatórios

  - Migrations

  ```bash
  $ npm run make:migrations
  # ou
  $ yarn make:migrations
  ```

  - Seeds

  ```bash
  $ npm run make:seeds
  # ou
  $ yarn make:seeds
  ```

### 3 - Iniciando a aplicação

- Ambiente de Desenvolvimento

```bash
$ npm run dev
# ou
$ yarn dev
```

Se tudo estiver configurado corretamente você terá um output no terminal: `API is running on port: PORTA SELECIONADA`

### 4 - Rotas da aplicação

Para realizar login: `GET - {{baseURL}}/login`

#### Retorno:

```json
{
  "id": 1,
  "name": "John Doe",
  "balance": "10000,00"
}
```

Para buscar os extratos: `GET - {{baseURL}}/statements/{clientId}`

#### Retorno:

```json
[
    {
        "id": 1,
        "client_id": 1,
        "total": 1000.00,
        "createdAt": 2023-01-11 21:54:23.88349+00,
        "updatedAt": 2023-01-11 21:54:23.88349+00,
    }
]
```

Para realizar um saque: `POST - {{baseURL}}/withdraw/{clientId}`, passando como parâmetro no body `{ amount: 1000 }` que é o valor do saque

#### Retorno:

```json
"banknotes": [
    {
        "id": 1,
        "banknoteValue": 100, //Valor da cédula
        "amount": 10 //Quantidade de cédulas relativas ao valor para realizar o saque
    }
]

"balance": 1000 //Valor atualizado do saldo do cliente
```

### 5 - Erros

Caso ocorra algum erro, ou uma mensagem de validação dos dados será retornado os seguintes dados:

```json
{
  "defaultMessage": "An error occurred while processing your request", //Mensagem padrão
  "errorMessage": "Error on get client balance" //Descrição do erro
}
```

### 6 - Testes unitários

Para rodar os teste unitário use o seguinte comando:

```bash
$ npm run test
# ou
$ yarn test
```

### 7 - Build e produção

Build

```bash
$ npm run build
# ou
$ yarn build
```

Versão final

```bash
$ npm run start
# ou
$ yarn start
```

### 8 - Bibliotecas e Frameworks utilizados:

- [Node JS + Typescript](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Cors](https://github.com/expressjs/cors)
- [Knex](https://knexjs.org/)
- [Postgres](https://www.postgresql.org/)

### Autor

[<img src="https://avatars.githubusercontent.com/u/44842023?s=400&u=2a8f0844c691b0d32eb0d243edc8eebf226f5b5f&v=4" width=115><br><sub>Natanael Bezerra</sub>](https://github.com/nsbbezerra)
