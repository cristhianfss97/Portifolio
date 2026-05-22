const GITHUB_USER = 'cristhianfss97';
const projectsGrid = document.getElementById('projectsGrid');
const repoCount = document.getElementById('repoCount');

document.getElementById('year').textContent = new Date().getFullYear();

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
menuBtn.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function repoDescription(repo){
  if(repo.description) return repo.description;
  const name = repo.name.toLowerCase();
  if(name.includes('estoque') || name.includes('produto')) return 'Sistema para controle e gerenciamento de produtos, entradas, saídas e relatórios.';
  if(name.includes('pdv')) return 'Projeto voltado para ponto de venda, autenticação, gestão de produtos e vendas.';
  if(name.includes('rede')) return 'Ferramenta para apoio técnico, diagnóstico de rede e organização de testes.';
  if(name.includes('ferias')) return 'Aplicação para cálculo trabalhista e automação de rotinas administrativas.';
  return 'Projeto desenvolvido para praticar tecnologia, organização de código e criação de soluções reais.';
}

async function loadGitHubProjects(){
  try{
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`);
    if(!res.ok) throw new Error('Não foi possível carregar os repositórios.');
    const repos = await res.json();
    const visibleRepos = repos
      .filter(repo => !repo.fork)
      .sort((a,b) => (b.stargazers_count - a.stargazers_count) || new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 6);

    repoCount.textContent = `${repos.filter(r => !r.fork).length}+`;
    projectsGrid.innerHTML = visibleRepos.map(repo => `
      <article class="project-card reveal active">
        <div class="project-head">
          <h3>${repo.name}</h3>
          <span class="badge">${repo.private ? 'Private' : 'Public'}</span>
        </div>
        <p>${repoDescription(repo)}</p>
        <div class="repo-meta">
          <span><i class="lang-dot"></i>${repo.language || 'Código'}</span>
          <span>☆ ${repo.stargazers_count}</span>
          <span>⑂ ${repo.forks_count}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" rel="noopener">Ver no GitHub ↗</a>
      </article>
    `).join('');
  }catch(error){
    projectsGrid.innerHTML = `
      <article class="project-card reveal active"><h3>Controle de Produtos</h3><p>Sistema para controle de produtos internos, gestão de estoque e visualização de informações.</p><a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener">Ver GitHub ↗</a></article>
      <article class="project-card reveal active"><h3>Assistente de Redes</h3><p>Ferramenta de diagnóstico de redes com interface moderna para apoio técnico.</p><a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener">Ver GitHub ↗</a></article>
      <article class="project-card reveal active"><h3>Projetos em Python</h3><p>Automações, cálculos e sistemas criados para resolver problemas reais.</p><a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener">Ver GitHub ↗</a></article>
    `;
  }
}

loadGitHubProjects();
