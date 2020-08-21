# Adonis web2 test

## Setup

Use NPM install to setup project

```bash
npm install
```
## Auth

Todas as rotas são protegidas por um token jwt como solicitado, para gerar o token deve ser utilizar a rota /auth/signin passando no body o seguinte payload

```
{
    "username": "victor",
    "password": "12345"
}
```
O usuário acima foi chumbado no banco de dados para fins demonstrativos. Após gerar o token, ele deve ser fornecido ao executar todas as outras transações.

```
    Auth method: 'Bearer Token'
```

## Observação

Por algum motivo, a instância do swagger que estou rodando ou está com problemas ou configurei errado. Como pode ser observado nos controllers, tudo está documentado
de acordo com o padrão openApi2, contudo a documentação online está com problemas, mas é passível de testes em outras maquinas.

```
    http://localhost:3333/docs/#/
```