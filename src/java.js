// Rolagem suave ao clicar nos links do menu
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').substring(1);
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

// Detecta tema do sistema (claro/escuro)
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDark) {
  document.body.classList.add('dark');
}

// Rotating phrases under hero
;(function(){
  const phrases = Array.from(document.querySelectorAll('.rotating-phrases .phrase'));
  if (!phrases.length) return;
  let idx = 0;
  const show = i => {
    phrases.forEach((p, j) => p.classList.toggle('active', j === i));
  }
  show(idx);
  setInterval(() => {
    idx = (idx + 1) % phrases.length;
    show(idx);
  }, 10000); // 10 seconds
})();

// Modal accessibility: close with Escape and trap focus simply
const donateModal = document.getElementById('donateModal');
const openDonate = document.getElementById('openDonate');
const ctaDoar = document.getElementById('ctaDoar');
const closeModal = document.getElementById('closeModal');

if (openDonate) openDonate.addEventListener('click', () => { donateModal.style.display = 'flex'; });
if (ctaDoar) ctaDoar.addEventListener('click', () => { donateModal.style.display = 'flex'; });
if (closeModal) closeModal.addEventListener('click', () => { donateModal.style.display = 'none'; });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && donateModal && donateModal.style.display === 'flex') {
    donateModal.style.display = 'none';
  }
});

// Theme toggle aria handling
const toggle = document.getElementById('themeToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const pressed = document.body.classList.contains('dark');
    toggle.setAttribute('aria-pressed', String(pressed));
    toggle.textContent = pressed ? '☀️' : '🌙';
    localStorage.setItem('theme', pressed ? 'dark' : 'light');
  });
}

// Simple tab handling for autoexame
(function(){
  const tabs = Array.from(document.querySelectorAll('.tab'));
  if (!tabs.length) return;
  const panels = (id)=> document.getElementById(id);

  const activate = (tab)=>{
    tabs.forEach(t=> t.setAttribute('aria-selected','false'));
    tab.setAttribute('aria-selected','true');
    tabs.forEach(t=> panels(t.getAttribute('aria-controls')).hidden = true);
    panels(tab.getAttribute('aria-controls')).hidden = false;
  }

  tabs.forEach(t=>{
    t.addEventListener('click', ()=> activate(t));
    t.addEventListener('keydown', (e)=>{
      const idx = tabs.indexOf(t);
      if (e.key === 'ArrowRight') tabs[(idx+1)%tabs.length].focus();
      if (e.key === 'ArrowLeft') tabs[(idx-1+tabs.length)%tabs.length].focus();
    });
  });
})();

// Animação ao rolar
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  
  elements.forEach(element => {
    const position = element.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;
    
    if(position < screenHeight * 0.8) {
      element.classList.add('visible');
    }
  });
}

// Adicionar classe fade-in aos elementos
document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-in');
});

// Listener para scroll
window.addEventListener('scroll', handleScrollAnimations);

// Ativar primeira animação
handleScrollAnimations();

// Rotação melhorada das quotes
function rotateQuotes() {
  const quotes = document.querySelectorAll('.quote');
  let currentIndex = 0;
  
  function showNextQuote() {
    quotes.forEach(quote => quote.classList.remove('active'));
    quotes[currentIndex].classList.add('active');
    currentIndex = (currentIndex + 1) % quotes.length;
  }
  
  showNextQuote(); // Mostrar primeira quote
  setInterval(showNextQuote, 5000);
}

document.addEventListener('DOMContentLoaded', rotateQuotes);

// Carrossel de histórias
function initStoriesCarousel() {
  const slides = document.querySelectorAll('.story-slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    slides[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(0);
  setInterval(nextSlide, 5000);
}

// Expandir histórias
document.querySelectorAll('.btn-read-more').forEach(btn => {
  btn.addEventListener('click', () => {
    const storyFull = btn.previousElementSibling;
    storyFull.hidden = !storyFull.hidden;
    btn.textContent = storyFull.hidden ? 'Ler Mais' : 'Ler Menos';
  });
});

// Inicializar carrossel quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initStoriesCarousel);

// Conteúdo da história completa
const storiesContent = {
  tathiana: `
    <article class="story-full">
      <h2>História de Tathiana França</h2>
      
      <div class="story-chapter">
        <h3><i class="bi bi-bookmark-heart"></i> O Diagnóstico</h3>
        <p>Trabalhava em uma pizzaria no ano de 2017, estava conversando com um funcionário e mexendo no cordão que do nada, caiu. Quando fui pegar senti um caroço no peito. Passei a mão novamente e me desesperei porque nunca tinha sentido ele antes. No dia seguinte procurei um clínico geral que me passou uma ultrassonografia da mama. Fiz a ultra e a médica me recomendou procurar um mastologista. Aí começou minha correria contra o tempo. Mamografia, biópsia e o resultado. Quando o médico falou "Tathi, você está com câncer de mama", eu me desesperei, gritei, chorei, porque infelizmente a gente não lembra de quem se curou, só lembra do artista ou do conhecido que faleceu!</p>
      </div>

      <div class="story-chapter">
        <h3><i class="bi bi-heart-pulse"></i> O Tratamento</h3>
        <p>O câncer que eu tive era do tipo triplo negativo, o mais agressivo. Passei por oito sessões de quimioterapia sendo, quatro vermelhas e quatro brancas. Meu cabelo caiu 15 dias após a primeira sessão e a sobrancelha também. Em maio de 2018 passei pela operação mastectomia total. Esse foi e continua sendo o momento mais difícil, eu me olhar no espelho sem uma mama. Dou graças a Deus também porque estou viva e a cicatriz é a marca da minha vitória!</p>
      </div>

      <div class="story-chapter">
        <h3><i class="bi bi-people-fill"></i> Apoio Familiar</h3>
        <p>Minha família e meus filhos foram meu porto seguro em todo o tratamento, sem o apoio deles seria bem mais difícil. E Deus me sustentou todos os dias, porque sem Ele nada somos.</p>
      </div>

      <div class="story-chapter highlight">
        <h3><i class="bi bi-stars"></i> Nova Missão</h3>
        <p>E depois de 3 anos, infelizmente passei por tudo novamente. A doença não voltou em mim, mas foi diagnosticada na minha irmã. Acompanhei ela em todas as sessões de quimioterapia. Estive juntinho no dia que ela operou, fazendo também a mastectomia total. Hoje estamos curadas!</p>
      </div>

      <blockquote class="story-message">
        "Para aquelas que pegaram o diagnóstico recente ou estão passando pelo que passei, não desistam, lutem! Cabelo nasce, sobrancelha também: o mais importante que isso tudo é a nossa vida, é a nossa cura!"
      </blockquote>
    </article>
  `
};

// Event listener para abrir o modal
document.querySelectorAll('.btn-expand').forEach(btn => {
  btn.addEventListener('click', () => {
    const storyId = btn.dataset.story;
    if (storiesContent[storyId]) {
      const modal = document.getElementById('storyModal');
      const modalBody = modal.querySelector('.modal-body');
      modalBody.innerHTML = storiesContent[storyId];
      modal.hidden = false;
      setTimeout(() => modal.classList.add('active'), 10);
    }
  });
});

// cole no Console do DevTools estando na página (funciona melhor se servir via Live Server)
['./img/jaqueline.jpg','./img/jussara.jpg','./img/tathiana-franca.jpeg'].forEach(src=>{
  fetch(src).then(r=>{
    console.log(src, r.status, r.ok);
  }).catch(e=>{
    console.error('erro fetch', src, e);
  });
});
