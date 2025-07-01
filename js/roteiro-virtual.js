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
            if (profileIconBtn) profileIconBtn.innerHTML = `<img src="https://placehold.co/40x40/7c0ada/FFFFFF?text=VH" alt="Foto de Perfil" onerror="this.onerror=null;this.src='https://placehold.co/40x40/cccccc/ffffff?text=P';">`;
            mobileAuthHTML = `<hr class="border-t border-white/20 my-2 auth-dynamic-link"><a href="#" id="mobileProfileAction" class="nav-link auth-dynamic-link">Meu Perfil</a><a href="#" id="mobileSettingsAction" class="nav-link auth-dynamic-link">Configurações</a><a href="#" id="mobileLogoutAction" class="nav-link auth-dynamic-link">Sair</a>`;
            document.getElementById('logoutAction')?.addEventListener('click', (e) => { e.preventDefault(); isLoggedIn = false; updateProfileDropdown(); profileDropdownMenu.classList.remove('active'); });
        } else {
            profileDropdownMenu.innerHTML = `<a href="#" id="dropdownLoginAction" class="profile-dropdown-item">Entrar</a><a href="#" id="dropdownRegisterAction" class="profile-dropdown-item">Registrar-se</a>`;
            if (profileIconBtn) profileIconBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5a.75.75 0 0 1 .75.75v.256a4.5 4.5 0 0 1 3.384 4.47l.006.024c.03.16.05.322.058.488l.002.044a5.074 5.074 0 0 1 .002.106q.001.044.002.087a4.732 4.732 0 0 1-.007.137l-.002.032a4.502 4.502 0 0 1-1.36 2.627A4.5 4.5 0 0 1 12 12.5a4.5 4.5 0 0 1-3.075-1.016A4.501 4.501 0 0 1 7.57 8.857l-.002-.032a4.733 4.733 0 0 1-.006-.137q.001-.043.002-.087c0-.035.001-.07.002-.106l.002-.044a4.504 4.504 0 0 1 .058-.488l.006-.024a4.5 4.5 0 0 1 3.384-4.47V3.25a.75.75 0 0 1 .75-.75Zm0 1.5A3 3 0 0 0 9.232 7.004l-.005.024a3.004 3.004 0 0 0-.038.326l-.002.03c0 .024 0 .047-.001.07a2.98 2.98 0 0 0 .004.091l.002.022a3 3 0 0 0 .908 1.752A3 3 0 0 0 12 11a3 3 0 0 0 2.008-.701 3.002 3.002 0 0 0 .907-1.752l.002-.022c.002-.023.003-.046.004-.07a2.98 2.98 0 0 0-.001-.09l-.002-.03a3.004 3.004 0 0 0-.038-.327l-.005-.023A3 3 0 0 0 12 4Zm0 9a7.487 7.487 0 0 0-5.349 2.289A7.5 7.5 0 0 0 1.5 20.75a.75.75 0 0 0 .75.75h19.5a.75.75 0 0 0 .75-.75 7.5 7.5 0 0 0-5.151-5.461A7.487 7.487 0 0 0 12 13Z"></path></svg>`;
            mobileAuthHTML = `<hr id="mobileNavAuthHr" class="border-t border-white/20 my-2 auth-dynamic-link"><a href="#" id="mobileLoginAction" class="nav-link auth-dynamic-link">Entrar</a><a href="#" id="mobileRegisterAction" class="nav-link auth-dynamic-link">Registrar-se</a>`;
        }
        if (mobileNavAuthContainer) mobileNavAuthContainer.insertAdjacentHTML('beforeend', mobileAuthHTML);
    }
    updateProfileDropdown();
    if (profileIconBtn) { profileIconBtn.addEventListener('click', (e) => { e.stopPropagation(); if (profileDropdownMenu) profileDropdownMenu.classList.toggle('active'); }); }
    document.addEventListener('click', (e) => { if (profileDropdownMenu && !profileDropdownMenu.contains(e.target) && profileIconBtn && !profileIconBtn.contains(e.target)) { profileDropdownMenu.classList.remove('active'); } });

    function highlightActiveNavLink() {
        const pagesToActivate = ["explore-vilhena", "roteiro-virtual"];
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


    // --- LÓGICA ESPECÍFICA DA PÁGINA DE ROTEIRO VIRTUAL ---
    let map;
    let markers = [];
    let currentPolyline = null;
    let infoWindow;

    // Dados mocados para os roteiros
    const roteiros = {
        "Caminhos da História": [
            { lat: -12.7410, lng: -60.1458, title: "Praça Nossa Senhora Aparecida", desc: "Coração da cidade e palco de eventos históricos." },
            { lat: -12.7385, lng: -60.1495, title: "Antiga Prefeitura", desc: "Edifício que sediou a administração municipal por décadas." },
            { lat: -12.7440, lng: -60.1520, title: "Casa de Rondon", desc: "Posto telegráfico histórico construído pela comissão de Rondon." }
        ],
        "Verde Urbano": [
            { lat: -12.7290, lng: -60.1350, title: "Parque Ecológico Municipal", desc: "Principal área de lazer e conservação da fauna e flora local." },
            { lat: -12.7350, lng: -60.1380, title: "Praça dos Três Poderes", desc: "Centro cívico que abriga a Prefeitura, Câmara e Fórum." }
        ],
        "Sabores de Vilhena": [
            { lat: -12.7425, lng: -60.1470, title: "Restaurante Sabor do Norte", desc: "Especializado em peixes e culinária regional." },
            { lat: -12.7400, lng: -60.1480, title: "Sorveteria Flocos", desc: "Sabores exóticos de frutas da Amazônia." },
            { lat: -12.7390, lng: -60.1500, title: "Feira do Produtor", desc: "Produtos frescos e comidas típicas aos finais de semana." }
        ]
    };

    // Função global chamada pelo script do Google Maps
    window.initMap = function() {
        const vilhena = { lat: -12.7409, lng: -60.1458 };
        map = new google.maps.Map(document.getElementById("map-container"), {
            center: vilhena,
            zoom: 14,
            mapId: 'VILHENA_360_MAP_STYLE' // ID opcional para estilo customizado no Cloud Console
        });
        
        infoWindow = new google.maps.InfoWindow();

        const roteiroItems = document.querySelectorAll('.roteiro-item');
        roteiroItems.forEach(item => {
            item.addEventListener('click', () => {
                roteiroItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                const roteiroName = item.querySelector('h4').textContent;
                displayRoute(roteiroName);
            });
        });

        // Exibe o primeiro roteiro por padrão
        if (roteiroItems.length > 0) {
            roteiroItems[0].click();
        }
    }

    function clearMap() {
        markers.forEach(marker => marker.setMap(null));
        markers = [];
        if (currentPolyline) {
            currentPolyline.setMap(null);
            currentPolyline = null;
        }
    }

    function displayRoute(roteiroName) {
        clearMap();
        const routeData = roteiros[roteiroName];
        if (!routeData) return;

        const bounds = new google.maps.LatLngBounds();
        const routePath = [];

        routeData.forEach((ponto, index) => {
            const marker = new google.maps.Marker({
                position: { lat: ponto.lat, lng: ponto.lng },
                map: map,
                title: ponto.title,
                animation: google.maps.Animation.DROP,
                label: `${index + 1}` // Numera os pontos no mapa
            });
            
            marker.addListener('click', () => {
                infoWindow.setContent(`<strong>${ponto.title}</strong><p>${ponto.desc}</p>`);
                infoWindow.open(map, marker);
            });

            markers.push(marker);
            bounds.extend(marker.getPosition());
            routePath.push(marker.getPosition());
        });

        currentPolyline = new google.maps.Polyline({
            path: routePath,
            geodesic: true,
            strokeColor: '#7c0ada',
            strokeOpacity: 0.8,
            strokeWeight: 5,
        });
        currentPolyline.setMap(map);

        // Ajusta o zoom do mapa para mostrar todo o roteiro
        if(routeData.length > 1) {
            map.fitBounds(bounds);
        } else if (routeData.length === 1) {
            map.setCenter(bounds.getCenter());
            map.setZoom(16);
        }
    }
});