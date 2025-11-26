# ✅ Checklist de Deploy - Corporeitura

Imprima ou marque conforme avança! 🚀

---

## 📦 FASE 1: Preparação Local

```
┌─────────────────────────────────────────────┐
│ ANTES DE COMEÇAR                            │
└─────────────────────────────────────────────┘
```

- [ ] Node.js instalado (v18+)
  ```bash
  node --version
  ```

- [ ] Git instalado
  ```bash
  git --version
  ```

- [ ] Conta no GitHub criada
  https://github.com

- [ ] Pasta do projeto baixada/extraída

---

## 🌐 FASE 2: Criar Repositório GitHub

```
┌─────────────────────────────────────────────┐
│ https://github.com/new                      │
└─────────────────────────────────────────────┘
```

- [ ] Acessei github.com/new

- [ ] Nome do repo: `corporeitura-espiral-experiencia`

- [ ] Visibilidade: **PUBLIC** (importante!) ⚠️

- [ ] NÃO marquei "Add README"

- [ ] Cliquei "Create repository"

- [ ] Copiei a URL do repo:
  ```
  https://github.com/________/corporeitura-espiral-experiencia
  ```

---

## 🔗 FASE 3: Conectar Código ao GitHub

```
┌─────────────────────────────────────────────┐
│ TERMINAL - Na pasta do projeto              │
└─────────────────────────────────────────────┘
```

- [ ] Abri o terminal na pasta do projeto

- [ ] Executei: `git init`

- [ ] Executei: `git add .`

- [ ] Executei: `git commit -m "feat: setup inicial"`

- [ ] Executei (substituindo MEU_USUARIO):
  ```bash
  git remote add origin https://github.com/MEU_USUARIO/corporeitura-espiral-experiencia.git
  ```

- [ ] Executei: `git branch -M main`

- [ ] Executei: `git push -u origin main`

- [ ] Vi mensagem de sucesso no terminal ✅

---

## ⚙️ FASE 4: Configurar GitHub Pages

```
┌─────────────────────────────────────────────┐
│ REPOSITÓRIO → SETTINGS → PAGES              │
└─────────────────────────────────────────────┘
```

- [ ] Acessei meu repositório no GitHub

- [ ] Cliquei na aba "Settings" ⚙️

- [ ] No menu lateral, cliquei em "Pages"

- [ ] Em "Source", selecionei: **GitHub Actions** ⚠️
      (NÃO "Deploy from a branch")

---

## 🔐 FASE 5: Configurar Permissões

```
┌─────────────────────────────────────────────┐
│ SETTINGS → ACTIONS → GENERAL                │
└─────────────────────────────────────────────┘
```

- [ ] Ainda em Settings, cliquei "Actions" → "General"

- [ ] Rolei até "Workflow permissions"

- [ ] Selecionei: **Read and write permissions** ⚠️

- [ ] Marquei: **Allow GitHub Actions to create and approve pull requests** ✅

- [ ] Cliquei "Save"

---

## 🚀 FASE 6: Iniciar Deploy

```
┌─────────────────────────────────────────────┐
│ O DEPLOY JÁ DEVE TER INICIADO!              │
└─────────────────────────────────────────────┘
```

- [ ] Acessei aba "Actions" no repositório

- [ ] Vi o workflow "Deploy to GitHub Pages"
      - 🟡 Amarelo = Rodando
      - ✅ Verde = Sucesso
      - ❌ Vermelho = Erro (ver logs)

- [ ] Aguardei ~2-3 minutos

- [ ] Status ficou VERDE ✅

---

## 🌐 FASE 7: Verificar Site Online

```
┌─────────────────────────────────────────────┐
│ ACESSAR O SITE                               │
└─────────────────────────────────────────────┘
```

- [ ] Acessei (substituindo MEU_USUARIO):
  ```
  https://MEU_USUARIO.github.io/corporeitura-espiral-experiencia/
  ```

- [ ] Página carregou corretamente ✅

- [ ] Espiral 3D está visível ✅

- [ ] Controles de zoom funcionam ✅

- [ ] Pontos interativos respondem ao clique ✅

- [ ] Painel de informações exibe corretamente ✅

---

## 🎉 FASE 8: Celebrar!

```
┌─────────────────────────────────────────────┐
│ PROJETO PUBLICADO COM SUCESSO! 🎊           │
└─────────────────────────────────────────────┘
```

- [ ] Compartilhei a URL com colegas/orientador

- [ ] Adicionei o link no README do repo

- [ ] Salvei a URL nos favoritos

---

## 🔄 FASE 9: Atualizações Futuras

```
┌─────────────────────────────────────────────┐
│ PARA FAZER MUDANÇAS NO SITE                 │
└─────────────────────────────────────────────┘
```

Quando quiser atualizar o site:

1. [ ] Editar arquivos localmente

2. [ ] Testar localmente:
   ```bash
   npm run dev
   ```

3. [ ] Commitar mudanças:
   ```bash
   git add .
   git commit -m "descrição da mudança"
   git push
   ```

4. [ ] Aguardar 2-3 minutos

5. [ ] Recarregar a página do site

---

## 🐛 TROUBLESHOOTING

### Se algo der errado:

**❌ Workflow falhou (vermelho)**
- [ ] Cliquei no workflow com erro
- [ ] Li os logs de cada step
- [ ] Vi qual comando falhou
- [ ] Consultei DEPLOY_GUIDE.md

**❌ Página 404 ou não encontrada**
- [ ] Verifiquei: Repo é PÚBLICO?
- [ ] Verifiquei: Pages está ativo?
- [ ] Aguardei 10 minutos extras
- [ ] Limpei cache do navegador (Ctrl+Shift+Del)

**❌ Página branca**
- [ ] Abri Console do navegador (F12)
- [ ] Verifiquei erros no console
- [ ] Conferi que base: './' está no vite.config.ts
- [ ] Testei build local: `npm run build`

---

## 📞 Ajuda Extra

**Documentação completa:**
- 📖 DEPLOY_GUIDE.md
- ⚡ QUICK_COMMANDS.md
- 🔧 CORRECTIONS_SUMMARY.md

**Links úteis:**
- https://docs.github.com/pages
- https://vitejs.dev/guide/static-deploy

---

## 🎯 URL Final do Projeto

```
┌─────────────────────────────────────────────┐
│ COLE SUA URL AQUI:                          │
│                                             │
│ https://________________________________    │
│ _______________________________.github.io/  │
│ corporeitura-espiral-experiencia/           │
│                                             │
└─────────────────────────────────────────────┘
```

**Status:** [ ] 🎉 NO AR!

---

**Data do Deploy:** ____/____/______

**Tempo total:** ______ minutos

**Dificuldades encontradas:**
_________________________________________________
_________________________________________________
_________________________________________________

**Aprendizados:**
_________________________________________________
_________________________________________________
_________________________________________________
