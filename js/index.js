// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos Comuns ---
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const overlay = document.getElementById('overlay');
    const desktopHamburgerButton = document.getElementById('desktop-hamburger-button');
    const desktopSideNavMenu = document.getElementById('desktop-side-nav-menu');
    const desktopNavCloseButton = document.getElementById('desktop-nav-close-btn');
    const desktopOverlay = document.getElementById('desktop-overlay');
    
    // --- Novos Elementos do Header ---
    const notificationsIconBtn = document.getElementById('notificationsIconBtn');
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    const notificationsList = document.getElementById('notificationsList');
    const markAllNotificationsAsReadBtn = document.getElementById('markAllNotificationsAsRead');
    const notificationBadge = document.getElementById('notification-badge');

    const chatIconBtn = document.getElementById('chatIconBtn');
    const chatSidebar = document.getElementById('chatSidebar');
    const closeChatSidebarBtn = document.getElementById('closeChatSidebarBtn');
    const chatTabs = document.querySelectorAll('.chat-tab-btn');
    const chatTabContents = document.querySelectorAll('.chat-tab-content');
    const conversationsListEl = document.getElementById('conversationsList');
    const contactsListEl = document.getElementById('contactsList');
    const activeChatArea = document.getElementById('activeChatArea');
    const chatMessagesContainer = document.getElementById('chatMessagesContainer');
    const chatMessageInput = document.getElementById('chatMessageInput');
    const sendChatMessageBtn = document.getElementById('sendChatMessageBtn');
    const activeChatUserNameEl = document.getElementById('activeChatUserName');
    const activeChatUserImageEl = document.getElementById('activeChatUserImage');
    const backToConversationsBtn = document.getElementById('backToConversationsBtn');
    const chatTypingIndicator = document.getElementById('chatTypingIndicator');

    const profileIconBtn = document.getElementById('profileIconBtn');
    const profileDropdownMenu = document.getElementById('profileDropdownMenu');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // --- Modais de Login/Registro ---
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchToRegisterBtn = document.getElementById('switchToRegister');
    const switchToLoginBtn = document.getElementById('switchToLogin');
    const loginWithGoogleBtn = document.getElementById('loginWithGoogleBtn');
    const registerWithGoogleBtn = document.getElementById('registerWithGoogleBtn');


    // --- Estado Simulado ---
    let isLoggedIn = false; 
    let currentUserId = null; // Será definido no login simulado
    let currentUserProfileImage = 'https://placehold.co/40x40/cccccc/ffffff?text=P'; // Placeholder padrão
    let currentUserName = 'Visitante';

    const mockNotifications = [
        { id: 1, text: "Nova publicação no Fórum: 'Melhorias para o trânsito'.", type: "forum", link: "pages/forum-vilhenense.html", read: false, time: "2 min atrás" },
        { id: 2, text: "Boletim VHA: Alerta de baixa umidade do ar emitido.", type: "boletim", link: "pages/boletins-vha.html", read: false, time: "1 hora atrás" },
        { id: 3, text: "Seu serviço 'Encanador Profissional' recebeu uma nova avaliação.", type: "servico", link: "#", read: true, time: "3 horas atrás" },
        { id: 4, text: "Nova vaga publicada: 'Desenvolvedor Web Pleno'.", type: "vaga", link: "pages/trabalhador-empresas.html", read: false, time: "ontem" },
    ];
    let activeChatUserId = null;
    const mockUsers = {
        1: { name: "Ana Silva", avatar: "https://placehold.co/40x40/A78BFA/FFFFFF?text=AS", online: true },
        2: { name: "Carlos B.", avatar: "https://placehold.co/40x40/FBBF24/FFFFFF?text=CB", online: false },
        3: { name: "Prefeitura Atende", avatar: "https://i.postimg.cc/cvzKSKhF/logo.png", online: true, isBot: true, type: "empresa" }, // Exemplo de "empresa"
    };
    let mockConversations = {
        1: [ { sender: 1, receiver: 2, text: "Olá, tudo bem?", time: "10:00" }],
        3: [ { sender: 3, receiver: 1, text: "Olá! Sou o assistente virtual da Prefeitura. Como posso ajudar com o IPTU?", time: "09:31", isBot: true } ],
    };


    // --- Rodapé: Ano Atual ---
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

    // --- Animação de Introdução ---
    const introAnimationEl = document.getElementById('intro-animation');
    const introSlogans = [
        "Conectando o futuro da cidade.",
        "Sua voz, nossa Vilhena.",
        "Inovação a serviço de todos.",
        "Cultura, cidadania e desenvolvimento."
    ];
    let currentSloganIndex = 0;
    const introSloganEl = document.getElementById('intro-slogan');

    function changeSlogan() {
        if (!introSloganEl) return;
        introSloganEl.style.opacity = 0;
        introSloganEl.style.transform = 'translateY(10px)';
        setTimeout(() => {
            currentSloganIndex = (currentSloganIndex + 1) % introSlogans.length;
            introSloganEl.textContent = introSlogans[currentSloganIndex];
            introSloganEl.style.opacity = 1;
            introSloganEl.style.transform = 'translateY(0)';
        }, 300); // Tempo para fade out
    }

    if (introAnimationEl && introSloganEl) {
        if (sessionStorage.getItem('introPlayed')) {
            introAnimationEl.classList.add('hidden-intro');
        } else {
            document.body.style.overflow = 'hidden'; // Prevenir scroll durante a intro
            introSloganEl.textContent = introSlogans[0];
            const sloganInterval = setInterval(changeSlogan, 2000);

            setTimeout(() => {
                clearInterval(sloganInterval);
                introAnimationEl.style.opacity = 0;
                setTimeout(() => {
                    introAnimationEl.classList.add('hidden-intro');
                    document.body.style.overflow = ''; // Restaurar scroll
                }, 700); // Duração da transição de opacidade
                sessionStorage.setItem('introPlayed', 'true');
            }, 4500); // Duração total da intro (ex: 4.5s)
        }
    }


    // --- Funções de Menu ---
    function openMobileMenu() { if (mobileNavMenu) mobileNavMenu.classList.remove('translate-x-full'); if (mobileNavMenu) mobileNavMenu.classList.add('translate-x-0'); if (overlay) overlay.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
    function closeMobileMenu() { if (mobileNavMenu) mobileNavMenu.classList.add('translate-x-full'); if (mobileNavMenu) mobileNavMenu.classList.remove('translate-x-0'); if (overlay) overlay.classList.add('hidden'); document.body.style.overflow = ''; }
    function openDesktopSideNav() { if (desktopSideNavMenu) desktopSideNavMenu.classList.add('open'); if (desktopOverlay) desktopOverlay.classList.remove('hidden'); }
    function closeDesktopSideNav() { if (desktopSideNavMenu) desktopSideNavMenu.classList.remove('open'); if (desktopOverlay) desktopOverlay.classList.add('hidden'); }

    if (hamburgerButton) hamburgerButton.addEventListener('click', openMobileMenu);
    if (overlay) overlay.addEventListener('click', () => { closeMobileMenu(); closeChatSidebar(); }); // Overlay fecha tudo
    if (desktopHamburgerButton) desktopHamburgerButton.addEventListener('click', openDesktopSideNav);
    if (desktopNavCloseButton) desktopNavCloseButton.addEventListener('click', closeDesktopSideNav);
    if (desktopOverlay) desktopOverlay.addEventListener('click', closeDesktopSideNav);

    // --- Dropdown de Perfil e Autenticação ---
    function updateProfileDisplay() {
        if (!profileDropdownMenu || !mobileNavMenu) return;
        const mobileNavAuthContainer = mobileNavMenu.querySelector('.pt-24');
        if (!mobileNavAuthContainer) return;

        mobileNavAuthContainer.querySelectorAll('.auth-dynamic-link').forEach(el => el.remove());
        let mobileAuthHTML = '';

        if (isLoggedIn && currentUserId) {
            profileDropdownMenu.innerHTML = `
                <div class="px-4 py-3">
                    <p class="text-sm font-semibold text-[var(--text-dark)]">${currentUserName}</p>
                    <p class="text-xs text-[var(--text-medium)] truncate">${mockUsers[currentUserId]?.email || 'email@exemplo.com'}</p>
                </div>
                <hr class="border-[var(--border-light-gray)]">
                <a href="#" class="profile-dropdown-item">Meu Perfil</a>
                <a href="#" class="profile-dropdown-item">Configurações</a>
                <hr class="border-[var(--border-light-gray)]">
                <a href="#" id="logoutAction" class="profile-dropdown-item text-[var(--red-alert)] hover:bg-red-50">Sair</a>
            `;
            if (profileIconBtn) profileIconBtn.innerHTML = `<img src="${currentUserProfileImage}" alt="Foto de Perfil" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='https://placehold.co/40x40/cccccc/ffffff?text=P';">`;

            mobileAuthHTML = `<hr class="border-t border-white/20 my-2 auth-dynamic-link"><a href="#" id="mobileProfileAction" class="nav-link auth-dynamic-link">Meu Perfil</a><a href="#" id="mobileSettingsAction" class="nav-link auth-dynamic-link">Configurações</a><a href="#" id="mobileLogoutAction" class="nav-link auth-dynamic-link text-red-300 hover:bg-red-500">Sair</a>`;
            
            document.getElementById('logoutAction')?.addEventListener('click', handleLogout);
        } else {
            profileDropdownMenu.innerHTML = `
                <a href="#" id="dropdownLoginAction" class="profile-dropdown-item">Entrar</a>
                <a href="#" id="dropdownRegisterAction" class="profile-dropdown-item">Registrar-se</a>
            `;
            if (profileIconBtn) profileIconBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5a.75.75 0 0 1 .75.75v.256a4.5 4.5 0 0 1 3.384 4.47l.006.024c.03.16.05.322.058.488l.002.044a5.074 5.074 0 0 1 .002.106q.001.044.002.087a4.732 4.732 0 0 1-.007.137l-.002.032a4.502 4.502 0 0 1-1.36 2.627A4.5 4.5 0 0 1 12 12.5a4.5 4.5 0 0 1-3.075-1.016A4.501 4.501 0 0 1 7.57 8.857l-.002-.032a4.733 4.733 0 0 1-.006-.137q.001-.043.002-.087c0-.035.001-.07.002-.106l.002-.044a4.504 4.504 0 0 1 .058-.488l.006-.024a4.5 4.5 0 0 1 3.384-4.47V3.25a.75.75 0 0 1 .75-.75Zm0 1.5A3 3 0 0 0 9.232 7.004l-.005.024a3.004 3.004 0 0 0-.038.326l-.002.03c0 .024 0 .047-.001.07a2.98 2.98 0 0 0 .004.091l.002.022a3 3 0 0 0 .908 1.752A3 3 0 0 0 12 11a3 3 0 0 0 2.008-.701 3.002 3.002 0 0 0 .907-1.752l.002-.022c.002-.023.003-.046.004-.07a2.98 2.98 0 0 0-.001-.09l-.002-.03a3.004 3.004 0 0 0-.038-.327l-.005-.023A3 3 0 0 0 12 4Zm0 9a7.487 7.487 0 0 0-5.349 2.289A7.5 7.5 0 0 0 1.5 20.75a.75.75 0 0 0 .75.75h19.5a.75.75 0 0 0 .75-.75 7.5 7.5 0 0 0-5.151-5.461A7.487 7.487 0 0 0 12 13Z"></path></svg>`;
            
            mobileAuthHTML = `<hr id="mobileNavAuthHr" class="border-t border-white/20 my-2 auth-dynamic-link"><a href="#" id="mobileLoginAction" class="nav-link auth-dynamic-link">Entrar</a><a href="#" id="mobileRegisterAction" class="nav-link auth-dynamic-link">Registrar-se</a>`;
            
            document.getElementById('dropdownLoginAction')?.addEventListener('click', (e) => { e.preventDefault(); openModal(loginModal); profileDropdownMenu.classList.remove('active'); });
            document.getElementById('dropdownRegisterAction')?.addEventListener('click', (e) => { e.preventDefault(); openModal(registerModal); profileDropdownMenu.classList.remove('active'); });
        }
        mobileNavAuthContainer.insertAdjacentHTML('beforeend', mobileAuthHTML);

        mobileNavAuthContainer.querySelector('#mobileLoginAction')?.addEventListener('click', () => { openModal(loginModal); closeMobileMenu(); });
        mobileNavAuthContainer.querySelector('#mobileRegisterAction')?.addEventListener('click', () => { openModal(registerModal); closeMobileMenu(); });
        mobileNavAuthContainer.querySelector('#mobileLogoutAction')?.addEventListener('click', handleLogout);
    }

    function handleLogout(e) {
        if (e) e.preventDefault();
        isLoggedIn = false;
        currentUserId = null;
        currentUserName = 'Visitante';
        currentUserProfileImage = 'https://placehold.co/40x40/cccccc/ffffff?text=P';
        updateProfileDisplay();
        if (profileDropdownMenu) profileDropdownMenu.classList.remove('active');
        if (mobileNavMenu) closeMobileMenu(); // Fecha o menu mobile se estiver aberto
        showCustomAlert("Você saiu da sua conta.", "info");
    }

    updateProfileDisplay(); // Chamada inicial

    if (profileIconBtn) {
        profileIconBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (profileDropdownMenu) profileDropdownMenu.classList.toggle('active');
            if (notificationsDropdown) notificationsDropdown.classList.remove('active'); // Fecha notificações se estiver aberto
        });
    }
    document.addEventListener('click', (e) => {
        if (profileDropdownMenu && !profileDropdownMenu.contains(e.target) && profileIconBtn && !profileIconBtn.contains(e.target)) {
            profileDropdownMenu.classList.remove('active');
        }
        if (notificationsDropdown && !notificationsDropdown.contains(e.target) && notificationsIconBtn && !notificationsIconBtn.contains(e.target)) {
            notificationsDropdown.classList.remove('active');
        }
    });

    // --- Lógica de Login/Registro Simulado ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulação de login
            const email = document.getElementById('loginEmail').value;
            if (email === "usuario@vilhena.com" && document.getElementById('loginPassword').value === "123") {
                isLoggedIn = true;
                currentUserId = 1; // ID do usuário Ana Silva
                currentUserName = mockUsers[currentUserId].name;
                currentUserProfileImage = mockUsers[currentUserId].avatar;
                updateProfileDisplay();
                closeModal(loginModal);
                showCustomAlert("Login realizado com sucesso!", "success");
            } else {
                showCustomAlert("Email ou senha inválidos.", "error", loginModal.querySelector('.modal-content'));
            }
        });
    }
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulação de registro
        const name = document.getElementById('registerName').value;
        const newEmail = document.getElementById('registerEmail').value;
        const pass = document.getElementById('registerPassword').value;
        const confirmPass = document.getElementById('registerConfirmPassword').value;
        const termsAccepted = document.getElementById('registerTerms').checked; // NOVO

        if (!termsAccepted) { // NOVO - Validação dos termos
            showCustomAlert("Você precisa aceitar os Termos de Uso para se registrar.", "error", registerModal.querySelector('.modal-content'));
            return;
        }

        if (pass !== confirmPass) {
            showCustomAlert("As senhas não coincidem!", "error", registerModal.querySelector('.modal-content'));
            return;
        }
        
        const newId = Object.keys(mockUsers).length + 1;
        mockUsers[newId] = { name: name, avatar: `https://placehold.co/40x40/8B5CF6/FFFFFF?text=${name.substring(0,1).toUpperCase()}`, online: true, email: newEmail };
        
        isLoggedIn = true;
        currentUserId = newId;
        currentUserName = name;
        currentUserProfileImage = mockUsers[newId].avatar;
        updateProfileDisplay();
        closeModal(registerModal);
        showCustomAlert("Conta criada e login realizado com sucesso!", "success");
    });
}

    if (switchToRegisterBtn) switchToRegisterBtn.addEventListener('click', (e) => { e.preventDefault(); closeModal(loginModal); openModal(registerModal); });
    if (switchToLoginBtn) switchToLoginBtn.addEventListener('click', (e) => { e.preventDefault(); closeModal(registerModal); openModal(loginModal); });
    if (loginWithGoogleBtn) loginWithGoogleBtn.addEventListener('click', () => showCustomAlert("Login com Google (simulado).", "info", loginModal.querySelector('.modal-content')));
    if (registerWithGoogleBtn) registerWithGoogleBtn.addEventListener('click', () => showCustomAlert("Registro com Google (simulado).", "info", registerModal.querySelector('.modal-content')));


    // --- Destaque do Link de Navegação Ativo ---
    function highlightActiveNavLink() {
        const currentPage = "inicio"; 
        allNavLinks.forEach(link => {
            if (link.getAttribute('href') === 'index.html' || link.dataset.pageName === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    highlightActiveNavLink();

    // --- Animações de Scroll ---
    const animatedElements = document.querySelectorAll('.scroll-animate');
    const observerOptions = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const targetElement = entry.target;
            if (entry.isIntersecting) {
                targetElement.classList.add('is-visible');
                targetElement.classList.remove('is-leaving');
                void targetElement.offsetWidth; 
            } else {
                if (targetElement.classList.contains('is-visible')) {
                    targetElement.classList.add('is-leaving');
                    if (entry.boundingClientRect.top < 0) {
                        targetElement.style.setProperty('--leaving-transformY', 'translateY(-70px)');
                    } else {
                        targetElement.style.setProperty('--leaving-transformY', 'translateY(70px)');
                    }
                }
                targetElement.classList.remove('is-visible');
            }
        });
    }, observerOptions);
    animatedElements.forEach(el => observer.observe(el));


    // --- Carrossel Principal (`destaques-carousel`) ---
    const carousel = document.getElementById('destaques-carousel');
    if (carousel) {
        const slideWrapper = carousel.querySelector('.carousel-slide-wrapper');
        const carouselSlides = Array.from(slideWrapper.children).filter(child => child.classList.contains('carousel-slide'));
        const clickPrevArea = carousel.querySelector('#carousel-click-prev');
        const clickNextArea = carousel.querySelector('#carousel-click-next');
        const indicatorsContainer = carousel.querySelector('#carousel-indicators-container');
        let currentSlide = 0;
        let slideInterval;
        let isTransitioning = false;
        const transitionDuration = 800;

        function createIndicators() { /* ... (código existente) ... */ }
        function updateIndicators() { /* ... (código existente) ... */ }
        function goToSlide(newIndex) { 
            if (carouselSlides.length === 0 || isTransitioning || newIndex === currentSlide) return;
            isTransitioning = true;

            const oldSlideElement = carouselSlides[currentSlide];
            const newSlideElement = carouselSlides[newIndex];
            const oldCaptionH3 = oldSlideElement.querySelector('.carousel-caption h3');
            const oldCaptionP = oldSlideElement.querySelector('.carousel-caption p');
            const newCaptionH3 = newSlideElement.querySelector('.carousel-caption h3');
            const newCaptionP = newSlideElement.querySelector('.carousel-caption p');

            [oldCaptionH3, oldCaptionP, newCaptionH3, newCaptionP].forEach(el => {
                if(el) {
                    el.style.animation = 'none';
                    void el.offsetWidth;
                }
            });
            
            let directionClassOld = newIndex > currentSlide || (currentSlide === carouselSlides.length - 1 && newIndex === 0) ? 'translateX(-100%)' : 'translateX(100%)';
            let directionClassNewStart = newIndex > currentSlide || (currentSlide === carouselSlides.length - 1 && newIndex === 0) ? 'translateX(100%)' : 'translateX(-100%)';

            newSlideElement.style.transform = directionClassNewStart;
            newSlideElement.style.opacity = '0';
            newSlideElement.style.filter = 'blur(8px)';
            newSlideElement.classList.add('active');
            newSlideElement.style.zIndex = '10'; 
            void newSlideElement.offsetWidth;
            newSlideElement.style.transform = 'translateX(0)';
            newSlideElement.style.opacity = '1';
            newSlideElement.style.filter = 'blur(0px)';

            if(newCaptionH3) newCaptionH3.style.animation = 'slide-text-up 0.6s 0.3s ease-out backwards';
            if(newCaptionP) newCaptionP.style.animation = 'slide-text-up 0.6s 0.5s ease-out backwards';

            oldSlideElement.style.transform = directionClassOld;
            oldSlideElement.style.opacity = '0';
            oldSlideElement.style.filter = 'blur(8px)';
            oldSlideElement.style.zIndex = '9';

            currentSlide = newIndex;
            updateIndicators();

            setTimeout(() => {
                oldSlideElement.classList.remove('active');
                oldSlideElement.style.transform = 'translateX(100%)'; 
                oldSlideElement.style.opacity = '0';
                oldSlideElement.style.filter = 'blur(8px)';
                oldSlideElement.style.zIndex = ''; 
                newSlideElement.style.zIndex = ''; 
                isTransitioning = false;
            }, transitionDuration);
        }

        function nextSlide() { goToSlide((currentSlide + 1) % carouselSlides.length); }
        function prevSlide() { goToSlide((currentSlide - 1 + carouselSlides.length) % carouselSlides.length); }
        function autoAdvance() { if (document.hidden) return; nextSlide(); }
        function startInterval() { if (carouselSlides.length > 1) { clearInterval(slideInterval); slideInterval = setInterval(autoAdvance, 7000); } }
        function resetInterval() { if (carouselSlides.length > 1) { clearInterval(slideInterval); startInterval(); } }

        if (carouselSlides.length > 0) {
            carouselSlides.forEach((slide, index) => {
                const captionH3 = slide.querySelector('.carousel-caption h3');
                const captionP = slide.querySelector('.carousel-caption p');
                if (index === 0) {
                    slide.classList.add('active');
                    slide.style.opacity = '1'; slide.style.transform = 'translateX(0)'; slide.style.filter = 'blur(0px)';
                    if(captionH3) captionH3.style.animation = 'slide-text-up 0.6s 0.3s ease-out backwards';
                    if(captionP) captionP.style.animation = 'slide-text-up 0.6s 0.5s ease-out backwards';
                } else {
                    slide.classList.remove('active');
                    slide.style.opacity = '0'; slide.style.transform = 'translateX(100%)'; slide.style.filter = 'blur(8px)';
                }
            });
            currentSlide = 0;
            createIndicators(); updateIndicators();
            if (clickPrevArea) clickPrevArea.addEventListener('click', () => { prevSlide(); resetInterval(); });
            if (clickNextArea) clickNextArea.addEventListener('click', () => { nextSlide(); resetInterval(); });
            startInterval();
            carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
            carousel.addEventListener('mouseleave', startInterval);
            document.addEventListener('visibilitychange', () => { document.hidden ? clearInterval(slideInterval) : startInterval(); });
        }
    }

    // --- Funções de Modal (Genéricas) ---
    function openModal(modalElement) { if (modalElement) { modalElement.classList.add('active'); document.body.style.overflow = 'hidden'; } }
    function closeModal(modalElement) { if (modalElement) { modalElement.classList.remove('active'); document.body.style.overflow = ''; } }
    
    document.querySelectorAll('.modal-close-btn').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modalId;
            if (modalId) closeModal(document.getElementById(modalId));
            else closeModal(button.closest('.modal'));
        });
    });
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(modal); });
    });

    // --- API Gemini ---
    async function callGeminiAPI(promptText) {
        const apiKey = "AIzaSyCITlF1o7HA3QCwYt-ugag4pt4gXEAuBzE";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const payload = { contents: [{ parts: [{ text: promptText }] }] };
        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) { const errorData = await response.json(); throw new Error(`Erro da API: ${errorData.error?.message || response.statusText}`); }
            const result = await response.json();
            if (result.candidates?.[0]?.content?.parts?.[0]?.text) return result.candidates[0].content.parts[0].text;
            throw new Error("Resposta inesperada ou vazia da API Gemini.");
        } catch (error) { console.error("Erro ao chamar a API Gemini:", error); throw error; }
    }
    function typeWriterEffect(element, text, speed = 30) {
        if (!element) return; element.innerHTML = ""; let i = 0;
        function type() { if (i < text.length) { element.innerHTML += text.charAt(i); i++; setTimeout(type, speed); } } type();
    }

    function typeWriterEffect(element, text, speed = 30, callback) { /* ... (código existente) ... */ }

    // --- Lógica Específica para Modais da index.html ---
    const avanteVilhenaInsightsBtnHome = document.querySelector('.home-module-section .btn[href="pages/conecta-cidadao.html"]');
    const avanteVilhenaInsightsModal = document.getElementById('avanteVilhenaInsightsModal');
    // ... (restante do código dos modais da index, se houver) ...

    // --- Lógica de Notificações ---
    function renderNotifications() {
        if (!notificationsList) return;
        notificationsList.innerHTML = '';
        const unreadCount = mockNotifications.filter(n => !n.read).length;

        if (notificationBadge) {
            if (unreadCount > 0) {
                notificationBadge.textContent = unreadCount > 9 ? '9+' : unreadCount;
                notificationBadge.classList.remove('hidden');
            } else {
                notificationBadge.classList.add('hidden');
            }
        }

        if (mockNotifications.length === 0) {
            notificationsList.innerHTML = '<p class="text-sm text-gray-500 p-4 text-center">Nenhuma notificação.</p>';
            return;
        }

        mockNotifications.slice(0, 5).forEach(notif => { 
            const item = document.createElement('div');
            item.className = `notification-item p-3 hover:bg-gray-50 ${notif.read ? '' : 'unread'}`;
            item.innerHTML = `
                <a href="${notif.link}" class="block">
                    <p class="text-sm text-[var(--text-dark)] ${!notif.read ? 'font-semibold' : ''}">${notif.text}</p>
                    <p class="text-xs text-gray-500 mt-1">${notif.time}</p>
                </a>
            `;
            item.addEventListener('click', () => {
                notif.read = true;
                renderNotifications();
            });
            notificationsList.appendChild(item);
        });
    }

    if (notificationsIconBtn) {
        notificationsIconBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (notificationsDropdown) notificationsDropdown.classList.toggle('active');
            if (profileDropdownMenu) profileDropdownMenu.classList.remove('active'); 
            renderNotifications(); 
        });
    }
    if (markAllNotificationsAsReadBtn) {
        markAllNotificationsAsReadBtn.addEventListener('click', () => {
            mockNotifications.forEach(n => n.read = true);
            renderNotifications();
            showCustomAlert("Todas as notificações marcadas como lidas.", "success");
        });
    }
    renderNotifications();

    // --- Lógica do Chat ---
    function openChatSidebar() {
        if (chatSidebar) chatSidebar.classList.remove('translate-x-full');
        if (overlay) overlay.classList.remove('hidden'); 
        document.body.style.overflow = 'hidden';
        renderConversationsList(); 
        showTab('conversas');
        activeChatArea.classList.add('hidden');
        conversationsListEl.parentElement.classList.remove('hidden');
    }
    function closeChatSidebar() {
        if (chatSidebar) chatSidebar.classList.add('translate-x-full');
        if (overlay && !mobileNavMenu.classList.contains('translate-x-0') && !desktopSideNavMenu.classList.contains('open')) { 
            overlay.classList.add('hidden');
        }
        if (!mobileNavMenu.classList.contains('translate-x-0') && !desktopSideNavMenu.classList.contains('open')) {
             document.body.style.overflow = '';
        }
        activeChatUserId = null;
    }

    if (chatIconBtn) chatIconBtn.addEventListener('click', openChatSidebar);
    if (closeChatSidebarBtn) closeChatSidebarBtn.addEventListener('click', closeChatSidebar);

    chatTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            showTab(tabName);
        });
    });

    function showTab(tabName) {
        chatTabs.forEach(t => t.classList.remove('active-chat-tab', 'text-[var(--primary-blue)]', 'border-[var(--primary-blue)]'));
        chatTabs.forEach(t => t.classList.add('text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300', 'border-transparent'));
        
        const activeTabButton = document.querySelector(`.chat-tab-btn[data-tab="${tabName}"]`);
        if (activeTabButton) {
            activeTabButton.classList.add('active-chat-tab', 'text-[var(--primary-blue)]', 'border-[var(--primary-blue)]');
            activeTabButton.classList.remove('text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300', 'border-transparent');
        }

        chatTabContents.forEach(content => content.classList.add('hidden'));
        const activeContent = document.getElementById(`chat-tab-content-${tabName}`);
        if (activeContent) activeContent.classList.remove('hidden');

        if (tabName === 'conversas') renderConversationsList();
        if (tabName === 'contatos') renderContactsList();
    }
    
    function renderConversationsList() {
        if (!conversationsListEl) return;
        conversationsListEl.innerHTML = '';
        if (Object.keys(mockConversations).length === 0) {
            conversationsListEl.innerHTML = '<p class="p-4 text-sm text-gray-500 text-center">Nenhuma conversa ainda.</p>';
            return;
        }
        Object.entries(mockConversations).sort(([,a], [,b]) => {
            const lastMsgA = a[a.length - 1];
            const lastMsgB = b[b.length - 1];
            return (lastMsgB?.time || "00:00") > (lastMsgA?.time || "00:00") ? 1 : -1;
        }).forEach(([userId, messages]) => {
            const otherUserId = parseInt(userId);
            const user = mockUsers[otherUserId];
            if (!user) return;

            const lastMessage = messages[messages.length - 1];
            const conversationItem = document.createElement('div');
            conversationItem.className = 'p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3 transition-colors duration-150 ease-in-out';
            conversationItem.innerHTML = `
                <img src="${user.avatar}" alt="${user.name}" class="w-10 h-10 rounded-full object-cover">
                <div class="flex-grow overflow-hidden">
                    <div class="flex justify-between items-center">
                        <h5 class="font-semibold text-[var(--text-dark)] truncate">${user.name}</h5>
                        <span class="text-xs text-gray-400">${lastMessage?.time || ''}</span>
                    </div>
                    <p class="text-sm text-gray-500 truncate">${lastMessage?.sender === currentUserId ? 'Você: ' : ''}${lastMessage?.text || 'Sem mensagens'}</p>
                </div>
            `;
            conversationItem.addEventListener('click', () => openChatWithUser(otherUserId));
            conversationsListEl.appendChild(conversationItem);
        });
    }

    function renderContactsList() {
        if (!contactsListEl) return;
        contactsListEl.innerHTML = '';
        Object.entries(mockUsers).filter(([id]) => parseInt(id) !== currentUserId).forEach(([id, user]) => {
            const contactItem = document.createElement('div');
            contactItem.className = 'p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3 transition-colors duration-150 ease-in-out';
            contactItem.innerHTML = `
                <img src="${user.avatar}" alt="${user.name}" class="w-10 h-10 rounded-full object-cover">
                <div class="flex-grow">
                    <h5 class="font-semibold text-[var(--text-dark)]">${user.name}</h5>
                    <p class="text-xs ${user.online ? 'text-green-500' : 'text-gray-400'}">${user.online ? 'Online' : 'Offline'}</p>
                </div>
                <button class="text-[var(--primary-blue)] hover:text-[var(--darker-blue)] text-xs" aria-label="Iniciar conversa com ${user.name}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" /></svg>
                </button>
            `;
            contactItem.addEventListener('click', () => openChatWithUser(parseInt(id)));
            contactsListEl.appendChild(contactItem);
        });
    }

    function openChatWithUser(userId) {
        activeChatUserId = userId;
        const user = mockUsers[userId];
        if (!user || !activeChatArea || !activeChatUserNameEl || !activeChatUserImageEl) return;

        activeChatUserNameEl.textContent = user.name;
        activeChatUserImageEl.src = user.avatar;
        activeChatUserImageEl.alt = user.name;
        
        document.getElementById('chat-tab-content-conversas').classList.add('hidden');
        document.getElementById('chat-tab-content-empresas').classList.add('hidden');
        document.getElementById('chat-tab-content-contatos').classList.add('hidden');
        activeChatArea.classList.remove('hidden');
        
        renderChatMessages();
        chatMessageInput.focus();
    }

    if (backToConversationsBtn) {
        backToConversationsBtn.addEventListener('click', () => {
            activeChatArea.classList.add('hidden');
            showTab('conversas');
            activeChatUserId = null;
        });
    }

    function renderChatMessages() {
        if (!chatMessagesContainer || activeChatUserId === null) return;
        chatMessagesContainer.innerHTML = '';
        const messages = mockConversations[activeChatUserId] || [];
        messages.forEach(msg => addMessageToChatUI(msg.text, msg.sender === currentUserId, msg.time, mockUsers[msg.sender]?.name));
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function addMessageToChatUI(text, isSent, time, senderName = "Assistente") {
        if (!chatMessagesContainer) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message flex flex-col ${isSent ? 'sent' : 'received'}`;
        
        let senderDisplayName = '';
        if (!isSent && senderName) {
            senderDisplayName = `<span class="text-xs font-semibold mb-1 ${isSent ? 'text-blue-100' : 'text-[var(--primary-blue)]'}">${senderName}</span>`;
        }

        messageDiv.innerHTML = `
            ${senderDisplayName}
            <div>${text.replace(/\n/g, '<br>')}</div>
            <span class="chat-message-meta self-end">${time}</span>
        `;
        chatMessagesContainer.appendChild(messageDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    async function handleSendMessage() {
        if (!chatMessageInput || !activeChatUserId) return;
        const messageText = chatMessageInput.value.trim();
        if (messageText === '') return;

        const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        addMessageToChatUI(messageText, true, currentTime, currentUserName);
        
        if (!mockConversations[activeChatUserId]) {
            mockConversations[activeChatUserId] = [];
        }
        mockConversations[activeChatUserId].push({ sender: currentUserId, receiver: activeChatUserId, text: messageText, time: currentTime });
        chatMessageInput.value = '';

        const otherUser = mockUsers[activeChatUserId];
        if (otherUser && (otherUser.isBot || !isLoggedIn)) { 
            if (chatTypingIndicator) chatTypingIndicator.classList.remove('hidden');
            
            const historyForAPI = (mockConversations[activeChatUserId] || [])
                .slice(-6) 
                .map(msg => ({
                    role: msg.sender === currentUserId ? "user" : "model",
                    parts: [{ text: msg.text }]
                }));
            
            if(historyForAPI.length > 0 && historyForAPI[historyForAPI.length -1].role === "user"){
                historyForAPI.pop();
            }

            const geminiResponse = await callGeminiAPI(messageText, historyForAPI);
            
            if (chatTypingIndicator) chatTypingIndicator.classList.add('hidden');
            const responseTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            addMessageToChatUI(geminiResponse, false, responseTime, otherUser.name);
            mockConversations[activeChatUserId].push({ sender: activeChatUserId, receiver: currentUserId, text: geminiResponse, time: responseTime, isBot: otherUser.isBot });
        }
        renderConversationsList();
    }

    if (sendChatMessageBtn) sendChatMessageBtn.addEventListener('click', handleSendMessage);
    if (chatMessageInput) chatMessageInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSendMessage(); });

    // --- Alerta Customizado ---
    function showCustomAlert(message, type = "info", parentElement = document.body) {
        const existingAlert = document.getElementById('custom-alert-message');
        if (existingAlert) existingAlert.remove();

        const alertDiv = document.createElement('div');
        alertDiv.id = 'custom-alert-message';
        alertDiv.className = `fixed top-5 right-5 p-4 rounded-md shadow-lg text-sm z-[15000] transform translate-x-full opacity-0 transition-all duration-500 ease-out`;
        
        let bgColor, textColor, icon;
        switch (type) {
            case "success":
                bgColor = "bg-green-500"; textColor = "text-white"; icon = "✓";
                break;
            case "error":
                bgColor = "bg-red-500"; textColor = "text-white"; icon = "✕";
                break;
            default: // info
                bgColor = "bg-blue-500"; textColor = "text-white"; icon = "ℹ";
        }
        alertDiv.classList.add(bgColor, textColor);
        alertDiv.innerHTML = `<span class="font-bold mr-2">${icon}</span> ${message}`;
        
        if (parentElement !== document.body && parentElement.classList.contains('modal-content')) {
            alertDiv.style.position = 'absolute';
            alertDiv.style.top = '1rem';
            alertDiv.style.right = '1rem';
            alertDiv.style.left = '1rem';
            alertDiv.style.width = 'auto';
            parentElement.insertBefore(alertDiv, parentElement.firstChild);
        } else {
             document.body.appendChild(alertDiv);
        }

        setTimeout(() => {
            alertDiv.style.transform = 'translateX(0)';
            alertDiv.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            alertDiv.style.transform = 'translateX(200%)';
            alertDiv.style.opacity = '0';
            setTimeout(() => alertDiv.remove(), 500);
        }, 4000);
    }

    // --- LÓGICA PARA A IA ATHENA ---
    const athenaAIBtn = document.getElementById('athenaAIBtn');
    const athenaAIBtnMobile = document.getElementById('athenaAIBtnMobile');
    const athenaAIOverlay = document.getElementById('athenaAIOverlay');
    const athenaAIContainer = document.getElementById('athenaAIContainer');
    const closeAthenaAIBtn = document.getElementById('closeAthenaAIBtn');
    const athenaChatBody = document.getElementById('athenaChatBody');
    const athenaChatInput = document.getElementById('athenaChatInput');
    const sendAthenaMessageBtn = document.getElementById('sendAthenaMessageBtn');

    let athenaChatHistory = [{
        role: "model",
        parts: [{ text: "Olá! Eu sou a Athena, sua assistente de inteligência artificial para a plataforma Vilhena 360º. Como posso te ajudar hoje? Você pode me perguntar sobre: como encontrar vagas de emprego, informações sobre o último projeto de lei, ou sugestões de pontos turísticos." }]
    }];

    function openAthenaOverlay() {
        if (athenaAIOverlay) {
            athenaAIOverlay.classList.remove('hidden');
            setTimeout(() => {
                if (athenaAIContainer) athenaAIContainer.classList.remove('scale-95', 'opacity-0');
            }, 10);
            if(athenaChatInput) athenaChatInput.focus();
        }
    }

    function closeAthenaOverlay() {
        if (athenaAIOverlay) {
            if (athenaAIContainer) athenaAIContainer.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                athenaAIOverlay.classList.add('hidden');
            }, 300);
        }
    }
    
    function addMessageToAthenaChat(text, type = 'athena') {
        if (!athenaChatBody) return;

        const messageWrapper = document.createElement('div');
        const bubble = document.createElement('div');
        const avatar = document.createElement('div');
        
        if(type === 'user') {
            messageWrapper.className = 'user-message';
            avatar.className = 'user-avatar';
            avatar.innerHTML = `<i class="fas fa-user"></i>`;
            bubble.className = 'user-bubble';
            bubble.textContent = text;
        } else {
            messageWrapper.className = 'athena-message';
            avatar.className = 'athena-avatar';
            avatar.innerHTML = `<i class="fas fa-robot"></i>`;
            bubble.className = 'athena-bubble';
            bubble.innerHTML = text.replace(/\n/g, '<br>'); // Permite que a IA formate com quebras de linha
        }
        
        messageWrapper.appendChild(avatar);
        messageWrapper.appendChild(bubble);
        athenaChatBody.appendChild(messageWrapper);
        athenaChatBody.scrollTop = athenaChatBody.scrollHeight;
    }

    async function handleSendAthenaMessage() {
        const userInput = athenaChatInput.value.trim();
        if (userInput === '') return;

        addMessageToAthenaChat(userInput, 'user');
        athenaChatHistory.push({ role: "user", parts: [{ text: userInput }] });
        athenaChatInput.value = '';
        athenaChatInput.disabled = true;
        sendAthenaMessageBtn.disabled = true;

        // Adiciona indicador de "digitando"
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'athena-message';
        typingIndicator.innerHTML = `
            <div class="athena-avatar"><i class="fas fa-robot"></i></div>
            <div class="athena-bubble">
                <span class="animate-pulse">...</span>
            </div>
        `;
        athenaChatBody.appendChild(typingIndicator);
        athenaChatBody.scrollTop = athenaChatBody.scrollHeight;
        
        try {
            const systemPrompt = "Você é Athena, a assistente virtual da plataforma Vilhena 360°. Seja amigável, prestativa e foque em ajudar os usuários a navegar e utilizar a plataforma. Responda em português brasileiro.";
            const fullPrompt = `${systemPrompt}\n\nHistórico da conversa anterior:\n${JSON.stringify(athenaChatHistory.slice(-4))}\n\nNova pergunta do usuário: ${userInput}`;
            
            const responseText = await callGeminiAPI(fullPrompt, athenaChatHistory);
            athenaChatHistory.push({ role: "model", parts: [{ text: responseText }] });
            
            typingIndicator.remove(); // Remove o indicador de "digitando"
            addMessageToAthenaChat(responseText, 'athena');

        } catch (error) {
            typingIndicator.remove();
            addMessageToAthenaChat("Desculpe, ocorreu um erro ao me conectar. Por favor, tente novamente mais tarde.", 'athena');
        } finally {
            athenaChatInput.disabled = false;
            sendAthenaMessageBtn.disabled = false;
            athenaChatInput.focus();
        }
    }


    if(athenaAIBtn) athenaAIBtn.addEventListener('click', openAthenaOverlay);
    if(athenaAIBtnMobile) athenaAIBtnMobile.addEventListener('click', openAthenaOverlay);
    if(closeAthenaAIBtn) closeAthenaAIBtn.addEventListener('click', closeAthenaOverlay);
    if(sendAthenaMessageBtn) sendAthenaMessageBtn.addEventListener('click', handleSendAthenaMessage);
    if(athenaChatInput) athenaChatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendAthenaMessage();
        }
    });

    // Inicializações
    renderNotifications();

    // --- LÓGICA PARA OS NOVOS CARROSSÉIS (NAVEGAÇÃO SECUNDÁRIA E EMPRESAS) ---

    // Lógica para o Carrossel de Empresas Destaque
    const carouselContainer = document.getElementById('carousel-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    
    if (carouselContainer && prevButton && nextButton) {
        const scrollAmount = 352; // Largura do card (w-80 = 320px) + espaçamento (space-x-8 = 32px)

        prevButton.addEventListener('click', () => {
            carouselContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextButton.addEventListener('click', () => {
            carouselContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // Lógica para a Barra de Navegação Secundária com scroll
    const navBar = document.getElementById('secondary-nav-bar');
    const navPrevBtn = document.getElementById('nav-prev-btn');
    const navNextBtn = document.getElementById('nav-next-btn');
    
    if (navBar && navPrevBtn && navNextBtn) {
        const navScrollAmount = 200;

        navPrevBtn.addEventListener('click', () => {
            navBar.scrollBy({ left: -navScrollAmount, behavior: 'smooth' });
        });

        navNextBtn.addEventListener('click', () => {
            navBar.scrollBy({ left: navScrollAmount, behavior: 'smooth' });
        });
    }
// --- Impede que o clique na navegação secundária afete o carrossel principal ---
    const secondaryNavContainer = document.querySelector('.secondary-nav-container');
    if (secondaryNavContainer) {
        secondaryNavContainer.addEventListener('click', (event) => {
            // Este comando impede que o evento de clique "borbulhe" para elementos pais, como o carrossel.
            event.stopPropagation();
        });
    }
});