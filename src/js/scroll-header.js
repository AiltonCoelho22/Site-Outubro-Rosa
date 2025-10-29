// Controle de visibilidade do header no scroll
;(function() {
    const header = document.querySelector('.site-header');
    let lastScroll = 0;
    const scrollThreshold = 50; // Quantidade mínima de scroll para esconder/mostrar
    
    // Função throttle para limitar a frequência de execução
    const throttle = (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Função para controlar a visibilidade do header
    const handleScroll = throttle(() => {
        const currentScroll = window.pageYOffset;
        
        // Não faz nada se o scroll for muito pequeno
        if (currentScroll < scrollThreshold) {
            header.classList.remove('nav-up');
            return;
        }
        
        // Compara a direção do scroll
        if (currentScroll > lastScroll) {
            // Scroll para baixo
            header.classList.add('nav-up');
        } else {
            // Scroll para cima
            header.classList.remove('nav-up');
        }
        
        lastScroll = currentScroll;
    }, 100); // Executa no máximo a cada 100ms

    // Adiciona o listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
})();