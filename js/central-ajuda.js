document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos Comuns do Header (copiados do index.js para consistência) ---
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const overlay = document.getElementById('overlay');
    const desktopHamburgerButton = document.getElementById('desktop-hamburger-button');
    const desktopSideNavMenu = document.getElementById('desktop-side-nav-menu');
    const desktopNavCloseButton = document.getElementById('desktop-nav-close-btn');
    const desktopOverlay = document.getElementById('desktop-overlay');
    const profileIconBtn = document.getElementById('profileIconBtn');
    const profileDropdownMenu = document.getElementById('profileDropdownMenu');
    
    let isLoggedIn = false; // Simulação, idealmente viria de um estado global/session
    let currentUserName = 'Visitante'; // Simulação
    let currentUserProfileImage = 'https://placehold.co/40x40/cccccc/ffffff?text=P'; // Simulação

    function openMobileMenu() { /* ... (código do index.js) ... */ }
    function closeMobileMenu() { /* ... (código do index.js) ... */ }
    function openDesktopSideNav() { /* ... (código do index.js) ... */ }
    function closeDesktopSideNav() { /* ... (código do index.js) ... */ }

    if (hamburgerButton) hamburgerButton.addEventListener('click', openMobileMenu);
    if (overlay) overlay.addEventListener('click', closeMobileMenu);
    if (desktopHamburgerButton) desktopHamburgerButton.addEventListener('click', openDesktopSideNav);
    if (desktopNavCloseButton) desktopNavCloseButton.addEventListener('click', closeDesktopSideNav);
    if (desktopOverlay) desktopOverlay.addEventListener('click', closeDesktopSideNav);

    function updateProfileDisplayCentralAjuda() { // Função renomeada para evitar conflito se o index.js for carregado
        if (!profileDropdownMenu || !mobileNavMenu) return;
        const mobileNavAuthContainer = mobileNavMenu.querySelector('.pt-24');
        if (!mobileNavAuthContainer) return;

        mobileNavAuthContainer.querySelectorAll('.auth-dynamic-link').forEach(el => el.remove());
        let mobileAuthHTML = '';

        if (isLoggedIn) {
            profileDropdownMenu.innerHTML = `
                <div class="px-4 py-3">
                    <p class="text-sm font-semibold text-[var(--text-dark)]">${currentUserName}</p>
                </div> <hr class="border-[var(--border-light-gray)]">
                <a href="#" class="profile-dropdown-item">Meu Perfil</a> <hr class="border-[var(--border-light-gray)]">
                <a href="#" id="logoutActionHelp" class="profile-dropdown-item text-[var(--red-alert)] hover:bg-red-50">Sair</a>`;
            if (profileIconBtn) profileIconBtn.innerHTML = `<img src="${currentUserProfileImage}" alt="Foto de Perfil" class="w-full h-full object-cover">`;
            mobileAuthHTML = `<hr class="border-t border-white/20 my-2 auth-dynamic-link"><a href="#" class="nav-link auth-dynamic-link">Meu Perfil</a><a href="#" id="mobileLogoutActionHelp" class="nav-link auth-dynamic-link text-red-300 hover:bg-red-500">Sair</a>`;
            document.getElementById('logoutActionHelp')?.addEventListener('click', handleLogoutHelp);
        } else {
            profileDropdownMenu.innerHTML = `<a href="#" id="dropdownLoginActionHelp" class="profile-dropdown-item">Entrar</a><a href="#" id="dropdownRegisterActionHelp" class="profile-dropdown-item">Registrar-se</a>`;
            if (profileIconBtn) profileIconBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5a.75.75 0 0 1 .75.75v.256a4.5 4.5 0 0 1 3.384 4.47l.006.024c.03.16.05.322.058.488l.002.044a5.074 5.074 0 0 1 .002.106q.001.044.002.087a4.732 4.732 0 0 1-.007.137l-.002.032a4.502 4.502 0 0 1-1.36 2.627A4.5 4.5 0 0 1 12 12.5a4.5 4.5 0 0 1-3.075-1.016A4.501 4.501 0 0 1 7.57 8.857l-.002-.032a4.733 4.733 0 0 1-.006-.137q.001-.043.002-.087c0-.035.001-.07.002-.106l.002-.044a4.504 4.504 0 0 1 .058-.488l.006-.024a4.5 4.5 0 0 1 3.384-4.47V3.25a.75.75 0 0 1 .75-.75Zm0 1.5A3 3 0 0 0 9.232 7.004l-.005.024a3.004 3.004 0 0 0-.038.326l-.002.03c0 .024 0 .047-.001.07a2.98 2.98 0 0 0 .004.091l.002.022a3 3 0 0 0 .908 1.752A3 3 0 0 0 12 11a3 3 0 0 0 2.008-.701 3.002 3.002 0 0 0 .907-1.752l.002-.022c.002-.023.003-.046.004-.07a2.98 2.98 0 0 0-.001-.09l-.002-.03a3.004 3.004 0 0 0-.038-.327l-.005-.023A3 3 0 0 0 12 4Zm0 9a7.487 7.487 0 0 0-5.349 2.289A7.5 7.5 0 0 0 1.5 20.75a.75.75 0 0 0 .75.75h19.5a.75.75 0 0 0 .75-.75 7.5 7.5 0 0 0-5.151-5.461A7.487 7.487 0 0 0 12 13Z"></path></svg>`;
            mobileAuthHTML = `<hr id="mobileNavAuthHr" class="border-t border-white/20 my-2 auth-dynamic-link"><a href="#" id="mobileLoginActionHelp" class="nav-link auth-dynamic-link">Entrar</a><a href="#" id="mobileRegisterActionHelp" class="nav-link auth-dynamic-link">Registrar-se</a>`;
            
            // Adicionar listeners para abrir modais de login/registro (que estariam no index.html)
            // Para esta página, apenas simulamos a ação.
            document.getElementById('dropdownLoginActionHelp')?.addEventListener('click', (e) => { e.preventDefault(); alert("Simulação: Abrir modal de login (da index.html)"); profileDropdownMenu.classList.remove('active'); });
            document.getElementById('dropdownRegisterActionHelp')?.addEventListener('click', (e) => { e.preventDefault(); alert("Simulação: Abrir modal de registro (da index.html)"); profileDropdownMenu.classList.remove('active'); });
        }
        mobileNavAuthContainer.insertAdjacentHTML('beforeend', mobileAuthHTML);
        mobileNavAuthContainer.querySelector('#mobileLogoutActionHelp')?.addEventListener('click', handleLogoutHelp);
    }
    
    function handleLogoutHelp(e) {
        if (e) e.preventDefault();
        isLoggedIn = false;
        currentUserName = 'Visitante';
        currentUserProfileImage = 'https://placehold.co/40x40/cccccc/ffffff?text=P';
        updateProfileDisplayCentralAjuda();
        if (profileDropdownMenu) profileDropdownMenu.classList.remove('active');
        if (mobileNavMenu) closeMobileMenu();
        alert("Você saiu da sua conta (simulado).");
    }

    updateProfileDisplayCentralAjuda(); // Inicializa o display do perfil

    if (profileIconBtn) {
        profileIconBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (profileDropdownMenu) profileDropdownMenu.classList.toggle('active');
        });
    }
    document.addEventListener('click', (e) => {
        if (profileDropdownMenu && !profileDropdownMenu.contains(e.target) && profileIconBtn && !profileIconBtn.contains(e.target)) {
            profileDropdownMenu.classList.remove('active');
        }
    });
    // --- Fim dos Elementos Comuns do Header ---


    const helpCardButtons = document.querySelectorAll('.help-card-button');
    const helpContentSections = document.querySelectorAll('.help-content-section');

    helpCardButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSectionId = button.dataset.section;
            helpContentSections.forEach(section => {
                if (section.id === targetSectionId) {
                    section.classList.remove('hidden');
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });

    // Lógica do Chat de Suporte Athena
    const athenaChatContainer = document.getElementById('athenaChatContainer');
    const athenaChatMessageInput = document.getElementById('athenaChatMessageInput');
    const sendAthenaChatMessageBtn = document.getElementById('sendAthenaChatMessageBtn');
    const athenaTypingIndicator = document.getElementById('athenaTypingIndicator');
    let athenaChatHistory = [
        { role: "model", parts: [{ text: "Olá! Sou Athena, sua assistente virtual do Vilhena 360°. Como posso ajudar você hoje com a plataforma, ou se precisar registrar uma denúncia?" }] }
    ];

    async function callAthenaGeminiAPI(promptText) {
        const apiKey = ""; // Deixe vazio para o Canvas injetar
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        
        const contents = [...athenaChatHistory];
        contents.push({ role: "user", parts: [{ text: promptText }] });

        const payload = { contents: contents };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erro da API Gemini (Athena):", errorData);
                return "Desculpe, estou com dificuldades para processar sua solicitação no momento. Tente mais tarde.";
            }
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const botResponse = result.candidates[0].content.parts[0].text;
                athenaChatHistory.push({ role: "model", parts: [{text: botResponse}] }); // Adiciona resposta ao histórico
                return botResponse;
            } else {
                console.error("Resposta inesperada da API Gemini (Athena):", result);
                return "Não consegui entender. Poderia reformular sua pergunta?";
            }
        } catch (error) {
            console.error("Erro ao chamar a API Gemini (Athena):", error);
            return "Houve um problema de conexão com a assistente. Por favor, tente novamente.";
        }
    }


    function addMessageToAthenaChatUI(text, isUser) {
        if (!athenaChatContainer) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message-support ${isUser ? 'sent-support' : 'received-support'}`;
        
        let senderName = isUser ? (currentUserName || "Você") : "Athena Assistente";
        let nameColor = isUser ? "text-blue-100" : "text-[var(--primary-blue)]";

        messageDiv.innerHTML = `
            <span class="font-semibold text-xs mb-1 ${nameColor}">${senderName}:</span>
            <div>${text.replace(/\n/g, '<br>')}</div>
        `;
        athenaChatContainer.appendChild(messageDiv);
        athenaChatContainer.scrollTop = athenaChatContainer.scrollHeight;
    }

    async function handleSendAthenaMessage() {
        if (!athenaChatMessageInput) return;
        const messageText = athenaChatMessageInput.value.trim();
        if (messageText === '') return;

        addMessageToAthenaChatUI(messageText, true);
        athenaChatHistory.push({ role: "user", parts: [{text: messageText}] }); // Adiciona mensagem do usuário ao histórico
        athenaChatMessageInput.value = '';

        if (athenaTypingIndicator) athenaTypingIndicator.classList.remove('hidden');
        
        const athenaResponse = await callAthenaGeminiAPI(messageText); // A API já usa o athenaChatHistory
        
        if (athenaTypingIndicator) athenaTypingIndicator.classList.add('hidden');
        addMessageToAthenaChatUI(athenaResponse, false);
    }

    if (sendAthenaChatMessageBtn) sendAthenaChatMessageBtn.addEventListener('click', handleSendAthenaMessage);
    if (athenaChatMessageInput) athenaChatMessageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendAthenaMessage();
        }
    });
    
    // Rodapé ano atual
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
});
