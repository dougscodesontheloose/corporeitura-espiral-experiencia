# 🚀 Guia de Deploy - GitHub Pages

## 📋 Pré-requisitos

- Conta no GitHub
- Git instalado localmente
- Node.js instalado (versão 18 ou superior)

---

## 🔧 Passo 1: Preparar o Repositório

### 1.1 Criar repositório no GitHub

1. Acesse https://github.com/new
2. Nome sugerido: `corporeitura-espiral-experiencia`
3. **IMPORTANTE**: Deixe o repositório **PÚBLICO**
4. Não inicialize com README (já temos um)
5. Clique em "Create repository"

### 1.2 Conectar projeto local ao GitHub

```bash
# No terminal, dentro da pasta do projeto:

# Inicializar Git (se ainda não estiver inicializado)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "feat: configuração inicial do projeto Corporeitura"

# Adicionar o remote (substitua SEU_USUARIO pelo seu usuário do GitHub)
git remote add origin https://github.com/SEU_USUARIO/corporeitura-espiral-experiencia.git

# Enviar para o GitHub (branch main)
git branch -M main
git push -u origin main
```

---

## ⚙️ Passo 2: Configurar GitHub Pages

### 2.1 Habilitar GitHub Pages

1. Vá até o repositório no GitHub
2. Clique em **Settings** (⚙️ Configurações)
3. No menu lateral esquerdo, clique em **Pages**
4. Em **Source**, selecione:
   - **Source**: `GitHub Actions`
   - *(NÃO use "Deploy from a branch")*

### 2.2 Verificar permissões do Workflow

1. Ainda em **Settings**
2. No menu lateral, vá em **Actions** → **General**
3. Role até **Workflow permissions**
4. Selecione: **Read and write permissions**
5. Marque: ✅ **Allow GitHub Actions to create and approve pull requests**
6. Clique em **Save**

---

## 🎯 Passo 3: Disparar o Deploy

O workflow está configurado para rodar automaticamente em:
- Todo `git push` para a branch `main`
- Manualmente via interface do GitHub

### Opção A: Push automático (já feito no Passo 1.2)

O deploy já deve ter iniciado! 🎉

### Opção B: Deploy manual

1. Vá até a aba **Actions** no repositório
2. Clique em **Deploy to GitHub Pages** (workflow)
3. Clique em **Run workflow** → **Run workflow**

---

## 👁️ Passo 4: Acompanhar o Deploy

1. Vá até a aba **Actions**
2. Você verá o workflow rodando (🟡 amarelo = em progresso)
3. Aguarde até ficar verde (✅ sucesso)
4. O processo leva ~2-3 minutos

### Se houver erro ❌:

- Clique no workflow com erro
- Veja os logs de cada step
- Erros comuns:
  - **Dependências**: `npm ci` falhou → verifique o package.json
  - **Build**: Erro de TypeScript → rode `npm run build` localmente primeiro
  - **Permissões**: Volte ao Passo 2.2

---

## 🌐 Passo 5: Acessar o Site

Após o deploy bem-sucedido (✅ verde):

**URL do site:**
```
https://SEU_USUARIO.github.io/corporeitura-espiral-experiencia/
```

*Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub*

---

## 🔄 Atualizações Futuras

Para fazer updates no site:

```bash
# Fazer mudanças no código...

# Adicionar mudanças
git add .

# Commit
git commit -m "feat: descrição da mudança"

# Push (dispara deploy automático)
git push
```

O site será atualizado automaticamente em ~2-3 minutos! ✨

---

## 🐛 Troubleshooting

### Site não carrega / Página em branco

1. Abra o Console do navegador (F12)
2. Veja se há erros de assets não encontrados
3. Verifique se o `base: './'` está no `vite.config.ts`

### Workflow falha no npm ci

```bash
# Localmente, deletar node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar dependências
npm install

# Testar build
npm run build

# Commit e push novamente
git add package-lock.json
git commit -m "fix: atualizar package-lock.json"
git push
```

### 404 Not Found no GitHub Pages

- Certifique-se de que o repositório é **PÚBLICO**
- Verifique se **GitHub Pages** está ativo em Settings → Pages
- Aguarde 5-10 minutos (propagação de DNS)

---

## 📦 Estrutura de Deploy

```
Seu código (main branch)
    ↓
GitHub Actions (build automático)
    ↓
npm install → npm run build
    ↓
Pasta /dist (gerada)
    ↓
GitHub Pages (servindo /dist)
    ↓
https://seu-usuario.github.io/repo-name
```

---

## ✅ Checklist Final

- [ ] Repositório criado e público
- [ ] Código enviado para GitHub (git push)
- [ ] GitHub Pages configurado com "GitHub Actions"
- [ ] Workflow permissions configuradas
- [ ] Deploy rodou com sucesso (✅ verde)
- [ ] Site acessível no navegador
- [ ] Espiral 3D carregando corretamente
- [ ] Interações funcionando (cliques nos pontos)

---

## 🎨 Próximos Passos (Opcional)

1. **Custom domain**: Configure um domínio próprio em Settings → Pages
2. **README melhorado**: Adicione screenshots do projeto
3. **Analytics**: Adicione Google Analytics para medir visitas
4. **SEO**: Adicione meta tags para melhor indexação

---

**Dúvidas?** Verifique os logs em: Actions → Deploy to GitHub Pages → Qualquer step com erro
