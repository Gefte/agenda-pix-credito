// ===== ANIMAÇÕES E INTERAÇÕES =====

// Animação de entrada dos elementos
document.addEventListener('DOMContentLoaded', function() {
    // Animação de fade-in para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos elementos
    const animatedElements = document.querySelectorAll('.form-wrapper, .hero-content, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animação de digitação no placeholder
    setupPlaceholderAnimation();
    
    // Setup de máscaras de input
    setupInputMasks();
});

// Animação de placeholders
function setupPlaceholderAnimation() {
    const phoneInput = document.getElementById('telefone');
    
    phoneInput.addEventListener('focus', function() {
        if (!this.value) {
            this.placeholder = '(11) 99999-9999';
        }
    });
    
    phoneInput.addEventListener('blur', function() {
        if (!this.value) {
            this.placeholder = 'Seu telefone';
        }
    });
}

// Máscaras de input
function setupInputMasks() {
    const phoneInput = document.getElementById('telefone');
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = value;
    });
}

// Animação do botão de submit
function setupButtonAnimation() {
    const submitBtn = document.querySelector('.cta-button');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            // Criar efeito ripple
            const ripple = this.querySelector('.btn-ripple');
            if (ripple) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.width = '0';
                ripple.style.height = '0';
                
                setTimeout(() => {
                    ripple.style.width = '300px';
                    ripple.style.height = '300px';
                }, 10);
            }
        });
    }
}

// Modal de sucesso
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Confetti effect (opcional)
    createConfetti();
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Efeito confetti simples
function createConfetti() {
    const colors = ['#FFD700', '#E6B800', '#8B4513'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '10001';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Animação de queda
        const fallDuration = Math.random() * 3000 + 2000;
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 20}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: fallDuration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}

// Validação em tempo real
function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const isValid = field.checkValidity();
    
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('success');
    } else {
        field.classList.remove('success');
        field.classList.add('error');
    }
}

// Loading state do botão
function setButtonLoading(loading) {
    const btn = document.querySelector('.cta-button');
    const btnText = btn.querySelector('.btn-text');
    const btnIcon = btn.querySelector('.btn-icon');
    
    if (btn && btnText && btnIcon) {
        if (loading) {
            btn.disabled = true;
            btnText.textContent = 'Enviando...';
            btnIcon.className = 'fas fa-spinner fa-spin btn-icon';
            btn.style.opacity = '0.7';
        } else {
            btn.disabled = false;
            btnText.textContent = 'Entrar na Rede Agora';
            btnIcon.className = 'fas fa-rocket btn-icon';
            btn.style.opacity = '1';
        }
    }
}

// ===== FORM SUBMISSION =====
document.getElementById('leadForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validar formulário
    const form = e.target;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Mostrar loading
    setButtonLoading(true);

    const formData = {
        name: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        business_type: document.querySelector('input[name="tipo"]:checked').value,
        terms_accepted: document.getElementById('aceitou_lgpd').checked
    };

    try {
        const response = await fetch('/api/lead', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Sucesso - mostrar modal
            showSuccessModal();
            form.reset();
            
            // Remover classes de validação
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.classList.remove('success', 'error');
            });
        } else {
            const error = await response.json();
            throw new Error(error.detail || 'Erro no servidor');
        }
    } catch (error) {
        // Mostrar erro de forma elegante
        showErrorMessage('Erro ao enviar cadastro: ' + error.message);
    } finally {
        setButtonLoading(false);
    }
});

// Mostrar mensagem de erro
function showErrorMessage(message) {
    // Criar toast de erro
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    // Estilos do toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#ff4757',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    // Animação de entrada
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// ===== FUNÇÕES DOS MODAIS LEGAIS =====

// Abrir modal de termos de uso
function openTermsModal() {
    document.getElementById('termsModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Fechar modal de termos de uso
function closeTermsModal() {
    document.getElementById('termsModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Abrir modal de privacidade
function openPrivacyModal() {
    document.getElementById('privacyModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Fechar modal de privacidade
function closePrivacyModal() {
    document.getElementById('privacyModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Suavizar scroll para âncoras nos modais
function setupModalAnchors() {
    document.querySelectorAll('.legal-toc a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const modalBody = targetElement.closest('.modal-body');
                modalBody.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
                
                // Destacar a seção momentaneamente
                targetElement.style.backgroundColor = 'var(--amarelo-soft)';
                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                }, 2000);
            }
        });
    });
}

// Inicializar todas as funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    setupButtonAnimation();
    setupRealTimeValidation();
    setupModalAnchors();
    
    // Fechar modal clicando fora
    document.getElementById('successModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Fechar modais legais clicando fora
    document.querySelectorAll('.legal-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                if (this.id === 'termsModal') {
                    closeTermsModal();
                } else if (this.id === 'privacyModal') {
                    closePrivacyModal();
                }
            }
        });
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeTermsModal();
            closePrivacyModal();
        }
    });
});