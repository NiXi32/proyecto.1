// ===== MAIN.JS - ANIMACIONES DE SCROLL Y BOTONES =====

document.addEventListener('DOMContentLoaded', function() {
    // ===== ANIMACIONES AL SCROLL =====
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Función para manejar las animaciones al scroll
    function handleScrollAnimations() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                const animationType = element.getAttribute('data-animate');
                
                // Aplicar la clase de animación según el tipo
                element.classList.add('animated');
                
                // Aplicar delay si existe
                const delay = element.getAttribute('data-delay');
                if (delay) {
                    element.style.animationDelay = delay + 's';
                }
            }
        });
    }
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('load', handleScrollAnimations);
    window.addEventListener('scroll', handleScrollAnimations);
    
    // ===== NAVEGACIÓN SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Solo aplicar a enlaces internos que no sean # solo
            if (this.getAttribute('href') === '#' || this.getAttribute('href') === '#!') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header-area') ? document.querySelector('.header-area').offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== MENÚ MÓVIL =====
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (navList.classList.contains('active') && 
                !menuToggle.contains(e.target) && 
                !navList.contains(e.target)) {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }
    
    // ===== BOTONES DE SOLICITUD =====
    const demoButtons = document.querySelectorAll('.btn-primary, .solution-link');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Solo prevenir default si es un enlace
            if (this.tagName === 'A') {
                e.preventDefault();
            }
            
            // Animación de clic
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // Desplazamiento al formulario de contacto
            const contactSection = document.getElementById('contacto');
            if (contactSection) {
                const headerHeight = document.querySelector('.header-area') ? document.querySelector('.header-area').offsetHeight : 0;
                const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== HEADER SCROLL =====
    const headerArea = document.querySelector('.header-area');
    
    if (headerArea) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                headerArea.classList.add('scrolled');
                
                // Ocultar/mostrar header al hacer scroll (solo en móvil)
                if (window.innerWidth < 992) {
                    if (window.scrollY > lastScrollY && window.scrollY > 200) {
                        headerArea.classList.add('scroll-down');
                        headerArea.classList.remove('scroll-up');
                    } else {
                        headerArea.classList.add('scroll-up');
                        headerArea.classList.remove('scroll-down');
                    }
                }
            } else {
                headerArea.classList.remove('scrolled', 'scroll-up', 'scroll-down');
            }
            
            lastScrollY = window.scrollY;
        });
    }
    
    // ===== BOTÓN DE REINICIO DE ANIMACIONES (solo para desarrollo) =====
    // Este código solo se ejecutará en entornos locales
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reiniciar Animaciones';
        resetButton.style.position = 'fixed';
        resetButton.style.bottom = '20px';
        resetButton.style.left = '20px';
        resetButton.style.zIndex = '1000';
        resetButton.style.padding = '10px 15px';
        resetButton.style.background = '#005f73';
        resetButton.style.color = 'white';
        resetButton.style.border = 'none';
        resetButton.style.borderRadius = '5px';
        resetButton.style.cursor = 'pointer';
        resetButton.style.opacity = '0.3';
        resetButton.style.transition = 'opacity 0.3s';
        resetButton.style.fontSize = '12px';
        
        resetButton.addEventListener('mouseenter', () => {
            resetButton.style.opacity = '1';
        });
        
        resetButton.addEventListener('mouseleave', () => {
            resetButton.style.opacity = '0.3';
        });
        
        resetButton.addEventListener('click', () => {
            animatedElements.forEach(element => {
                element.classList.remove('animated');
                element.style.animationDelay = '';
            });
            
            // Pequeño delay antes de volver a verificar
            setTimeout(handleScrollAnimations, 100);
        });
        
        document.body.appendChild(resetButton);
    }
});


// Funcionalidad para las pestañas de beneficios
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Remover clase active de todos los botones y paneles
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Agregar clase active al botón y panel seleccionado
      button.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
});