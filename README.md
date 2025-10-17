# Operação Curiosidade - Front-end 🔍

Sistema de gerenciamento de clientes desenvolvido com Angular 20.2.0, oferecendo uma interface moderna e intuitiva para controle completo de cadastros, autenticação e relatórios.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Começando](#começando)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Componentes](#componentes)
- [Serviços](#serviços)
- [Recursos Adicionais](#recursos-adicionais)

## 🎯 Sobre o Projeto

Operação Curiosidade é uma aplicação front-end completa para gestão de clientes, com sistema de autenticação robusto, filtros avançados, relatórios em PDF e dashboard interativo.

## 🚀 Tecnologias

- **[Angular](https://angular.dev/) 20.2.0** - Framework principal
- **[Angular Material](https://material.angular.io/)** - Biblioteca de componentes UI
- **[TypeScript](https://www.typescriptlang.org/)** - Linguagem de programação
- **[SCSS](https://sass-lang.com/)** - Pré-processador CSS
- **[RxJS](https://rxjs.dev/)** - Programação reativa
- **[jsPDF](https://github.com/parallax/jsPDF)** - Geração de relatórios PDF

## ✨ Funcionalidades

### 🔐 Autenticação
- Login e registro de usuários
- Proteção de rotas com guards
- Interceptor de autenticação JWT
- Gerenciamento de sessão

### 👥 Gerenciamento de Clientes
- ✅ Listagem paginada de clientes
- 🔍 Busca e filtros avançados
- 📊 Ordenação por colunas
- 👁️ Visualização de clientes ativos/inativos
- 📄 Geração de relatórios em PDF
- ✏️ Edição e exclusão de registros

### 📈 Dashboard
- Visão geral de clientes totais
- Clientes cadastrados no último mês
- Clientes inativos
- Tabela interativa com dados em tempo real

### 📝 Sistema de Logs
- Registro automático de ações do sistema
- Consulta de histórico de operações
- Rastreabilidade completa

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── _components/          # Componentes reutilizáveis
│   │   ├── boxes/           # Cards do dashboard
│   │   ├── delete-dialog/   # Modal de confirmação
│   │   ├── dialog/          # Diálogos genéricos
│   │   ├── main-button/     # Botão principal
│   │   └── table/           # Tabela customizada
│   ├── guards/              # Guards de rota (auth)
│   ├── interceptor/         # Interceptors HTTP
│   ├── models/              # Interfaces e modelos
│   ├── pages/               # Páginas da aplicação
│   │   ├── client-list/    # Lista de clientes
│   │   ├── home/           # Dashboard
│   │   ├── login/          # Autenticação
│   │   └── ...
│   ├── pipes/               # Pipes customizados
│   ├── services/            # Serviços da aplicação
│   ├── app.config.ts        # Configuração da aplicação
│   └── app.routes.ts        # Definição de rotas
├── environments/            # Configurações de ambiente
│   ├── environment.ts       # Produção
│   └── environment.development.ts  # Desenvolvimento
└── styles.scss             # Estilos globais
```

## 🚦 Começando

### Pré-requisitos

Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Angular CLI](https://angular.dev/tools/cli) - `npm install -g @angular/cli`

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/JoaoVitor49/OperacaoCurisosidade-Front-End.git
cd OperacaoCurisosidade-Front-End
```

2. Instale as dependências:
```bash
npm install
```

### Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
ng serve
# ou
npm start
```

Acesse `http://localhost:4200/` no navegador. A aplicação recarrega automaticamente ao modificar os arquivos.

### Build

Para compilar o projeto para produção:

```bash
ng build
# ou
npm run build
```

Os arquivos otimizados serão armazenados em `dist/`.

## 📦 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run watch` | Build em modo watch |
| `npm test` | Executa testes unitários |

## 🎨 Componentes

### Componentes Reutilizáveis

- **Table** - Tabela com paginação, ordenação e ações customizadas
- **Boxes** - Cards informativos para dashboard
- **StatusCell** - Célula de status com indicadores visuais
- **ActionButtonsCell** - Botões de ação para linhas da tabela
- **MainButton** - Botão principal estilizado
- **Dialog** - Sistema de diálogos modais
- **DeleteDialog** - Confirmação de exclusão com feedback
- **LogDialog** - Visualização de logs
- **Header** - Cabeçalho da aplicação
- **Sidebar** - Menu lateral de navegação
- **MainLayout** - Layout principal
- **AuthLayout** - Layout para páginas de autenticação

## 🔧 Serviços

| Serviço | Responsabilidade |
|---------|------------------|
| `ClientService` | Gerenciamento de clientes (CRUD) |
| `AuthService` | Autenticação e autorização |
| `BaseClientListService` | Lógica compartilhada de listagem |
| `LogService` | Registro de logs do sistema |
| `SearchService` | Funcionalidade de busca |
| `SortService` | Ordenação de dados |
| `SnackbarService` | Notificações ao usuário |
| `ThemeService` | Gerenciamento de tema claro/escuro |

## 🔗 Recursos Adicionais

Para mais informações:
- [Documentação do Angular CLI](https://angular.dev/tools/cli)
- [Guia do Angular](https://angular.dev/overview)
- [Angular Material](https://material.angular.io/)

## 🔗 Repositório do Backend

a API que o cliente web utiliza pode ser encontrado no repositório do Backend:

> [https://github.com/JoaoVitor49/OperacaoCurisosidade-Back-End]
