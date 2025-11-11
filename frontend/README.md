# Amiibo Wiki  

Este projeto foi desenvolvido como parte da disciplina **ES47B-ES71 - Programação Web Fullstack**, ministrada pelo professor **Willian Massami Watanabe**.  

## 👨‍💻 Equipe  
- **Felipe Maciel Scalco**  
- **Raphael dos Santos Sousa**  

## 📖 Descrição do Projeto  
O objetivo deste projeto foi desenvolver a camada **Frontend** de uma aplicação web utilizando **React.js**.  

Nossa aplicação consome dados da **API de Amiibos** ([Amiibo API](https://www.amiiboapi.com/)), exibindo informações de forma interativa e amigável para o usuário.  

Durante o desenvolvimento, utilizamos:  
- **Hook:** `createPortal` → para exibir diálogos de forma isolada da árvore principal de componentes.  
- **Biblioteca externa:** [Material UI (MUI)](https://mui.com/) → para componentes de interface modernos e responsivos.  

Esse projeto nos proporcionou grande aprendizado em **React**, consumo de APIs, boas práticas de organização de componentes e uso de bibliotecas externas.  


## 🚀 Tecnologias Utilizadas  
- [React.js](https://react.dev/)  
- [Vite](https://vitejs.dev/)  
- [Material UI](https://mui.com/)  
- [Amiibo API](https://www.amiiboapi.com/)  


## 📂 Estrutura do Projeto  

src/  
├── api/  
├── components/  
├── contexts/    
├── App.jsx      
├── main.jsx   


## ⚙️ Como Rodar o Projeto  

### 1. Clonar o repositório  
```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
````

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar em ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:
👉 `http://localhost:5173`

### 4. Gerar versão de produção

```bash
npm run build
```

### 5. Visualizar a versão de produção localmente

```bash
npm run preview
```

### 6. Deploy para o servidor web

```bash
npm run deploy
```


## 📝 Funcionalidades Implementadas

* Consumo da Amiibo API para exibir dados dinâmicos.
* Busca com envio de parâmetros para a API.
* Validação de campos obrigatórios.
* Exibição de mensagens de erro em caso de falha na busca ou validação.
* Uso da Context API para comunicação entre componentes.
* Implementação do hook createPortal para modais/dialogs.
* Interface estilizada com Material UI.


## 📚 Aprendizado

Durante o desenvolvimento, aprendemos muito sobre:

* Estruturação de projetos em React com Vite.
* Uso prático de hooks avançados (`createPortal`).
* Consumo de APIs externas.
* Implementação de UI responsiva com Material UI.
* Boas práticas no versionamento de código com Git.
