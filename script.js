const services = [
  {
    title: 'Prévoyance médico-sociale',
    items: ['Centre médico-social', 'Assurance Maladie Complémentaire', 'Assistance Médicale et Transport Sanitaire', 'Aide aux enfants en situation de handicap', 'Conventions et partenariats médicaux']
  },
  {
    title: 'Culture, loisirs et voyages',
    items: ['Loisirs et voyages', 'Colonies de vacances', 'Omra', 'Pèlerinage', 'Cérémonies', 'Conventions partenaires']
  },
  {
    title: 'Scolarisation et formation',
    items: ['Coaching scolaire et parental', 'Bourses d’excellence', 'Primes de rentrée scolaire', 'Conventions éducatives']
  },
  {
    title: 'Accès au logement',
    items: ['Aide au logement', 'Offres bancaires préférentielles', 'Promoteurs immobiliers', 'Projets logement FOS-Agri']
  },
  {
    title: 'Appui aux projets personnels',
    items: ['Crédits sociaux', 'Institutions financières', 'Partenariats subventionnés', 'Tarifs préférentiels']
  }
];

const defaultPosts = [
  { title: 'Bienvenue sur la démonstration FOS-Agri', category: 'Actualité', content: 'Cette version présente le site public et un back office statique sans base de données.' },
  { title: 'Phase 2 prévue', category: 'Prestation', content: 'L’espace adhérent et les dashboards seront ajoutés après validation client.' }
];

const servicesGrid = document.querySelector('#servicesGrid');
const searchInput = document.querySelector('#searchInput');
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const postForm = document.querySelector('#postForm');
const postsList = document.querySelector('#postsList');

function renderServices(filter = '') {
  const query = filter.trim().toLowerCase();
  const filtered = services.filter(service =>
    service.title.toLowerCase().includes(query) ||
    service.items.some(item => item.toLowerCase().includes(query))
  );

  servicesGrid.innerHTML = filtered.map(service => `
    <article class="card service-card">
      <h3>${service.title}</h3>
      <ul>${service.items.map(item => `<li>${item}</li>`).join('')}</ul>
    </article>
  `).join('') || '<p>Aucun résultat trouvé.</p>';
}

function getPosts() {
  const stored = localStorage.getItem('fosAgriPosts');
  return stored ? JSON.parse(stored) : defaultPosts;
}

function savePosts(posts) {
  localStorage.setItem('fosAgriPosts', JSON.stringify(posts));
}

function renderPosts() {
  const posts = getPosts();
  postsList.innerHTML = posts.map((post, index) => `
    <article class="post-item">
      <div>
        <small>${post.category}</small>
        <h3>${post.title}</h3>
        <p>${post.content}</p>
      </div>
      <button type="button" data-index="${index}">Supprimer</button>
    </article>
  `).join('');
}

navToggle?.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav?.addEventListener('click', event => {
  if (event.target.tagName === 'A') mainNav.classList.remove('open');
});
searchInput?.addEventListener('input', event => renderServices(event.target.value));
postForm?.addEventListener('submit', event => {
  event.preventDefault();
  const posts = getPosts();
  posts.unshift({
    title: document.querySelector('#postTitle').value,
    content: document.querySelector('#postContent').value,
    category: document.querySelector('#postCategory').value
  });
  savePosts(posts);
  postForm.reset();
  renderPosts();
});
postsList?.addEventListener('click', event => {
  if (event.target.matches('button[data-index]')) {
    const posts = getPosts();
    posts.splice(Number(event.target.dataset.index), 1);
    savePosts(posts);
    renderPosts();
  }
});

renderServices();
renderPosts();
