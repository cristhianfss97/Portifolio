# Portfólio - Cristhian Soares

Site de portfólio profissional com interface moderna, imagem cartoon e carregamento automático dos projetos públicos do GitHub.

## Como executar localmente

Abra a pasta do projeto e rode:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

Também é possível abrir o arquivo `index.html` diretamente no navegador.

## Como publicar online pelo GitHub Pages

1. Crie um repositório no GitHub, por exemplo: `portfolio-cristhian`.
2. Envie todos os arquivos deste projeto para o repositório.
3. No GitHub, acesse: `Settings` > `Pages`.
4. Em `Build and deployment`, selecione:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Clique em `Save`.
6. O GitHub irá gerar um link público, parecido com:

```text
https://cristhianfss97.github.io/portfolio-cristhian/
```

## Onde alterar dados

- Nome e textos principais: `index.html`
- Visual, cores e responsividade: `styles.css`
- Integração com GitHub: `script.js`
- Imagem cartoon: `assets/avatar-cartoon.png`
