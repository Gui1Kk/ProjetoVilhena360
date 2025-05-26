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
        const currentPageName = "trabalhador-empresas";
        allNavLinks.forEach(link => {
            if (link.dataset.pageName === currentPageName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    highlightActiveNavLink();

    // --- Lógica Específica da Página Trabalhador e Empresas ---
    const toggleFormBtns = document.querySelectorAll('.toggle-form-btn');
    const publicationForms = document.querySelectorAll('.publication-form');

    toggleFormBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetFormId = btn.dataset.form;
            
            // Esconde todos os formulários e remove a classe ativa dos botões
            publicationForms.forEach(form => form.classList.remove('active'));
            toggleFormBtns.forEach(b => b.classList.remove('active-tab'));

            // Mostra o formulário alvo e ativa o botão
            const targetForm = document.getElementById(targetFormId);
            if (targetForm) targetForm.classList.add('active');
            btn.classList.add('active-tab');
        });
    });

    // Simulação de carregamento de vagas, serviços, etc.
    // Em um aplicativo real, isso viria de um backend/API.
    const vagasContainer = document.getElementById('vagas-disponiveis-container');
    if (vagasContainer && vagasContainer.children.length === 0) { // Adiciona mockups se estiver vazio
        // Adiciona vagas de exemplo (você pode expandir isso)
        const vaga1 = { title: "Desenvolvedor Web Pleno", company: "Empresa X Tecnologia", desc: "Procuramos desenvolvedor com experiência em React, Node.js e Tailwind CSS...", location: "Vilhena - RO (Híbrido)", salary: "A combinar" };
        const vaga2 = { title: "Auxiliar Administrativo", company: "Comércio Varejista Vilhena", desc: "Vaga para auxiliar administrativo com foco em atendimento ao cliente e rotinas de escritório...", location: "Vilhena - RO (Presencial)", salary: "R$ 1.800,00" };
        [vaga1, vaga2].forEach(vaga => {
            const vagaEl = document.createElement('div');
            vagaEl.className = 'job-listing-card';
            vagaEl.innerHTML = `<h4>${vaga.title}</h4>
                               <p class="text-sm text-[var(--text-medium)] mb-1 font-semibold">${vaga.company}</p>
                               <p class="text-base-custom text-[var(--text-medium)] mb-3">${vaga.desc}</p>
                               <p class="text-sm text-[var(--text-medium)] mb-1"><strong>Local:</strong> ${vaga.location}</p>
                               <p class="text-sm text-[var(--text-medium)] mb-4"><strong>Salário:</strong> ${vaga.salary}</p>
                               <button class="btn btn-primary w-full text-sm">Candidatar-se</button>`;
            vagasContainer.appendChild(vagaEl);
        });
    }
    // Similar para serviços, currículos, eventos...
});
