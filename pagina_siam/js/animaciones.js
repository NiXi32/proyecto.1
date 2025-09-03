
document.addEventListener('DOMContentLoaded', function() {
    // ===== ANIMACIÓN DEL CARRUSEL 3D =====
    const carruselContainer = document.querySelector('.carrusel-container');
    const items = document.querySelectorAll('.carrusel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    
    if (carruselContainer && items.length > 0) {
        let currentIndex = 2; // Índice inicial (elemento central)
        let autoRotateInterval;
        
        // Función para actualizar el carrusel
        function updateCarrusel() {
            items.forEach((item, index) => {
                // Calcular la posición basada en la diferencia con el índice actual
                const diff = index - currentIndex;
                
                // Aplicar transformaciones según la posición
                if (diff === 0) {
                    // Elemento central - enfocado
                    item.style.transform = 'translateX(0) scale(1)';
                    item.style.opacity = '1';
                    item.style.zIndex = '5';
                    item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                } else if (Math.abs(diff) === 1) {
                    // Elementos adyacentes - semi-visibles
                    item.style.transform = `translateX(${diff * 250}px) scale(0.9)`;
                    item.style.opacity = '0.7';
                    item.style.zIndex = '4';
                    item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                } else if (Math.abs(diff) === 2) {
                    // Elementos más lejanos - casi ocultos
                    item.style.transform = `translateX(${diff * 500}px) scale(0.8)`;
                    item.style.opacity = '0.5';
                    item.style.zIndex = '3';
                    item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                } else {
                    // Elementos fuera de vista - ocultos
                    item.style.opacity = '0';
                    item.style.zIndex = '2';
                    item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }
            });
            
            // Actualizar indicadores
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Navegación del carrusel
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarrusel();
                resetAutoRotation();
            });
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateCarrusel();
                resetAutoRotation();
            });
        }
        
        // Navegación por indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentIndex = index;
                updateCarrusel();
                resetAutoRotation();
            });
        });
        
        // Función para reiniciar la auto-rotación
        function resetAutoRotation() {
            clearInterval(autoRotateInterval);
            startAutoRotation();
        }
        
        // Iniciar auto-rotación
        function startAutoRotation() {
            autoRotateInterval = setInterval(function() {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarrusel();
            }, 5000);
        }
        
        // Inicializar carrusel
        updateCarrusel();
        startAutoRotation();
        
        // Pausar auto-rotación al pasar el ratón
        if (carruselContainer) {
            carruselContainer.addEventListener('mouseenter', function() {
                clearInterval(autoRotateInterval);
            });
            
            // Reanudar auto-rotación al quitar el ratón
            carruselContainer.addEventListener('mouseleave', function() {
                startAutoRotation();
            });
        }
    }
    
    // ===== ANIMACIÓN DE LAS PESTAÑAS DE BENEFICIOS =====
    // Transición suave entre pestañas con efecto fade
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        // Configurar transiciones CSS para suavidad
        tabContents.forEach(content => {
            content.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        });
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remover clase active de todos los botones
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.transition = 'all 0.3s ease';
                });
                
                // Agregar clase active al botón clickeado con efecto
                this.classList.add('active');
                
                // Animación suave para ocultar todos los contenidos
                tabContents.forEach(content => {
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(20px)';
                    content.classList.remove('active');
                    
                    // Ocultar completamente después de la animación
                    setTimeout(() => {
                        content.style.display = 'none';
                    }, 500);
                });
                
                // Mostrar el contenido correspondiente con animación suave
                const correspondingContent = document.getElementById(tabId);
                if (correspondingContent) {
                    setTimeout(() => {
                        correspondingContent.style.display = 'block';
                        
                        // Pequeño delay para permitir el renderizado antes de la animación
                        setTimeout(() => {
                            correspondingContent.style.opacity = '1';
                            correspondingContent.style.transform = 'translateY(0)';
                            correspondingContent.classList.add('active');
                        }, 50);
                    }, 500);
                }
            });
        });
    }
    
    // ===== ANIMACIÓN DE LAS TARJETAS DE SOLUCIÓN =====
    // Efecto hover con elevación y sombra en tarjetas
    const solutionCards = document.querySelectorAll('.solution-card');
    
    solutionCards.forEach(card => {
        card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // ===== ANIMACIÓN DE LAS ESTADÍSTICAS =====
    // Contador numérico incremental en la sección hero
    const statItems = document.querySelectorAll('.stat-item');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const heroSection = document.querySelector('.hero');
        if (heroSection && isInViewport(heroSection)) {
            statItems.forEach((item, index) => {
                const numberElement = item.querySelector('.stat-number');
                if (numberElement && !numberElement.classList.contains('animated')) {
                    const targetNumber = parseInt(numberElement.textContent.replace('+', '').replace('%', ''));
                    let currentNumber = 0;
                    const duration = 2000; // 2 segundos
                    const increment = targetNumber / (duration / 16); // 60fps
                    
                    const updateNumber = () => {
                        currentNumber += increment;
                        if (currentNumber >= targetNumber) {
                            currentNumber = targetNumber;
                            // Restaurar el símbolo si lo tenía
                            let finalText = Math.floor(currentNumber).toLocaleString();
                            if (numberElement.textContent.includes('+')) finalText += '+';
                            if (numberElement.textContent.includes('%')) finalText += '%';
                            
                            numberElement.textContent = finalText;
                            numberElement.classList.add('animated');
                        } else {
                            numberElement.textContent = Math.floor(currentNumber).toLocaleString();
                            requestAnimationFrame(updateNumber);
                        }
                    };
                    
                    setTimeout(() => {
                        requestAnimationFrame(updateNumber);
                    }, index * 400); // Delay escalonado
                }
            });
            
            statsAnimated = true;
        }
    }

    
    
    // Verificar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Observar la sección hero para animar las estadísticas
    const heroSection = document.querySelector('.hero');
    if (heroSection && statItems.length > 0) {
        window.addEventListener('scroll', animateStats);
        window.addEventListener('load', animateStats);
    }
    
    // ===== ANIMACIÓN DEL CHATBOT =====
    // Mostrar/ocultar ventana de chat con el botón flotante
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    
    if (chatbotIcon && chatbotWindow) {
        chatbotIcon.style.transition = 'transform 0.3s ease';
        chatbotWindow.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        chatbotIcon.addEventListener('click', function() {
            chatbotWindow.classList.toggle('visible');
            
            if (chatbotWindow.classList.contains('visible')) {
                chatbotWindow.style.opacity = '0';
                chatbotWindow.style.transform = 'translateY(20px) scale(0.95)';
                
                // Animación de aparición
                setTimeout(() => {
                    chatbotWindow.style.opacity = '1';
                    chatbotWindow.style.transform = 'translateY(0) scale(1)';
                }, 10);
                
                // Enfocar el input cuando se abre el chat
                setTimeout(() => {
                    const userInput = document.getElementById('user-input');
                    if (userInput) userInput.focus();
                }, 300);
            }
        });
        
        // Cerrar el chat al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (chatbotWindow.classList.contains('visible') && 
                !chatbotIcon.contains(e.target) && 
                !chatbotWindow.contains(e.target)) {
                
                // Animación de desaparición
                chatbotWindow.style.opacity = '0';
                chatbotWindow.style.transform = 'translateY(20px) scale(0.95)';
                
                setTimeout(() => {
                    chatbotWindow.classList.remove('visible');
                }, 300);
            }
        });
    }
    
    // ===== ANIMACIÓN DE ICONOS =====
    // Efecto de escala y rotación en iconos al hacer hover
    const animatedIcons = document.querySelectorAll('.solution-icon, .contact-icon');
    
    animatedIcons.forEach(icon => {
        icon.style.transition = 'all 0.3s ease';
        
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0)';
        });
    });
    
    // ===== ANIMACIÓN DE CARGA INICIAL =====
    // Transición suave al cargar completamente la página
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            document.body.classList.add('loaded');
        }, 100);
    });
});