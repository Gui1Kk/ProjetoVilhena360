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
        // Ativar múltiplos links no menu
        const pagesToActivate = ["desenvolve-vilhena", "guia-comercial"];
        allNavLinks.forEach(link => {
            if (pagesToActivate.includes(link.dataset.pageName)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    highlightActiveNavLink();

    // --- Lógica Específica da Página Guia Comercial ---
    let map;
    let service;
    let markers = [];
    const searchInput = document.getElementById('search-business');
    const categoryFilter = document.getElementById('filter-category');
    const businessGridContainer = document.getElementById('business-grid-container');

    // Dados mocados dos estabelecimentos
    const mockBusinesses = [
        { id: 1, name: "Restaurante Sabor do Norte", category: "restaurantes", lat: -12.7410, lng: -60.1458, placeId: "ChIJ7_y5pZU4gZMR9eAh2SZEJbY", image: "https://placehold.co/400x250/A52A2A/FFFFFF?text=Restaurante+Sabor+do+Norte", description: "O melhor da culinária regional, com peixes frescos e pratos típicos da Amazônia."},
        { id: 2, name: "Vilhena Jeans", category: "lojas", lat: -12.7380, lng: -60.1490, placeId: "ChIJQ_y5pZU4gZMR9eAh2SZEJbY", image: "https://placehold.co/400x250/4682B4/FFFFFF?text=Vilhena+Jeans", description: "Moda masculina e feminina com as melhores marcas de jeans do mercado."},
        { id: 3, name: "Clínica Vitalidade", category: "saude", lat: -12.7450, lng: -60.1510, placeId: "ChIJN_y5pZU4gZMR9eAh2SZEJbY", image: "https://placehold.co/400x250/2E8B57/FFFFFF?text=Clínica+Vitalidade", description: "Clínica médica com diversas especialidades para cuidar da sua saúde e bem-estar."},
        { id: 4, name: "Pizzaria Forno a Lenha", category: "restaurantes", lat: -12.7395, lng: -60.1420, placeId: "ChIJJ_y5pZU4gZMR9eAh2SZEJbY", image: "https://placehold.co/400x250/FF4500/FFFFFF?text=Pizzaria+Forno+a+Lenha", description: "Pizzas artesanais com massa de longa fermentação, assadas em forno a lenha."},
        { id: 5, name: "Auto Mecânica do Zé", category: "servicos", lat: -12.7510, lng: -60.1380, placeId: "ChIJO_y5pZU4gZMR9eAh2SZEJbY", image: "https://placehold.co/400x250/696969/FFFFFF?text=Auto+Mecânica", description: "Serviços de mecânica geral, alinhamento e balanceamento para veículos nacionais e importados."},
        { id: 6, name: "Parque Ecológico Municipal", category: "lazer", lat: -12.7290, lng: -60.1350, placeId: "ChIJW_y5pZU4gZMR9eAh2SZEJbY", image: "https://placehold.co/400x250/3CB371/FFFFFF?text=Parque+Ecológico", description: "Ampla área verde para caminhadas, piqueniques e contato com a natureza."}
    ];

    window.initMap = function() {
        const vilhena = { lat: -12.7409, lng: -60.1458 };
        map = new google.maps.Map(document.getElementById("map-container"), {
            center: vilhena,
            zoom: 14,
            mapId: 'GUIA_VILHENA_MAP_ID' // Opcional: para customização avançada
        });
        service = new google.maps.places.PlacesService(map);
        filterAndRender();
    }

    function renderBusinesses(businesses) {
        businessGridContainer.innerHTML = '';
        clearMarkers();

        if (businesses.length === 0) {
            businessGridContainer.innerHTML = '<p class="text-center text-gray-500 md:col-span-2 lg:col-span-3">Nenhum estabelecimento encontrado com os filtros selecionados.</p>';
            return;
        }

        businesses.forEach(business => {
            // Adiciona marcador no mapa
            const marker = new google.maps.Marker({
                position: { lat: business.lat, lng: business.lng },
                map: map,
                title: business.name,
                animation: google.maps.Animation.DROP
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `<strong>${business.name}</strong><br>${business.category}`
            });
            
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });

            markers.push(marker);

            // Cria o card no grid
            const card = document.createElement('div');
            card.className = 'business-card card';
            card.innerHTML = `
                <img src="${business.image}" alt="${business.name}" class="w-full h-48 object-cover mb-4 rounded-md">
                <h4 class="text-xl font-bold text-[var(--primary-blue)]">${business.name}</h4>
                <p class="text-sm text-gray-500 mb-2 font-semibold capitalize">${business.category}</p>
                <p class="text-base text-[var(--text-medium)] mb-3 flex-grow">${business.description}</p>
                <div class="google-reviews mb-4 flex items-center text-sm text-gray-500">
                    <span class="review-stars"></span>
                    <span class="review-text ml-2">Buscando avaliações...</span>
                </div>
                <div class="space-y-2 mt-auto">
                    <button class="btn btn-secondary w-full text-sm">Ver no Mapa</button>
                    <button class="btn btn-primary w-full text-sm">Ver Promoções</button>
                </div>
            `;
            businessGridContainer.appendChild(card);
            
            // Adiciona evento ao botão "Ver no Mapa"
            card.querySelector('.btn-secondary').addEventListener('click', () => {
                map.setCenter({ lat: business.lat, lng: business.lng });
                map.setZoom(17);
                infoWindow.open(map, marker);
                window.scrollTo({ top: document.getElementById('map-container').offsetTop, behavior: 'smooth' });
            });

            // Busca detalhes do Google Places
            getPlaceDetails(business.placeId, card);
        });
    }

    function getPlaceDetails(placeId, cardElement) {
        const request = {
            placeId: placeId,
            fields: ['name', 'rating', 'user_ratings_total', 'reviews']
        };

        service.getDetails(request, (place, status) => {
            const starsContainer = cardElement.querySelector('.review-stars');
            const textContainer = cardElement.querySelector('.review-text');

            if (status === google.maps.places.PlacesServiceStatus.OK && place && place.rating) {
                const rating = place.rating;
                const totalRatings = place.user_ratings_total;
                let starsHTML = '';
                for (let i = 1; i <= 5; i++) {
                    if (i <= rating) {
                        starsHTML += '★'; // Estrela cheia
                    } else if (i - 0.5 <= rating) {
                        starsHTML += '★'; // Meia estrela (pode ser customizado)
                    } else {
                        starsHTML += '☆'; // Estrela vazia
                    }
                }
                starsContainer.innerHTML = starsHTML;
                starsContainer.classList.add('text-yellow-400');
                textContainer.textContent = `(${rating.toFixed(1)} de ${totalRatings} avaliações)`;
            } else {
                textContainer.textContent = '(Sem avaliações no Google)';
            }
        });
    }

    function filterAndRender() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filteredBusinesses = mockBusinesses.filter(business => {
            const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory;
            const matchesSearch = business.name.toLowerCase().includes(searchTerm) || business.description.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });

        renderBusinesses(filteredBusinesses);
    }
    
    function clearMarkers() {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    }
    
    // Adiciona os event listeners
    if (searchInput) searchInput.addEventListener('keyup', filterAndRender);
    if (categoryFilter) categoryFilter.addEventListener('change', filterAndRender);
});