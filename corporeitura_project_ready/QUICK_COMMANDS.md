# ⚡ Comandos Rápidos - Corporeitura

## 🚀 Deploy Inicial (Primeira Vez)

```bash
# 1. Inicializar Git
git init
git add .
git commit -m "feat: setup inicial do projeto Corporeitura"

# 2. Conectar ao GitHub (IMPORTANTE: substituir SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/corporeitura-espiral-experiencia.git
git branch -M main
git push -u origin main
```

## 🔄 Atualizações Rápidas

```bash
# Depois de fazer mudanças no código:
git add .
git commit -m "feat: descrição da mudança"
git push
```

## 🧪 Testar Localmente (Antes de Deploy)

```bash
# Instalar dependências (primeira vez)
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Build de produção (testar se compila)
npm run build

# Preview do build
npm run preview
```

## 📦 Estrutura de Branches

```bash
# Criar branch para experimentar mudanças
git checkout -b feature/nova-funcionalidade

# Voltar para main
git checkout main

# Merge da feature
git merge feature/nova-funcionalidade

# Push após merge
git push
```

## 🔧 Troubleshooting Rápido

```bash
# Limpar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install

# Verificar status do Git
git status

# Ver diferenças antes de commit
git diff

# Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1

# Ver histórico de commits
git log --oneline
```

## 🌐 URLs Importantes

**Desenvolvimento Local:**
```
http://localhost:5173
```

**Produção (GitHub Pages):**
```
https://SEU_USUARIO.github.io/corporeitura-espiral-experiencia/
```

**Repositório:**
```
https://github.com/SEU_USUARIO/corporeitura-espiral-experiencia
```

## 📋 Checklist Antes de Push

- [ ] `npm run build` executa sem erros
- [ ] Testei localmente com `npm run dev`
- [ ] Arquivos sensíveis não estão sendo commitados
- [ ] Mensagem de commit é descritiva
- [ ] README atualizado (se necessário)

## 🎨 Personalização Rápida

### Mudar cores da paleta oceânica:

Editar `index.html`, seção `tailwind.config`:

```javascript
colors: {
  'ocean-deep': '#0a1628',      // Fundo azul profundo
  'jelly-turquoise': '#40e0d0', // Turquesa brilhante
  'jelly-blue': '#98d8e8',      // Azul claro
  'jelly-lavender': '#b19cd9',  // Lavanda
  'jelly-pink': '#ffd1dc',      // Rosa suave
  'jelly-aqua': '#7fffd4',      // Água-marinha
}
```

### Ajustar espiral (raio, altura, voltas):

Editar `components/Spiral3D.tsx`, linha ~66:

```javascript
const loops = 4.5;      // Número de voltas
const height = 8;       // Altura vertical
const radiusMax = 6;    // Raio máximo
```

## 💡 Dicas de Performance

```bash
# Ver tamanho do bundle após build
npm run build
du -sh dist/

# Otimizar imagens antes de adicionar
# Use https://tinypng.com/

# Limpar cache do navegador
# Chrome: Ctrl+Shift+Delete
# Firefox: Ctrl+Shift+Delete
```

## 🐛 Erros Comuns

**"npm ci failed"**
→ Deletar `node_modules` e `package-lock.json`, rodar `npm install`

**"Page not found" no GitHub Pages**
→ Verificar Settings → Pages → Source = "GitHub Actions"

**Página branca no deploy**
→ Abrir Console (F12), verificar erros de assets

**Three.js não carrega**
→ Verificar importações em `Spiral3D.tsx`

---

**Pro tip:** Sempre teste localmente com `npm run build && npm run preview` antes de fazer push! ✨
