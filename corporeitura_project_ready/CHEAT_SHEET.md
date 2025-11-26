# 📄 COLA RÁPIDA - Deploy em 5 Minutos

## ⚡ 3 COMANDOS ESSENCIAIS

### 1️⃣ Inicializar e Commitar
```bash
git init
git add .
git commit -m "feat: setup inicial"
```

### 2️⃣ Conectar ao GitHub (trocar SEU_USUARIO!)
```bash
git remote add origin https://github.com/SEU_USUARIO/corporeitura-espiral-experiencia.git
git branch -M main
git push -u origin main
```

### 3️⃣ Acessar o site (trocar SEU_USUARIO!)
```
https://SEU_USUARIO.github.io/corporeitura-espiral-experiencia/
```

---

## ⚙️ 2 CONFIGURAÇÕES NO GITHUB

### A. Habilitar Pages
```
Repo → Settings → Pages
Source: GitHub Actions ⚠️
```

### B. Dar Permissões
```
Settings → Actions → General
Workflow permissions: Read and write ✅
Allow GitHub Actions to create PRs ✅
```

---

## 🚨 SE DER ERRO

### Workflow falhou?
```bash
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "fix: update lock"
git push
```

### Página 404?
- Repo é PÚBLICO? ✅
- Source = GitHub Actions? ✅
- Aguarde 10 minutos

### Página branca?
- Abra Console (F12)
- Veja erros de assets
- Confirme base: './' no vite.config.ts

---

## ✅ CHECKLIST MÍNIMO

- [ ] Criei repo PÚBLICO no GitHub
- [ ] Rodei os 3 comandos acima
- [ ] Configurei Pages → GitHub Actions
- [ ] Dei permissões Read+Write
- [ ] Aguardei workflow ficar verde (✅)
- [ ] Acessei a URL e funcionou!

---

## 📞 AJUDA EXTRA

- 📖 Leia: COMECE_AQUI.md (resumo completo)
- 📚 Leia: DEPLOY_GUIDE.md (detalhes)
- ✅ Use: DEPLOY_CHECKLIST.md (passo a passo)

---

**Pronto! Site no ar em ~2-3 minutos após o push. 🚀**
