/* ============================================================
   LÓGICA INTEGRAL: NAVEGACIÓN, HOVER WEB Y VIDEO RESTART
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    // 1. VARIABLES GLOBALES Y UTILIDADES
    const header = document.getElementById('main-header');
    const hero = document.getElementById('hero-section');
    const isMobile = () => window.innerWidth <= 900;

    /* ============================================================
       2. GESTIÓN DE MENÚ (Hover Web / Click Móvil)
       ============================================================ */
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        // Eventos para WEB (Hover)
        item.addEventListener('mouseenter', () => {
            if (!isMobile()) {
                header.classList.add('menu-active');
                if (hero) hero.classList.add('push-down');
            }
        });

        item.addEventListener('mouseleave', () => {
            if (!isMobile()) {
                header.classList.remove('menu-active');
                if (hero) hero.classList.remove('push-down');
            }
        });

        // Eventos para MÓVIL (Click para abrir submenús)
        item.addEventListener('click', function(e) {
            if (isMobile()) {
                const submenu = this.querySelector('.submenu');
                if (submenu && e.target.tagName !== 'A') {
                    e.stopPropagation();
                    // Cerramos los otros submenús abiertos
                    document.querySelectorAll('.submenu').forEach(s => {
                        if (s !== submenu) s.classList.remove('open');
                    });
                    // Abrimos el actual
                    submenu.classList.toggle('open');
                }
            }
        });
    });

    /* ============================================================
       3. SOME WORK: HOVER PREVIEW (RECUPERADO PARA WEB)
       ============================================================ */
    const workItems = document.querySelectorAll('.work-item');
    const preview = document.querySelector('.hover-preview');
    const imgFinal = document.querySelector('.preview-final');
    const imgProcess = document.querySelector('.preview-process');

    if (preview && workItems.length > 0) {
        workItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (!isMobile()) {
                    const fSrc = item.getAttribute('data-img');
                    const pSrc = item.getAttribute('data-process');

                    if (imgFinal) imgFinal.src = fSrc;
                    if (imgProcess) imgProcess.src = pSrc;

                    preview.style.display = 'block';
                    setTimeout(() => preview.classList.add('active'), 10);

                    clearInterval(item.revealInterval);
                    item.revealInterval = setInterval(() => {
                        preview.classList.toggle('reveal');
                    }, 1500);
                }
            });

            item.addEventListener('mousemove', (e) => {
                if (!isMobile()) {
                    preview.style.top = (e.clientY - 150) + 'px';
                    preview.style.left = (e.clientX - 250) + 'px';
                }
            });

            item.addEventListener('mouseleave', () => {
                if (!isMobile()) {
                    preview.classList.remove('active', 'reveal');
                    clearInterval(item.revealInterval);
                    setTimeout(() => {
                        if (!preview.classList.contains('active')) {
                            preview.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    }

    /* ============================================================
       4. VIDEO RESTART: BACK TO TOP (CORREGIDO)
       ============================================================ */
    // Buscamos por ID o por Clase para que no falle
    const backToTopBtn = document.getElementById('btn-back-top') || document.querySelector('.back-to-top');
    const introVideo = document.getElementById('intro-gif');

    if (backToTopBtn && introVideo) {
        backToTopBtn.addEventListener('click', (e) => {
            // Reiniciamos el video inmediatamente
            introVideo.currentTime = 0;
            introVideo.play();

            // Scroll suave hacia arriba
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    // Buscamos tu botón y tu vídeo por el ID que les pusimos
    const btnBack = document.getElementById('back-to-top-btn');
    const videoTop = document.getElementById('intro-video');

    if (btnBack && videoTop) {
        btnBack.addEventListener('click', (e) => {
            // 1. Reiniciamos el video al segundo cero
            videoTop.currentTime = 0;

            // 2. Lo reproducimos (por si se había quedado pausado al final)
            videoTop.play();

            // El scroll ya lo hace tu botón por defecto, así que no tocamos nada más.
        });
    }
    /* ============================================================
       5. OTROS EFECTOS (Software Logos & Intersection Observer)
       ============================================================ */
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('click', () => {
            if (isMobile()) item.classList.toggle('active-mobile-skill');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.home, .projects').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "all 0.8s ease-out";
        observer.observe(section);
    });
});