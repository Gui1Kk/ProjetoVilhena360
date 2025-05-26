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
    const profileIconBtn = document.getElementById('profileIconBtn');
    const profileDropdownMenu = document.getElementById('profileDropdownMenu');
    const allNavLinks = document.querySelectorAll('.nav-link'); // Para destacar link ativo

    // --- Estado Simulado de Login ---
    let isLoggedIn = false; // Mude para true para simular usuário logado
    // let currentUserId = 1; // Simulação de ID do usuário logado (para futuras funcionalidades 'isOwn')

    // --- Rodapé: Ano Atual ---
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --- Funções de Menu ---
    function openMobileMenu() {
        if (mobileNavMenu) mobileNavMenu.classList.remove('translate-x-full');
        if (mobileNavMenu) mobileNavMenu.classList.add('translate-x-0');
        if (overlay) overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (mobileNavMenu) mobileNavMenu.classList.add('translate-x-full');
        if (mobileNavMenu) mobileNavMenu.classList.remove('translate-x-0');
        if (overlay) overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    function openDesktopSideNav() {
        if (desktopSideNavMenu) desktopSideNavMenu.classList.add('open');
        if (desktopOverlay) desktopOverlay.classList.remove('hidden');
        // document.body.style.overflow = 'hidden'; // Pode ser opcional para desktop
    }

    function closeDesktopSideNav() {
        if (desktopSideNavMenu) desktopSideNavMenu.classList.remove('open');
        if (desktopOverlay) desktopOverlay.classList.add('hidden');
        // document.body.style.overflow = '';
    }

    if (hamburgerButton) hamburgerButton.addEventListener('click', openMobileMenu);
    if (overlay) overlay.addEventListener('click', closeMobileMenu);
    if (desktopHamburgerButton) desktopHamburgerButton.addEventListener('click', openDesktopSideNav);
    if (desktopNavCloseButton) desktopNavCloseButton.addEventListener('click', closeDesktopSideNav);
    if (desktopOverlay) desktopOverlay.addEventListener('click', closeDesktopSideNav);

    // --- Dropdown de Perfil ---
    function updateProfileDropdown() {
        if (!profileDropdownMenu || !mobileNavMenu) return;
        const mobileNavAuthContainer = mobileNavMenu.querySelector('.pt-24'); // Container principal dos links
        if (!mobileNavAuthContainer) return;

        // Remove links de autenticação dinâmicos anteriores para evitar duplicatas
        mobileNavAuthContainer.querySelectorAll('.auth-dynamic-link').forEach(el => el.remove());

        let mobileAuthHTML = '';

        if (isLoggedIn) {
            profileDropdownMenu.innerHTML = `
                <a href="#" class="profile-dropdown-item">Meu Perfil</a>
                <a href="#" class="profile-dropdown-item">Configurações</a>
                <hr>
                <a href="#" id="logoutAction" class="profile-dropdown-item">Sair</a>
            `;
            if (profileIconBtn) profileIconBtn.innerHTML = `<img src="https://placehold.co/40x40/7c0ada/FFFFFF?text=VH" alt="Foto de Perfil" onerror="this.onerror=null;this.src='https://placehold.co/40x40/cccccc/ffffff?text=P';">`;

            mobileAuthHTML = `
                <hr class="border-t border-white/20 my-2 auth-dynamic-link">
                <a href="#" id="mobileProfileAction" class="nav-link auth-dynamic-link">Meu Perfil</a>
                <a href="#" id="mobileSettingsAction" class="nav-link auth-dynamic-link">Configurações</a>
                <a href="#" id="mobileLogoutAction" class="nav-link auth-dynamic-link">Sair</a>
            `;

            document.getElementById('logoutAction')?.addEventListener('click', (e) => {
                e.preventDefault(); isLoggedIn = false; updateProfileDropdown(); profileDropdownMenu.classList.remove('active');
            });
        } else {
            profileDropdownMenu.innerHTML = `
                <a href="#" id="dropdownLoginAction" class="profile-dropdown-item">Entrar</a>
                <a href="#" id="dropdownRegisterAction" class="profile-dropdown-item">Registrar-se</a>
            `;
            if (profileIconBtn) profileIconBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5a.75.75 0 0 1 .75.75v.256a4.5 4.5 0 0 1 3.384 4.47l.006.024c.03.16.05.322.058.488l.002.044a5.074 5.074 0 0 1 .002.106q.001.044.002.087a4.732 4.732 0 0 1-.007.137l-.002.032a4.502 4.502 0 0 1-1.36 2.627A4.5 4.5 0 0 1 12 12.5a4.5 4.5 0 0 1-3.075-1.016A4.501 4.501 0 0 1 7.57 8.857l-.002-.032a4.733 4.733 0 0 1-.006-.137q.001-.043.002-.087c0-.035.001-.07.002-.106l.002-.044a4.504 4.504 0 0 1 .058-.488l.006-.024a4.5 4.5 0 0 1 3.384-4.47V3.25a.75.75 0 0 1 .75-.75Zm0 1.5A3 3 0 0 0 9.232 7.004l-.005.024a3.004 3.004 0 0 0-.038.326l-.002.03c0 .024 0 .047-.001.07a2.98 2.98 0 0 0 .004.091l.002.022a3 3 0 0 0 .908 1.752A3 3 0 0 0 12 11a3 3 0 0 0 2.008-.701 3.002 3.002 0 0 0 .907-1.752l.002-.022c.002-.023.003-.046.004-.07a2.98 2.98 0 0 0-.001-.09l-.002-.03a3.004 3.004 0 0 0-.038-.327l-.005-.023A3 3 0 0 0 12 4Zm0 9a7.487 7.487 0 0 0-5.349 2.289A7.5 7.5 0 0 0 1.5 20.75a.75.75 0 0 0 .75.75h19.5a.75.75 0 0 0 .75-.75 7.5 7.5 0 0 0-5.151-5.461A7.487 7.487 0 0 0 12 13Z"></path></svg>`;

            mobileAuthHTML = `
                <hr id="mobileNavAuthHr" class="border-t border-white/20 my-2 auth-dynamic-link">
                <a href="#" id="mobileLoginAction" class="nav-link auth-dynamic-link">Entrar</a>
                <a href="#" id="mobileRegisterAction" class="nav-link auth-dynamic-link">Registrar-se</a>
            `;
            document.getElementById('dropdownLoginAction')?.addEventListener('click', (e) => {e.preventDefault(); console.log('Simulação: Abrir modal de Login'); profileDropdownMenu.classList.remove('active'); });
            document.getElementById('dropdownRegisterAction')?.addEventListener('click', (e) => {e.preventDefault(); console.log('Simulação: Abrir modal de Registro'); profileDropdownMenu.classList.remove('active'); });
        }
        mobileNavAuthContainer.insertAdjacentHTML('beforeend', mobileAuthHTML);

        mobileNavAuthContainer.querySelector('#mobileLoginAction')?.addEventListener('click', () => { console.log('Simulação: Abrir modal de Login'); closeMobileMenu(); });
        mobileNavAuthContainer.querySelector('#mobileRegisterAction')?.addEventListener('click', () => { console.log('Simulação: Abrir modal de Registro'); closeMobileMenu(); });
        mobileNavAuthContainer.querySelector('#mobileLogoutAction')?.addEventListener('click', (e) => {
             e.preventDefault(); isLoggedIn = false; updateProfileDropdown(); closeMobileMenu();
        });
    }
    updateProfileDropdown();

    if (profileIconBtn) {
        profileIconBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique feche imediatamente o dropdown
            if (profileDropdownMenu) profileDropdownMenu.classList.toggle('active');
        });
    }
    document.addEventListener('click', (e) => { // Fecha dropdown se clicar fora
        if (profileDropdownMenu && !profileDropdownMenu.contains(e.target) && profileIconBtn && !profileIconBtn.contains(e.target)) {
            profileDropdownMenu.classList.remove('active');
        }
    });


    // --- Destaque do Link de Navegação Ativo ---
    function highlightActiveNavLink() {
        const currentPage = "inicio"; // Para index.html, a página é "inicio"
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
    const observerOptions = { root: null, rootMargin: '0px 0px -15% 0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const targetElement = entry.target;
            if (entry.isIntersecting) {
                targetElement.classList.add('is-visible');
                targetElement.classList.remove('is-leaving');
                targetElement.style.transform = 'translateY(0px)';
            } else {
                if (targetElement.classList.contains('is-visible')) {
                    targetElement.classList.add('is-leaving');
                    // Determina a direção da saída para um efeito mais suave
                    if (entry.boundingClientRect.top < 0) { // Saindo para cima
                        targetElement.style.transform = 'translateY(-70px)';
                    } else { // Saindo para baixo
                        targetElement.style.transform = 'translateY(70px)';
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
        const transitionDuration = 800; // ms, deve corresponder à transição CSS

        function createIndicators() {
            if (!indicatorsContainer || carouselSlides.length === 0) return;
            indicatorsContainer.innerHTML = '';
            carouselSlides.forEach((_, index) => {
                const button = document.createElement('button');
                button.setAttribute('aria-label', `Ir para o slide ${index + 1}`);
                button.addEventListener('click', () => {
                    if (!isTransitioning) {
                        goToSlide(index);
                        resetInterval();
                    }
                });
                indicatorsContainer.appendChild(button);
            });
        }

        function updateIndicators() {
            if (!indicatorsContainer) return;
            const indicators = indicatorsContainer.querySelectorAll('button');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(newIndex) {
            if (carouselSlides.length === 0 || isTransitioning || newIndex === currentSlide) return;
            isTransitioning = true;

            const oldSlideElement = carouselSlides[currentSlide];
            const newSlideElement = carouselSlides[newIndex];

            // Determina a direção da animação
            let directionClassOld = newIndex > currentSlide || (currentSlide === carouselSlides.length - 1 && newIndex === 0) ? 'translateX(-100%)' : 'translateX(100%)';
            let directionClassNewStart = newIndex > currentSlide || (currentSlide === carouselSlides.length - 1 && newIndex === 0) ? 'translateX(100%)' : 'translateX(-100%)';

            // Prepara o novo slide
            newSlideElement.style.transform = directionClassNewStart;
            newSlideElement.style.opacity = '0';
            newSlideElement.style.filter = 'blur(8px)';
            newSlideElement.classList.add('active'); // Adiciona 'active' para visibilidade e z-index
            newSlideElement.style.zIndex = '10'; // Garante que o novo slide esteja na frente durante a transição

            // Força o reflow para garantir que a transição ocorra
            void newSlideElement.offsetWidth;

            // Anima o novo slide para a posição
            newSlideElement.style.transform = 'translateX(0)';
            newSlideElement.style.opacity = '1';
            newSlideElement.style.filter = 'blur(0px)';

            // Anima o slide antigo para fora
            oldSlideElement.style.transform = directionClassOld;
            oldSlideElement.style.opacity = '0';
            oldSlideElement.style.filter = 'blur(8px)';
            oldSlideElement.style.zIndex = '9'; // Slide antigo atrás do novo

            currentSlide = newIndex;
            updateIndicators();

            // Limpa após a transição
            setTimeout(() => {
                oldSlideElement.classList.remove('active');
                // Reseta transform e opacity para o estado inicial "escondido"
                oldSlideElement.style.transform = 'translateX(100%)'; // Ou a direção padrão de saída
                oldSlideElement.style.opacity = '0';
                oldSlideElement.style.filter = 'blur(8px)';
                oldSlideElement.style.zIndex = ''; // Reseta z-index
                newSlideElement.style.zIndex = ''; // Reseta z-index do slide atual
                isTransitioning = false;
            }, transitionDuration);
        }

        function nextSlide() { goToSlide((currentSlide + 1) % carouselSlides.length); }
        function prevSlide() { goToSlide((currentSlide - 1 + carouselSlides.length) % carouselSlides.length); }
        function autoAdvance() {
             if (document.hidden) return; // Não avança se a aba não estiver visível
             nextSlide();
        }
        function startInterval() {
            if (carouselSlides.length > 1) {
                clearInterval(slideInterval);
                slideInterval = setInterval(autoAdvance, 7000);
            }
        }
        function resetInterval() {
            if (carouselSlides.length > 1) {
                clearInterval(slideInterval);
                startInterval();
            }
        }

        if (carouselSlides.length > 0) {
            // Inicializa o primeiro slide
            carouselSlides.forEach((slide, index) => {
                if (index === 0) {
                    slide.classList.add('active');
                    slide.style.opacity = '1';
                    slide.style.transform = 'translateX(0)';
                    slide.style.filter = 'blur(0px)';
                } else {
                    slide.classList.remove('active');
                    slide.style.opacity = '0';
                    slide.style.transform = 'translateX(100%)'; // Posição inicial para slides não ativos
                    slide.style.filter = 'blur(8px)';
                }
            });
            currentSlide = 0;

            createIndicators();
            updateIndicators();

            if (clickPrevArea) clickPrevArea.addEventListener('click', () => { prevSlide(); resetInterval(); });
            if (clickNextArea) clickNextArea.addEventListener('click', () => { nextSlide(); resetInterval(); });

            startInterval();
            carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
            carousel.addEventListener('mouseleave', startInterval);
            document.addEventListener('visibilitychange', () => { document.hidden ? clearInterval(slideInterval) : startInterval(); });
        }
    }

    // --- Funções de Modal (Genéricas) ---
    function openModal(modalElement) {
        if (modalElement) modalElement.classList.add('active');
    }
    function closeModal(modalElement) {
        if (modalElement) modalElement.classList.remove('active');
    }
    document.querySelectorAll('.modal-close-btn').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modalId; // Usar o data attribute do botão
            if (modalId) {
                const modalToClose = document.getElementById(modalId);
                closeModal(modalToClose);
            } else { // Fallback para fechar o modal pai se data-modal-id não estiver no botão
                closeModal(button.closest('.modal'));
            }
        });
    });
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) { // Fecha se clicar no fundo do modal
                closeModal(modal);
            }
        });
    });

    // --- API Gemini e Efeito de Digitação ---
    async function callGeminiAPI(promptText) {
        const apiKey = "AIzaSyCITlF1o7HA3QCwYt-ugag4pt4gXEAuBzE"; // Deixe vazio para o Canvas injetar a chave
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const payload = { contents: [{ parts: [{ text: promptText }] }] };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erro da API Gemini:", errorData);
                throw new Error(`Erro da API: ${errorData.error?.message || response.statusText}`);
            }
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                return result.candidates[0].content.parts[0].text;
            } else {
                console.error("Resposta inesperada da API Gemini:", result);
                throw new Error("Resposta inesperada ou vazia da API Gemini.");
            }
        } catch (error) {
            console.error("Erro ao chamar a API Gemini:", error);
            throw error;
        }
    }

    function typeWriterEffect(element, text, speed = 30) {
        if (!element) return;
        element.innerHTML = "";
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // --- Lógica Específica para Modais da index.html ---
    // Modal de Insights da Proposta (Avante Vilhena) - se o botão estiver na home
    const avanteVilhenaInsightsBtnHome = document.querySelector('.home-module-section .btn[href="pages/conecta-cidadao.html"]'); // Exemplo, ajuste se necessário
    const avanteVilhenaInsightsModal = document.getElementById('avanteVilhenaInsightsModal');
    const submitAvanteVilhenaInsightsBtn = document.getElementById('submitAvanteVilhenaInsights');
    const avanteVilhenaInsightsResult = document.getElementById('avanteVilhenaInsightsResult');
    const avanteVilhenaInsightsOutput = document.getElementById('avanteVilhenaInsightsOutput');
    const avanteVilhenaSpinner = avanteVilhenaInsightsResult?.querySelector('.loading-spinner');
    const publishToForumBtn = document.getElementById('publishToForumBtn');
    const newPostModal = document.getElementById('newPostModal'); // Para o botão "Publicar no Fórum"

    // Se o botão "Participe Agora" (que leva a Conecta Cidadão) também abrir o modal de insights
    // (ou se houver um botão específico na home para isso)
    // Este é um exemplo, você pode ter um botão dedicado na home para o modal de insights
    // if (avanteVilhenaInsightsBtnHome) {
    //     avanteVilhenaInsightsBtnHome.addEventListener('click', (e) => {
    //         // Prevenir navegação se o objetivo é só abrir o modal
    //         // e.preventDefault();
    //         // openModal(avanteVilhenaInsightsModal);
    //         // if (publishToForumBtn) publishToForumBtn.classList.add('hidden');
    //     });
    // }

    if (submitAvanteVilhenaInsightsBtn && avanteVilhenaInsightsModal) {
        submitAvanteVilhenaInsightsBtn.addEventListener('click', async () => {
            const textEl = avanteVilhenaInsightsModal.querySelector('#avanteVilhenaProposalText');
            const text = textEl ? textEl.value : '';

            if (!text.trim()) {
                if (avanteVilhenaInsightsOutput) avanteVilhenaInsightsOutput.textContent = "Por favor, insira o texto da proposta.";
                if (avanteVilhenaInsightsResult) avanteVilhenaInsightsResult.classList.remove('hidden');
                if (publishToForumBtn) publishToForumBtn.classList.add('hidden');
                return;
            }
            if (avanteVilhenaSpinner) avanteVilhenaSpinner.classList.remove('hidden');
            if (avanteVilhenaInsightsResult) avanteVilhenaInsightsResult.classList.remove('hidden');
            if (avanteVilhenaInsightsOutput) avanteVilhenaInsightsOutput.textContent = '';
            if (publishToForumBtn) publishToForumBtn.classList.add('hidden');

            try {
                const resultText = await callGeminiAPI("Gere um resumo conciso, identifique 3 potenciais impactos positivos, 3 potenciais impactos negativos e 2 pontos para discussão sobre a seguinte proposta: " + text);
                typeWriterEffect(avanteVilhenaInsightsOutput, resultText);
                if (publishToForumBtn) publishToForumBtn.classList.remove('hidden');
            } catch (error) {
                if (avanteVilhenaInsightsOutput) avanteVilhenaInsightsOutput.textContent = "Erro ao gerar insights: " + error.message;
            } finally {
                if (avanteVilhenaSpinner) avanteVilhenaSpinner.classList.add('hidden');
            }
        });
    }

    if (publishToForumBtn && newPostModal) {
        publishToForumBtn.addEventListener('click', () => {
            const proposalTextEl = avanteVilhenaInsightsModal?.querySelector('#avanteVilhenaProposalText');
            const proposalText = proposalTextEl ? proposalTextEl.value : '';
            const insightsText = avanteVilhenaInsightsOutput ? avanteVilhenaInsightsOutput.textContent : '';

            if (proposalText.trim() && insightsText.trim()) {
                const newPostTitleInput = newPostModal.querySelector('#newPostTitleInput');
                const newPostContentInput = newPostModal.querySelector('#newPostContentInput');
                const newPostCategoryInput = newPostModal.querySelector('#newPostCategoryInput');

                if (newPostTitleInput) newPostTitleInput.value = `Discussão da Proposta: ${proposalText.substring(0,50)}...`;
                if (newPostContentInput) newPostContentInput.value = `**Proposta Original:**\n${proposalText}\n\n**Insights da IA:**\n${insightsText}`;
                if (newPostCategoryInput) newPostCategoryInput.value = 'Propostas Legislativas';
                
                closeModal(avanteVilhenaInsightsModal);
                openModal(newPostModal);
                // Não redireciona, pois já estamos na index. O usuário pode navegar para o fórum depois.
            } else {
                alert("Não há proposta ou insights para publicar.");
            }
        });
    }

    // Adicionar listeners para outros modais se seus botões de gatilho estiverem na index.html
    // Exemplo: Modal de Análise de Proposta Geral
    const analyzeProposalBtnIndex = document.getElementById('analyzeProposalBtnIndex'); // Supondo que haja um botão com este ID na index
    const analyzeProposalModal = document.getElementById('analyzeProposalModal');
    const submitProposalAnalysisBtn = document.getElementById('submitProposalAnalysis');
    const analysisResultDiv = document.getElementById('proposalAnalysisResult');
    const analysisOutputDiv = document.getElementById('analysisOutput');
    const analysisSpinner = analysisResultDiv?.querySelector('.loading-spinner');

    if (analyzeProposalBtnIndex) {
        analyzeProposalBtnIndex.addEventListener('click', () => openModal(analyzeProposalModal));
    }

    if (submitProposalAnalysisBtn && analyzeProposalModal) {
        submitProposalAnalysisBtn.addEventListener('click', async () => {
            const textEl = analyzeProposalModal.querySelector('#proposalText');
            const text = textEl ? textEl.value : '';
            if (!text.trim()) {
                if (analysisOutputDiv) analysisOutputDiv.textContent = "Por favor, insira o texto da proposta.";
                if (analysisResultDiv) analysisResultDiv.classList.remove('hidden');
                return;
            }
            if (analysisSpinner) analysisSpinner.classList.remove('hidden');
            if (analysisResultDiv) analysisResultDiv.classList.remove('hidden');
            if (analysisOutputDiv) analysisOutputDiv.textContent = '';

            try {
                const resultText = await callGeminiAPI("Faça um resumo e análise de potenciais impactos (positivos e negativos) da seguinte proposta legislativa: " + text);
                typeWriterEffect(analysisOutputDiv, resultText);
            } catch (error) {
                if (analysisOutputDiv) analysisOutputDiv.textContent = "Erro ao analisar a proposta: " + error.message;
            } finally {
                if (analysisSpinner) analysisSpinner.classList.add('hidden');
            }
        });
    }

});
