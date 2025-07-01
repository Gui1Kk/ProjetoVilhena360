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
    const allNavLinks = document.querySelectorAll('.nav-link');

    let isLoggedIn = false;
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

    function openMobileMenu() { if (mobileNavMenu) mobileNavMenu.classList.remove('translate-x-full'); if (mobileNavMenu) mobileNavMenu.classList.add('translate-x-0'); if (overlay) overlay.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
    function closeMobileMenu() { if (mobileNavMenu) mobileNavMenu.classList.add('translate-x-full'); if (mobileNavMenu) mobileNavMenu.classList.remove('translate-x-0'); if (overlay) overlay.classList.add('hidden'); document.body.style.overflow = ''; }
    function openDesktopSideNav() { if (desktopSideNavMenu) desktopSideNavMenu.classList.add('open'); if (desktopOverlay) desktopOverlay.classList.remove('hidden'); }
    function closeDesktopSideNav() { if (desktopSideNavMenu) desktopSideNavMenu.classList.remove('open'); if (desktopOverlay) desktopOverlay.classList.add('hidden'); }

    if (hamburgerButton) hamburgerButton.addEventListener('click', openMobileMenu);
    if (overlay) overlay.addEventListener('click', closeMobileMenu);
    if (desktopHamburgerButton) desktopHamburgerButton.addEventListener('click', openDesktopSideNav);
    if (desktopNavCloseButton) desktopNavCloseButton.addEventListener('click', closeDesktopSideNav);
    if (desktopOverlay) desktopOverlay.addEventListener('click', closeDesktopSideNav);
    
    function updateProfileDropdown() {
        if (!profileDropdownMenu || !mobileNavMenu) return;
        const mobileNavAuthContainer = mobileNavMenu.querySelector('.pt-24');
        if (!mobileNavAuthContainer) return;
        mobileNavAuthContainer.querySelectorAll('.auth-dynamic-link').forEach(el => el.remove());
        let mobileAuthHTML = '';
        if (isLoggedIn) {
            profileDropdownMenu.innerHTML = `<a href="#" class="profile-dropdown-item">Meu Perfil</a><a href="#" class="profile-dropdown-item">Configurações</a><hr><a href="#" id="logoutAction" class="profile-dropdown-item">Sair</a>`;
            if (profileIconBtn) profileIconBtn.innerHTML = `<img src="https://placehold.co/40x40/7c0ada/FFFFFF?text=VH" alt="Foto de Perfil" onerror="this.onerror=null;this.src='https://placehold.co/40x40/cccccc/ffffff?text=P';">`;
            mobileAuthHTML = `<hr class="border-t border-white/20 my-2 auth-dynamic-link"><a href="#" id="mobileProfileAction" class="nav-link auth-dynamic-link">Meu Perfil</a><a href="#" id="mobileSettingsAction" class="nav-link auth-dynamic-link">Configurações</a><a href="#" id="mobileLogoutAction" class="nav-link auth-dynamic-link">Sair</a>`;
            document.getElementById('logoutAction')?.addEventListener('click', (e) => { e.preventDefault(); isLoggedIn = false; updateProfileDropdown(); profileDropdownMenu.classList.remove('active'); });
        } else {
            profileDropdownMenu.innerHTML = `<a href="#" id="dropdownLoginAction" class="profile-dropdown-item">Entrar</a><a href="#" id="dropdownRegisterAction" class="profile-dropdown-item">Registrar-se</a>`;
            if (profileIconBtn) profileIconBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5a.75.75 0 0 1 .75.75v.256a4.5 4.5 0 0 1 3.384 4.47l.006.024c.03.16.05.322.058.488l.002.044a5.074 5.074 0 0 1 .002.106q.001.044.002.087a4.732 4.732 0 0 1-.007.137l-.002.032a4.502 4.502 0 0 1-1.36 2.627A4.5 4.5 0 0 1 12 12.5a4.5 4.5 0 0 1-3.075-1.016A4.501 4.501 0 0 1 7.57 8.857l-.002-.032a4.733 4.733 0 0 1-.006-.137q.001-.043.002-.087c0-.035.001-.07.002-.106l.002-.044a4.504 4.504 0 0 1 .058-.488l.006-.024a4.5 4.5 0 0 1 3.384-4.47V3.25a.75.75 0 0 1 .75-.75Zm0 1.5A3 3 0 0 0 9.232 7.004l-.005.024a3.004 3.004 0 0 0-.038.326l-.002.03c0 .024 0 .047-.001.07a2.98 2.98 0 0 0 .004.091l.002.022a3 3 0 0 0 .908 1.752A3 3 0 0 0 12 11a3 3 0 0 0 2.008-.701 3.002 3.002 0 0 0 .907-1.752l.002-.022c.002-.023.003-.046.004-.07a2.98 2.98 0 0 0-.001-.09l-.002-.03a3.004 3.004 0 0 0-.038-.327l-.005-.023A3 3 0 0 0 12 4Zm0 9a7.487 7.487 0 0 0-5.349 2.289A7.5 7.5 0 0 0 1.5 20.75a.75.75 0 0 0 .75.75h19.5a.75.75 0 0 0 .75-.75 7.5 7.5 0 0 0-5.151-5.461A7.487 7.487 0 0 0 12 13Z"></path></svg>`;
            mobileAuthHTML = `<hr id="mobileNavAuthHr" class="border-t border-white/20 my-2 auth-dynamic-link"><a href="#" id="mobileLoginAction" class="nav-link auth-dynamic-link">Entrar</a><a href="#" id="mobileRegisterAction" class="nav-link auth-dynamic-link">Registrar-se</a>`;
            document.getElementById('dropdownLoginAction')?.addEventListener('click', (e) => {e.preventDefault(); console.log('Simulação: Abrir modal de Login'); profileDropdownMenu.classList.remove('active'); });
            document.getElementById('dropdownRegisterAction')?.addEventListener('click', (e) => {e.preventDefault(); console.log('Simulação: Abrir modal de Registro'); profileDropdownMenu.classList.remove('active'); });
        }
        mobileNavAuthContainer.insertAdjacentHTML('beforeend', mobileAuthHTML);
        mobileNavAuthContainer.querySelector('#mobileLoginAction')?.addEventListener('click', () => { console.log('Simulação: Abrir modal de Login'); closeMobileMenu(); });
        mobileNavAuthContainer.querySelector('#mobileRegisterAction')?.addEventListener('click', () => { console.log('Simulação: Abrir modal de Registro'); closeMobileMenu(); });
        mobileNavAuthContainer.querySelector('#mobileLogoutAction')?.addEventListener('click', (e) => { e.preventDefault(); isLoggedIn = false; updateProfileDropdown(); closeMobileMenu(); });
    }
    updateProfileDropdown();
    if (profileIconBtn) { profileIconBtn.addEventListener('click', (e) => { e.stopPropagation(); if (profileDropdownMenu) profileDropdownMenu.classList.toggle('active'); }); }
    document.addEventListener('click', (e) => { if (profileDropdownMenu && !profileDropdownMenu.contains(e.target) && profileIconBtn && !profileIconBtn.contains(e.target)) { profileDropdownMenu.classList.remove('active'); } });

    function highlightActiveNavLink() {
        const currentPageName = "boletins-vha";
        allNavLinks.forEach(link => {
            if (link.dataset.pageName === currentPageName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    highlightActiveNavLink();

    const animatedElements = document.querySelectorAll('.scroll-animate');
    const observerOptions = { root: null, rootMargin: '0px 0px -15% 0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
            else entry.target.classList.remove('is-visible');
        });
    }, observerOptions);
    animatedElements.forEach(el => observer.observe(el));

    function openModal(modalElement) { if (modalElement) modalElement.classList.add('active'); }
    function closeModal(modalElement) { if (modalElement) modalElement.classList.remove('active'); }
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

    // --- Lógica Específica da Página de Boletins ---
    const bulletinHorizontalContainer = document.getElementById('bulletinHorizontalScrollContainer');
    const bulletinVerticalGridContainer = document.getElementById('bulletinVerticalGridContainer');
    const bulletinTopCarouselWrapper = document.getElementById('bulletinTopCarousel')?.querySelector('.carousel-slide-wrapper');
    const bulletinTopCarouselIndicators = document.getElementById('bulletinTopCarousel')?.querySelector('#bulletinCarousel-indicators-container');
    const expandedBulletinModal = document.getElementById('expandedBulletinModal');
    const expandedBulletinContentPlaceholder = expandedBulletinModal?.querySelector('#expandedBulletinContentPlaceholder');
    const bulletinModalCommentsList = expandedBulletinModal?.querySelector('#bulletinModalCommentsList');
    const bulletinModalCommentText = expandedBulletinModal?.querySelector('#bulletinModalCommentText');
    const bulletinModalSubmitComment = expandedBulletinModal?.querySelector('#bulletinModalSubmitComment');
    let currentExpandedBulletinId = null;
    let bulletinScrollInterval = null;

    const mockBulletins = [
        { id: 1, title: "Novo Parque Ecológico Inaugurado em Vilhena", date: "20/05/2025", summary: "A prefeitura de Vilhena inaugurou hoje o novo Parque Ecológico 'AmoRondonia', um espaço verde para lazer e conservação...", category: "Cidade", image: "https://rondoniadinamica.com/uploads/ag7c9t1rcjcibaz.jpeg", fullContent: "Detalhes completos sobre a inauguração do parque, com informações sobre as novas trilhas, áreas de piquenique e o impacto ambiental positivo para a região. O evento contou com a presença de autoridades e da comunidade local. Foram plantadas mais de 100 mudas de árvores nativas. O parque também conta com um centro de visitantes e programas educativos sobre a fauna e flora local.", comments: [{user: "Carlos M.", text: "Ficou lindo o parque!"}, {user:"Laura P.", text: "Preciso conhecer urgente!"}], likes: 23 },
        { id: 2, title: "Nova frente fria vai derrubar temperaturas e amenizar o calor", date: "19/05/2025", summary: "Os Vilhenenses podem se preparar para mudanças no tempo a partir deste sábado, com a chegada de uma frente fria vinda do sul da Amazônia.", category: "Alerta", image: "https://rondoniaovivo.com/imagensNoticias/Vilhena2.jpeg", fullContent: "A Defesa Civil de Vilhena informa que a umidade relativa do ar poderá atingir níveis críticos abaixo de 30% nos próximos 3 dias. Recomendações: evite exercícios físicos ao ar livre entre 10h e 16h, umidifique ambientes e beba bastante água. Cuidado especial com crianças e idosos. Em caso de problemas respiratórios, procure a unidade de saúde mais próxima.", comments: [{user: "Mariana S.", text:"Obrigada pelo alerta!"}], likes: 12 },
        { id: 3, title: "Festival Gastronômico Local é Sucesso de Público", date: "18/05/2025", summary: "O 1º Festival Gastronômico Sabores de Vilhena atraiu milhares de visitantes no último fim de semana, superando expectativas...", category: "Cultura", image: "https://www.tribunatop.com/uploads/noticias/2019/07/vilhena-governo-incentiva-1-edicao-da-feira-de-agronegocio-rondonia-rural-sul-1562096176.jpg", fullContent: "Com mais de 30 expositores e pratos que celebram a culinária regional, o festival foi um sucesso absoluto, movimentando a economia local e oferecendo entretenimento de qualidade para todas as idades. A próxima edição já está sendo planejada para o segundo semestre, com ainda mais novidades, incluindo workshops com chefs renomados e apresentações musicais.", comments: [{user:"Fernanda S.", text:"Adorei os pratos! Que venha o próximo!"}, {user:"Ricardo A.", text:"Organização impecável."}], likes: 45 },
        { id: 4, title: "Campanha de Vacinação Contra a Gripe Estendida", date: "22/05/2025", summary: "A Secretaria Municipal de Saúde estende a campanha de vacinação contra a gripe (Influenza) por mais uma semana devido à alta procura...", category: "Saúde", image: "https://imagens.ebc.com.br/s67nf7zJiBJo0CNXRIudsNZOhew=/1600x800/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/vacina_metro3.jpg?itok=Mbk7uRSz", fullContent: "Todos os postos de saúde continuarão aplicando a vacina para os grupos prioritários, incluindo idosos, crianças, gestantes e profissionais de saúde. Leve sua carteirinha de vacinação. A meta é imunizar 90% do público-alvo. Não deixe para a última hora!", comments: [{user: "Ana B.", text:"Vou levar minha mãe amanhã!"}], likes: 33 },
        { id: 5, title: "Obras de Recapeamento na Avenida Major Amarante Concluídas", date: "21/05/2025", summary: "Informamos que as obras de recapeamento asfáltico na Avenida Major Amarante foram concluídas antes do prazo. O trânsito já está liberado...", category: "Trânsito", image: "https://noticiadotocantins.com.br/wp-content/uploads/2023/03/Captura-de-tela-inteira-18032023-143816.jpg", fullContent: "As obras no trecho entre a Rua Rony de Castro e a Rua Domingos Linhares foram finalizadas com sucesso, melhorando significativamente o fluxo de veículos na região. Agradecemos a compreensão e colaboração de todos durante o período de interdição.", comments: [{user:"Jorge T.", text:"Ficou ótimo! Parabéns pela agilidade."}], likes: 18 },
        { id: 6, title: "Inscrições Abertas para Cursos Gratuitos de Informática", date: "23/05/2025", summary: "A Fundação Cultural de Vilhena abre inscrições para cursos gratuitos de informática básica e avançada. Vagas limitadas!", category: "Educação", image: "https://th.bing.com/th/id/OIP.WuyrQDo2DQkMqh_7nnZ4oAHaD6?rs=1&pid=ImgDetMain&cb=idpwebpc1", fullContent: "Os cursos são destinados a jovens e adultos que buscam qualificação profissional. As aulas ocorrerão no período noturno. Inscrições podem ser feitas online através do portal Vilhena 360° ou presencialmente na sede da Fundação Cultural. Documentos necessários: RG, CPF e comprovante de residência.", comments: [], likes: 28 },
    ];

    function renderBulletins() {
        if (bulletinTopCarouselWrapper) bulletinTopCarouselWrapper.innerHTML = '';
        if (bulletinTopCarouselIndicators) bulletinTopCarouselIndicators.innerHTML = '';
        if (bulletinHorizontalContainer) bulletinHorizontalContainer.innerHTML = '';
        if (bulletinVerticalGridContainer) bulletinVerticalGridContainer.innerHTML = '';

        const topBulletins = mockBulletins.slice(0, Math.min(3, mockBulletins.length)); // Pega até 3 para o carrossel
        const remainingBulletins = mockBulletins.slice(topBulletins.length);
        const horizontalScrollBulletins = remainingBulletins.slice(0, Math.min(3, remainingBulletins.length)); // Pega até 3 dos restantes para horizontal
        const verticalGridBulletins = remainingBulletins.slice(horizontalScrollBulletins.length); // O resto para o grid

        topBulletins.forEach((bulletin, index) => {
            if (bulletinTopCarouselWrapper) {
                const slide = document.createElement('div');
                slide.className = `carousel-slide${index === 0 ? ' active' : ''}`;
                slide.innerHTML = `
                    <img src="${bulletin.image}" alt="${bulletin.title}" onerror="this.onerror=null;this.src='https://placehold.co/800x450/cccccc/ffffff?text=Imagem+Indisponível';">
                    <div class="carousel-caption">
                        <h3 class="font-black">${bulletin.title}</h3>
                        <p>${bulletin.summary}</p>
                        <button class="btn btn-primary btn-sm mt-3 view-bulletin-btn" data-id="${bulletin.id}">Leia Mais</button>
                    </div>
                `;
                bulletinTopCarouselWrapper.appendChild(slide);
            }
            if (bulletinTopCarouselIndicators) {
                const indicator = document.createElement('button');
                indicator.setAttribute('aria-label', `Ir para o boletim ${index + 1}`);
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => {
                    const slides = bulletinTopCarouselWrapper.querySelectorAll('.carousel-slide');
                    slides.forEach(s => s.classList.remove('active'));
                    slides[index].classList.add('active');
                    bulletinTopCarouselIndicators.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                    indicator.classList.add('active');
                });
                bulletinTopCarouselIndicators.appendChild(indicator);
            }
        });

        horizontalScrollBulletins.forEach(bulletin => {
            if (bulletinHorizontalContainer) {
                const item = document.createElement('div');
                item.className = 'bulletin-item card';
                item.innerHTML = `
                    <img src="${bulletin.image}" alt="${bulletin.title}" class="w-full h-40 object-cover mb-3 rounded" onerror="this.onerror=null;this.src='https://placehold.co/400x250/cccccc/ffffff?text=Imagem+Indisponível';">
                    <h4 class="text-lg font-semibold mb-1 text-[var(--darker-blue)]">${bulletin.title}</h4>
                    <p class="text-xs text-[var(--text-medium)] mb-2">${bulletin.date} - ${bulletin.category}</p>
                    <p class="text-sm text-[var(--text-medium)] mb-3">${bulletin.summary.substring(0,100)}...</p>
                    <button class="btn btn-secondary btn-sm w-full view-bulletin-btn" data-id="${bulletin.id}">Leia Mais</button>
                `;
                bulletinHorizontalContainer.appendChild(item);
            }
        });

        verticalGridBulletins.forEach(bulletin => {
            if (bulletinVerticalGridContainer) {
                const item = document.createElement('div');
                item.className = 'bulletin-item card';
                item.innerHTML = `
                    <img src="${bulletin.image}" alt="${bulletin.title}" class="w-full h-48 object-cover mb-4 rounded-md" onerror="this.onerror=null;this.src='https://placehold.co/400x250/cccccc/ffffff?text=Imagem+Indisponível';">
                    <h4 class="text-lg font-semibold mb-1 text-[var(--darker-blue)]">${bulletin.title}</h4>
                    <p class="text-xs text-[var(--text-medium)] mb-2">${bulletin.date} - ${bulletin.category}</p>
                    <p class="text-sm text-[var(--text-medium)] mb-3">${bulletin.summary.substring(0,120)}...</p>
                    <button class="btn btn-secondary btn-sm w-full view-bulletin-btn" data-id="${bulletin.id}">Leia Mais</button>
                `;
                bulletinVerticalGridContainer.appendChild(item);
            }
        });

        document.querySelectorAll('.view-bulletin-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                currentExpandedBulletinId = parseInt(e.target.dataset.id);
                const bulletin = mockBulletins.find(b => b.id === currentExpandedBulletinId);
                if (bulletin && expandedBulletinContentPlaceholder && expandedBulletinModal) {
                    expandedBulletinContentPlaceholder.innerHTML = `
                        <h3 class="modal-title">${bulletin.title}</h3>
                        <img src="${bulletin.image}" alt="${bulletin.title}" class="w-full max-h-96 object-contain mb-4 rounded-md" onerror="this.onerror=null;this.src='https://placehold.co/600x300/cccccc/ffffff?text=Imagem+Indisponível';">
                        <p class="text-sm text-[var(--text-medium)] mb-1"><strong>Data:</strong> ${bulletin.date}</p>
                        <p class="text-sm text-[var(--text-medium)] mb-3"><strong>Categoria:</strong> ${bulletin.category}</p>
                        <div class="text-base-custom leading-relaxed">${bulletin.fullContent.replace(/\n/g, '<br>')}</div>
                    `;
                    renderBulletinComments(bulletin.comments || []);
                    openModal(expandedBulletinModal);
                }
            });
        });
    }

    function renderBulletinComments(comments) {
        if (!bulletinModalCommentsList) return;
        bulletinModalCommentsList.innerHTML = '';
        if (comments.length === 0) {
            bulletinModalCommentsList.innerHTML = '<p class="text-sm text-gray-500">Nenhum comentário ainda.</p>';
            return;
        }
        comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.className = 'bulletin-comment';
            commentEl.innerHTML = `<strong>${comment.user}:</strong> ${comment.text}`;
            bulletinModalCommentsList.appendChild(commentEl);
        });
    }

    if (bulletinModalSubmitComment) {
        bulletinModalSubmitComment.addEventListener('click', () => {
            const commentText = bulletinModalCommentText.value.trim();
            if (commentText && currentExpandedBulletinId !== null) {
                const bulletin = mockBulletins.find(b => b.id === currentExpandedBulletinId);
                if (bulletin) {
                    if (!bulletin.comments) bulletin.comments = [];
                    bulletin.comments.push({ user: "Usuário Atual", text: commentText }); // Simulação
                    renderBulletinComments(bulletin.comments);
                    bulletinModalCommentText.value = '';
                }
            }
        });
    }

    function startBulletinScroll() {
        if (bulletinHorizontalContainer && mockBulletins.length > 3) { // Se houver itens suficientes para rolar
            clearInterval(bulletinScrollInterval);
            bulletinScrollInterval = setInterval(() => {
                if (bulletinHorizontalContainer.scrollLeft + bulletinHorizontalContainer.clientWidth >= bulletinHorizontalContainer.scrollWidth -1) {
                    bulletinHorizontalContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    bulletinHorizontalContainer.scrollBy({ left: 320, behavior: 'smooth' }); // 320 é a min-width do item
                }
            }, 5000); // Rola a cada 5 segundos
        }
    }
    function stopBulletinScroll() { clearInterval(bulletinScrollInterval); }

    renderBulletins();
    startBulletinScroll();
    // Parar o scroll se a aba ficar inativa e reiniciar quando ativa
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopBulletinScroll();
        } else {
            startBulletinScroll();
        }
    });
});
