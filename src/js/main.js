// Elements
const body = document.body;
const donateModal = document.getElementById('donateModal');
const openDonate = document.getElementById('openDonate');
const ctaDoar = document.getElementById('ctaDoar');
const closeModal = document.getElementById('closeModal');
const mobileBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.querySelector('.main-nav');
const toggle = document.getElementById('themeToggle');

// Modal functions
function showModal() {
    donateModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    donateModal.classList.remove('show');
    document.body.style.overflow = '';
}

// Event listeners for modal
openDonate.onclick = showModal;
ctaDoar.onclick = showModal;
closeModal.onclick = hideModal;

// Form submission
document.getElementById('donateForm').addEventListener('submit', e => {
    e.preventDefault();
    const val = document.querySelector('input[name="amount"]:checked');
    if (!val) {
        alert("Escolha um valor.");
        return;
    }
    alert("Obrigado por doar R$" + val.value + "!");
    hideModal();
});

// Mobile menu
if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', e => {
        const opened = mainNav.classList.toggle('open');
        mobileBtn.setAttribute('aria-expanded', opened ? 'true' : 'false');
        mobileBtn.classList.toggle('open', opened);
    });

    // Close menu when clicking outside
    document.addEventListener('click', e => {
        if (!mainNav.contains(e.target) && !mobileBtn.contains(e.target) && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            mobileBtn.setAttribute('aria-expanded', 'false');
            mobileBtn.classList.remove('open');
        }
    });
}

// Theme toggle
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggle.textContent = "☀️";
}

toggle.onclick = () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        toggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        toggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
};