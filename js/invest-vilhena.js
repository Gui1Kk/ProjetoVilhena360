document.addEventListener('DOMContentLoaded', () => {
    // --- Início do Código Comum para Menus e Navegação ---
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
        } else {
            profileDropdownMenu.innerHTML = `<a href="#" id="dropdownLoginAction" class="profile-dropdown-item">Entrar</a><a href="#" id="dropdownRegisterAction" class="profile-dropdown-item">Registrar-se</a>`;
        }
        if (mobileNavAuthContainer) mobileNavAuthContainer.insertAdjacentHTML('beforeend', mobileAuthHTML);
    }
    updateProfileDropdown();
    if (profileIconBtn) { profileIconBtn.addEventListener('click', (e) => { e.stopPropagation(); if (profileDropdownMenu) profileDropdownMenu.classList.toggle('active'); }); }
    document.addEventListener('click', (e) => { if (profileDropdownMenu && !profileDropdownMenu.contains(e.target) && profileIconBtn && !profileIconBtn.contains(e.target)) { profileDropdownMenu.classList.remove('active'); } });

    function highlightActiveNavLink() {
        const pagesToActivate = ["desenvolve-vilhena", "invest-vilhena"];
        allNavLinks.forEach(link => {
            if (pagesToActivate.includes(link.dataset.pageName)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    highlightActiveNavLink();
    // --- Fim do Código Comum ---


    // --- LÓGICA ESPECÍFICA DA PÁGINA INVEST VILHENA ---
    function renderCharts() {
        if (typeof Chart === 'undefined') {
            console.error("Erro: A biblioteca Chart.js não foi carregada.");
            return;
        }

        const pibCanvas = document.getElementById('pibChart');
        const idhCanvas = document.getElementById('idhChart');

        if (!pibCanvas || !idhCanvas) {
            console.error("Erro: Elemento <canvas> para os gráficos não encontrado.");
            return;
        }

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1F2937',
                    titleColor: '#FFFFFF',
                    bodyColor: '#D1D5DB',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 10
                }
            },
            scales: {
                y: {
                    ticks: { color: '#9CA3AF' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                x: {
                    ticks: { color: '#9CA3AF' },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                }
            }
        };

        new Chart(pibCanvas, {
            type: 'line',
            data: {
                labels: ['2017', '2018', '2019', '2020', '2021'],
                datasets: [{
                    label: 'PIB (em R$ bilhões)',
                    data: [2.8, 3.1, 3.2, 3.5, 3.8],
                    fill: true,
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: '#3B82F6',
                    tension: 0.3,
                    pointBackgroundColor: '#FFFFFF',
                    pointBorderColor: '#3B82F6'
                }]
            },
            options: chartOptions
        });

        new Chart(idhCanvas, {
            type: 'bar',
            data: {
                labels: ['1991', '2000', '2010'],
                datasets: [{
                    label: 'IDH Municipal',
                    data: [0.444, 0.601, 0.731],
                    backgroundColor: ['rgba(239, 68, 68, 0.7)', 'rgba(250, 204, 21, 0.7)', 'rgba(74, 222, 128, 0.7)'],
                    borderColor: ['#DC2626', '#F59E0B', '#22C55E'],
                    borderWidth: 1
                }]
            },
            options: chartOptions
        });
    }

    renderCharts();
});