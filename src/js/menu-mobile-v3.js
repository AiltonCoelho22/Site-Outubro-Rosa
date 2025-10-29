// Controle do Menu Mobile V3
(function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const menuIcon = menuToggle.querySelector('i');
    let isAnimating = false;

    // Função para abrir o menu
    function openMenu() {
        if (isAnimating) return;
        isAnimating = true;

        mainNav.classList.add('active');
        menuToggle.classList.add('active');
        menuIcon.classList.remove('bi-list');
        menuIcon.classList.add('bi-x-lg');
        menuToggle.setAttribute('aria-expanded', 'true');
        mainNav.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Foco no primeiro item do menu
        setTimeout(() => {
            const firstFocusable = mainNav.querySelector('a, button');
            if (firstFocusable) firstFocusable.focus();
            isAnimating = false;
        }, 300);
    }

    // Função para fechar o menu
    function closeMenu() {
        if (isAnimating) return;
        isAnimating = true;

        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuIcon.classList.add('bi-list');
        menuIcon.classList.remove('bi-x-lg');
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        // Retorna o foco ao botão do menu
        menuToggle.focus();
        
        setTimeout(() => {
            isAnimating = false;
        }, 300);
    }

    // Toggle do menu
    menuToggle.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Fechar menu ao clicar em links (em mobile)
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Fechar com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            closeMenu();
        }
    });

    // Trap focus dentro do menu quando aberto
    mainNav.addEventListener('keydown', (e) => {
        if (!mainNav.classList.contains('active')) return;

        const focusableElements = mainNav.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
})();