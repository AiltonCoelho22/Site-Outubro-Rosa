// Inicializa o EmailJS
(function() {
    emailjs.init("SEU_USER_ID_AQUI"); // ⚠️ Substitua com seu User ID do EmailJS
})();

// Função para mostrar mensagens de feedback
function showMessage(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.role = 'alert';
    alertDiv.innerText = message;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form.nextSibling);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => alertDiv.remove(), 5000);
}

// Função para validar o formulário
function validateForm(formData) {
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!email || !email.includes('@')) {
        showMessage('Por favor, insira um e-mail válido.', 'error');
        return false;
    }
    
    if (!message || message.length < 10) {
        showMessage('A mensagem deve ter pelo menos 10 caracteres.', 'error');
        return false;
    }
    
    return true;
}

// Função para lidar com o envio do formulário
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtém os dados do formulário
    const formData = new FormData(this);
    
    // Valida o formulário
    if (!validateForm(formData)) return;
    
    // Mostra indicador de carregamento
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
    
    // Prepara os parâmetros para o EmailJS
    const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        message: formData.get('message'),
        subject: formData.get('subject') || 'Mensagem do Site Outubro Rosa'
    };
    
    // Envia o e-mail usando EmailJS
    emailjs.send('default_service', 'SEU_TEMPLATE_ID_AQUI', templateParams)
        .then(function(response) {
            showMessage('Mensagem enviada com sucesso! Em breve entraremos em contato.', 'success');
            event.target.reset(); // Limpa o formulário
        })
        .catch(function(error) {
            showMessage('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
            console.error('Erro:', error);
        })
        .finally(function() {
            // Restaura o botão
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        });
});