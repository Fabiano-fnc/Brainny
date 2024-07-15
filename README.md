### README.md

---

# My App

Este projeto é uma aplicação web que consiste em uma landing page, uma página de login, um dashboard de colaboradores e um dashboard separado para o administrador. A aplicação foi desenvolvida utilizando React e várias bibliotecas modernas.

## Tecnologias Utilizadas

- **React**: Biblioteca principal para construção da interface do usuário.
- **Apollo Client**: Gerenciamento de estado global para aplicações GraphQL.
- **Emotion**: Biblioteca para escrita de CSS com JavaScript.
- **Material UI (MUI)**: Componentes de interface do usuário prontos para uso.
- **Axios**: Cliente HTTP para fazer requisições à API.
- **GraphQL**: Linguagem de consulta para APIs.
- **JWT-decode**: Biblioteca para decodificar JSON Web Tokens.
- **React Router DOM**: Roteamento para navegação entre páginas.
- **Styled-components**: Biblioteca para estilização de componentes React.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.

## Estrutura do Projeto


my-app/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   ├── images/
│   ├── services/
│   ├── styles/
│   ├── App.tsx
│   ├── index.tsx
│   ├── ...
├── package.json
├── README.md
├── ...


### `npm start`

Inicia a aplicação em modo de desenvolvimento.\
Abra [http://localhost:3000] para ver no navegador.

A página será recarregada se você fizer edições.\
Você também verá erros de lint no console.

## `npm run start-dev`

Inicia o servidor backend. Certifique-se de que o backend 
está corretamente configurado e todas as dependências estão instaladas.

### Dependências Principais

- `@apollo/client`: ^3.10.8
- `@emotion/react`: ^11.11.4
- `@emotion/styled`: ^11.11.5
- `@mui/material`: ^5.16.0
- `@mui/system`: ^5.15.20
- `@testing-library/jest-dom`: ^5.17.0
- `@testing-library/react`: ^13.4.0
- `@testing-library/user-event`: ^13.5.0
- `@types/jest`: ^27.5.2
- `@types/node`: ^18.18.0
- `@types/react`: ^18.3.3
- `@types/react-dom`: ^18.3.0
- `@types/react-router-dom`: ^5.3.3
- `axios`: ^1.7.2
- `graphql`: ^16.9.0
- `jwt-decode`: ^4.0.0
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-router-dom`: ^6.24.0
- `react-scripts`: ^5.0.1
- `styled-components`: ^6.1.11
- `typescript`: ^4.9.5
- `web-vitals`: ^2.1.4

### Dependências de Desenvolvimento

- `@types/jwt-decode`: ^3.1.0

## Configuração do ESLint

O projeto utiliza as configurações do ESLint do `react-app` e `react-app/jest`.

