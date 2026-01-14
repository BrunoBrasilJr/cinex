# 🎬 Cinéx

**Cinéx** é um catálogo de filmes e séries desenvolvido com foco em **experiência do usuário (UX)**, organização de código e boas práticas modernas de **Front-end**.

O projeto foi criado para servir como **projeto principal de portfólio** (estágio / júnior), indo além de um CRUD básico e explorando decisões reais de produto, interface e usabilidade.

---

## ✨ Funcionalidades

- 📌 Cadastro de filmes e séries (CRUD completo no front-end)
- 🔍 Busca por título e notas
- 🎯 Filtros por avaliação (estrelas) e gênero
- ⭐ Avaliação por estrelas
- 💾 Persistência de dados com `localStorage`
- 🧼 Estados inteligentes (botões só ativam quando fazem sentido)
- 🌙 Interface dark com foco em legibilidade
- 🎞️ Animações suaves entre navegação de páginas
- 📱 Layout totalmente responsivo (mobile-first)

---

## 🧠 Por que “Cinéx”?

O nome **Cinéx** nasce da junção de dois conceitos:

- **Ciné** → cinema, filmes e séries
- **X** → experiência (UX) e extensibilidade

A proposta do projeto é ser simples, mas **bem pensado**, onde cada interação tem um propósito claro.  
Nada de ações confusas, botões inúteis ou estados quebrados — tudo foi desenhado para parecer um **produto real**, não apenas um exercício acadêmico.

---

## 🛠️ Tecnologias utilizadas

- **Next.js** (App Router)
- **TypeScript**
- **React**
- **Tailwind CSS**
- **localStorage** (persistência no navegador)

---

## 📁 Arquitetura de pastas

O projeto segue uma organização focada em escalabilidade e separação de responsabilidades:

📁 Arquitetura de pastas

src/
├─ app/ # Rotas e páginas (Next.js App Router)
├─ components/ # Componentes reutilizáveis (UI e layout)
├─ features/ # Regras de negócio (catálogo de filmes/séries)
├─ lib/ # Helpers e utilidades
├─ styles/ # Estilos globais e tema

---

🚀 Como rodar o projeto localmente

Clone o repositório:

git clone https://github.com/BrunoBrasilJr/cinex.git

Entre na pasta do projeto:

cd cinex

Instale as dependências:

npm install

Inicie o servidor de desenvolvimento:

npm run dev

Acesse no navegador:

http://localhost:3000

Obs: este projeto é front-end only e não possui backend.

---

🌐 Deploy

O Cinéx pode ser facilmente publicado na Vercel, com integração direta ao GitHub.

---

👨‍💻 Autor

Desenvolvido por Bruno Brasil
GitHub: https://github.com/BrunoBrasilJr

Projeto criado com foco em aprendizado prático, portfólio e boas práticas de UX/UI no desenvolvimento front-end.
