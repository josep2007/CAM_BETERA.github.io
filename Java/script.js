// Animaciones al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Cambiar icono del menú
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .band-card, .event-card, .timeline-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'var(--shadow)';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial navigation functionality
    const navDots = document.querySelectorAll('.nav-dot');
    const testimonialCard = document.querySelector('.testimonial-card');
    
    if (navDots.length > 0 && testimonialCard) {
        // Array de testimonios (en una implementación real, esto vendría de una API o base de datos)
        const testimonials = [
            {
                text: "Llevo más de 10 años formándome en CAM Betera y ha sido una experiencia transformadora. De alumna principiante he pasado a formar parte de la Banda Sinfónica. Los profesores son excepcionales y la comunidad musical que se crea es increíble.",
                author: "Ana Martínez",
                role: "Alumna de clarinete - Banda Sinfónica",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
            },
            {
                text: "Como padre, estoy encantado con la formación que recibe mi hija. No solo aprende música, sino valores como la disciplina, el trabajo en equipo y la perseverancia. El ambiente es familiar y los profesores están muy comprometidos.",
                author: "Carlos Rodríguez",
                role: "Padre de alumna",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            {
                text: "Después de probar varias escuelas de música, encontré en CAM Betera el lugar perfecto. La metodología es excelente y el enfoque personalizado me ha permitido progresar mucho más rápido de lo que esperaba.",
                author: "Laura Sánchez",
                role: "Alumna de piano - 3er año",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg"
            }
        ];

        let currentTestimonial = 0;

        // Función para actualizar el testimonial
        function updateTestimonial(index) {
            const testimonial = testimonials[index];
            testimonialCard.querySelector('.testimonial-text').textContent = testimonial.text;
            testimonialCard.querySelector('.author-info h4').textContent = testimonial.author;
            testimonialCard.querySelector('.author-info p').textContent = testimonial.role;
            testimonialCard.querySelector('.author-avatar').src = testimonial.avatar;
            
            // Actualizar dots activos
            navDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        // Añadir event listeners a los dots
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentTestimonial = index;
                updateTestimonial(currentTestimonial);
            });
        });

        // Cambio automático cada 5 segundos
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial(currentTestimonial);
        }, 5000);
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Aquí iría la lógica para enviar el email a un servidor
                alert('¡Gracias por suscribirte! Te hemos añadido a nuestra lista de newsletter.');
                emailInput.value = '';
            } else {
                alert('Por favor, introduce un email válido.');
            }
        });
    }

    // Matrícula button click
    const matriculaBtn = document.querySelector('.header-actions .btn-primary');
    if (matriculaBtn) {
        matriculaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to contact section
            document.querySelector('#contacto').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Intersection Observer para animaciones más eficientes
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.service-card, .band-card, .event-card, .timeline-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}