document.addEventListener('DOMContentLoaded', () => {
    // --- Início do Código Comum Essencial ---
    const desktopHamburgerButton = document.getElementById('desktop-hamburger-button');
    const desktopSideNavMenu = document.getElementById('desktop-side-nav-menu');
    const desktopNavCloseButton = document.getElementById('desktop-nav-close-btn');
    const desktopOverlay = document.getElementById('desktop-overlay');
    // Adicione outros elementos comuns se eles existirem nesta página, como 'profileIconBtn', etc.

    function openDesktopSideNav() { 
        if (desktopSideNavMenu) desktopSideNavMenu.classList.add('open'); 
        if (desktopOverlay) desktopOverlay.classList.remove('hidden'); 
    }
    function closeDesktopSideNav() { 
        if (desktopSideNavMenu) desktopSideNavMenu.classList.remove('open'); 
        if (desktopOverlay) desktopOverlay.classList.add('hidden'); 
    }

    if (desktopHamburgerButton) desktopHamburgerButton.addEventListener('click', openDesktopSideNav);
    if (desktopNavCloseButton) desktopNavCloseButton.addEventListener('click', closeDesktopSideNav);
    if (desktopOverlay) desktopOverlay.addEventListener('click', closeDesktopSideNav);
    // --- Fim do Código Comum Essencial ---


    // --- LÓGICA ESPECÍFICA DA PÁGINA ARENA GAMER ---

    // Lógica para as abas do Ranking
    const tabs = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove a classe 'active' de todas as abas
            tabs.forEach(item => item.classList.remove('active'));
            // Adiciona a classe 'active' apenas na aba que foi clicada
            tab.classList.add('active');

            const targetPanelId = 'tab-content-' + tab.dataset.tab;

            // Esconde todos os painéis de ranking
            tabPanels.forEach(panel => {
                panel.classList.add('hidden');
            });

            // Mostra apenas o painel de ranking correspondente à aba clicada
            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
            }
        });
    });

    // Lógica para o Modal de Inscrição em Torneios
    const registerButtons = document.querySelectorAll('.register-btn');
    const modal = document.getElementById('tournamentRegistrationModal');
    const modalCloseBtn = modal.querySelector('.modal-close-btn');
    const modalTournamentTitle = document.getElementById('modalTournamentTitle');
    const tournamentRegisterForm = document.getElementById('tournamentRegisterForm');

    function openModal(modalElement) {
        if(modalElement) {
            modalElement.classList.remove('hidden');
            modalElement.classList.add('active'); // Para animações, se houver
        }
    }
    function closeModal(modalElement) {
        if(modalElement) {
            modalElement.classList.add('hidden');
            modalElement.classList.remove('active');
        }
    }
    
    registerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tournamentName = button.dataset.tournamentName;
            modalTournamentTitle.textContent = `Inscrição: ${tournamentName}`;
            openModal(modal);
        });
    });

    if(modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => closeModal(modal));
    }
    
    if(modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    }

    if(tournamentRegisterForm) {
        tournamentRegisterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const teamName = document.getElementById('teamName').value;
            // Aqui você pode adicionar uma função de alerta customizada se desejar
            alert(`Equipe "${teamName}" inscrita com sucesso no torneio! (Isso é uma simulação)`);
            tournamentRegisterForm.reset();
            closeModal(modal);
        });
    }
});