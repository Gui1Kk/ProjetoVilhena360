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
    let currentUserId = 1; // Simulação de ID do usuário logado
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
        const currentPageName = "forum-vilhenense";
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

    // --- Lógica Específica da Página do Fórum ---
    const forumPostsContainer = document.getElementById('forumPostsContainer');
    const createNewPostBtn = document.getElementById('createNewPostBtn');
    const newPostModal = document.getElementById('newPostModal');
    const newPostTitleInput = document.getElementById('newPostTitleInput');
    const newPostCategoryInput = document.getElementById('newPostCategoryInput');
    const newPostTagsInput = document.getElementById('newPostTagsInput');
    const newPostContentInput = document.getElementById('newPostContentInput');
    const submitNewPostBtn = document.getElementById('submitNewPostBtn');

    const editPostModal = document.getElementById('editPostModal');
    const editPostTitleInput = document.getElementById('editPostTitleInput');
    const editPostContentInput = document.getElementById('editPostContentInput');
    const saveEditPostBtn = document.getElementById('saveEditPostBtn');
    let editingItemId = null;
    let editingItemType = null; // 'post', 'comment', 'reply'

    const reportModal = document.getElementById('reportModal');
    const submitReportBtn = document.getElementById('submitReport');
    const reportFeedback = document.getElementById('reportFeedback');
    let currentReportTarget = null; // { type, id }

    let mockForumPosts = [
        { id: 1, userId: 1, category: "Trânsito e Mobilidade", title: "Melhorias para o trânsito no centro de Vilhena", author: "Ana Silva", date: "21/05/2025", content: "Gostaria de sugerir a criação de mais ciclovias no centro da cidade para melhorar o fluxo e incentivar o transporte sustentável. O que acham? Precisamos discutir soluções viáveis e que atendam a todos os cidadãos, incluindo pedestres e motoristas. Acredito que um planejamento urbano mais focado na mobilidade ativa pode trazer grandes benefícios para a qualidade de vida em Vilhena. Outro ponto importante é a sincronização dos semáforos.", tags: ["ciclovia", "mobilidade urbana", "centro", "semáforo"], likes: 15, dislikes: 2, likedByUser: false, dislikedByUser: false, comments: [
            {id: 101, userId: 2, author: "Carlos B.", text: "Ótima ideia, Ana! Precisamos de mais segurança para os ciclistas. E fiscalização também!", date: "21/05/2025", likes:5, dislikes:0, likedByUser: false, dislikedByUser: false, replies: [
                {id:201, userId: 3, author:"Bia Reis", text:"Concordo, Carlos! E talvez horários específicos para carga/descarga no centro ajudariam.", date: "22/05/2025", likes:2, dislikes:0, likedByUser: false, dislikedByUser: false, replies: []}
            ]}
        ] },
        { id: 2, userId: 2, category: "Meio Ambiente", title: "Projeto de Revitalização da Praça Nossa Senhora Aparecida", author: "João Pereira", date: "20/05/2025", content: "A prefeitura apresentou um projeto para revitalizar a Praça Nossa Senhora Aparecida. Alguém já viu os detalhes? Queria discutir os pontos positivos e negativos. Ouvi dizer que vão incluir mais árvores nativas, o que acho excelente, mas estou preocupado com a manutenção a longo prazo e a iluminação noturna.", tags: ["praça", "revitalização", "meio ambiente", "urbanismo"], likes: 22, dislikes: 1, likedByUser: false, dislikedByUser: false, comments: [
             {id: 102, userId: 1, author: "Ana Silva", text: "Acompanhei a apresentação, João. A ideia é usar iluminação LED de baixo consumo e um sistema de irrigação inteligente para as novas plantas. Parece promissor!", date: "20/05/2025", likes:8, dislikes:0, likedByUser: false, dislikedByUser: false, replies: []}
        ] },
        { id: 3, userId: 3, category: "Educação e Cultura", title: "Ideias para o Festival de Inverno de Vilhena 2025", author: "Mariana Costa", date: "19/05/2025", content: "Com o inverno chegando, que tal um brainstorm de ideias para o nosso tradicional festival? Pensei em mais atrações musicais regionais, uma feira de artesanato maior e oficinas culturais para crianças. Quem tem mais sugestões?", tags: ["festival", "cultura", "inverno", "evento", "música"], likes: 30, dislikes: 0, likedByUser: false, dislikedByUser: false, comments: [] }
    ];

    // Função para encontrar um item (post, comentário, resposta) recursivamente
    function findItemRecursive(items, itemId) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === itemId) {
                return { item: items[i], parentArray: items, index: i };
            }
            if (items[i].comments && items[i].comments.length > 0) {
                const foundInComments = findItemRecursive(items[i].comments, itemId);
                if (foundInComments) return foundInComments;
            }
            if (items[i].replies && items[i].replies.length > 0) {
                const foundInReplies = findItemRecursive(items[i].replies, itemId);
                if (foundInReplies) return foundInReplies;
            }
        }
        return null;
    }
    
    function deleteItemRecursive(items, itemId) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === itemId) {
                items.splice(i, 1);
                return true;
            }
            if (items[i].comments && deleteItemRecursive(items[i].comments, itemId)) return true;
            if (items[i].replies && deleteItemRecursive(items[i].replies, itemId)) return true;
        }
        return false;
    }

    function createPostElement(item, type = 'post', parentId = null) {
        const itemEl = document.createElement('div');
        itemEl.className = type === 'post' ? 'forum-post-item card scroll-animate' : 'forum-comment-item scroll-animate'; // Adiciona scroll-animate
        itemEl.dataset.itemId = item.id;
        itemEl.dataset.itemType = type;
        if (parentId) itemEl.dataset.parentId = parentId;
        const isOwnItem = item.userId === currentUserId;

        let contentHTML = '';
        if (type === 'post') {
            contentHTML = `
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h4 class="text-xl font-bold mb-1">${item.title}</h4>
                        <p class="text-xs text-[var(--text-medium)]">Por: ${item.author} - ${item.date} | Categoria: ${item.category}</p>
                    </div>
                    <div class="three-dots-menu relative">
                        <button class="text-[var(--text-medium)] hover:text-[var(--primary-blue)] p-1" aria-label="Mais opções">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                        </button>
                        <div class="three-dots-dropdown">
                            ${isOwnItem ? `<button class="edit-item-btn">Editar</button><button class="delete-item-btn">Excluir</button>` : `<button class="report-item-btn">Denunciar</button>`}
                        </div>
                    </div>
                </div>
                <p class="forum-post-preview mb-2">${item.content.substring(0, 150)}${item.content.length > 150 ? '...' : ''}</p>
                <div class="forum-post-content-full">${item.content.replace(/\n/g, '<br>')}</div>
                <div class="forum-post-tags mt-3 mb-3"><strong>Tags:</strong> ${item.tags.join(', ')}</div>
            `;
        } else { // Comentário ou Resposta
            contentHTML = `
                <div class="flex justify-between items-start mb-1">
                    <p class="text-sm font-semibold text-[var(--darker-blue)]">${item.author} <span class="text-xs text-[var(--text-medium)] font-normal">- ${item.date}</span></p>
                    <div class="three-dots-menu relative">
                        <button class="text-[var(--text-medium)] hover:text-[var(--primary-blue)] p-1 text-xs" aria-label="Mais opções">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                        </button>
                        <div class="three-dots-dropdown">
                            ${isOwnItem ? `<button class="edit-item-btn">Editar</button><button class="delete-item-btn">Excluir</button>` : `<button class="report-item-btn">Denunciar</button>`}
                        </div>
                    </div>
                </div>
                <p class="text-sm mb-2">${item.text.replace(/\n/g, '<br>')}</p>
            `;
        }

        contentHTML += `
            <div class="${type === 'post' ? 'forum-actions' : 'comment-actions'} flex items-center text-xs mt-2">
                <button class="like-btn ${item.likedByUser ? 'liked' : ''}" aria-pressed="${item.likedByUser}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3Z"></path></svg>
                    <span class="like-count">${item.likes}</span>
                </button>
                <button class="dislike-btn ${item.dislikedByUser ? 'disliked' : ''}" aria-pressed="${item.dislikedByUser}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2"></path><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3Z"></path></svg>
                    <span class="dislike-count">${item.dislikes || 0}</span>
                </button>
                <button class="comment-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    Comentar
                </button>
                ${type === 'post' ? `<button class="toggle-comments-btn">Ver Comentários (${item.comments?.length || 0})</button>` : ''}
            </div>
            <div class="comment-reply-form hidden mt-2">
                <textarea placeholder="Escreva sua ${type === 'post' ? 'Comentário' : 'Resposta'}..." rows="2"></textarea>
                <div class="flex justify-end space-x-2">
                    <button class="btn btn-ai btn-xs suggest-reply-ai-btn">Sugerir com IA</button>
                    <button class="btn btn-primary btn-xs submit-reply-btn">Enviar</button>
                </div>
            </div>
            <div class="comments-section ${type === 'post' ? 'hidden' : ''} mt-3">
                ${type === 'post' && item.comments ? item.comments.map(comment => createPostElement(comment, 'comment', item.id).outerHTML).join('') : ''}
            </div>
            ${type === 'comment' && item.replies ? `<div class="replies-container mt-2">${item.replies.map(reply => createPostElement(reply, 'reply', item.id).outerHTML).join('')}</div>` : ''}
        `;
        itemEl.innerHTML = contentHTML;

        // Adiciona event listeners aos botões de ação (editar, excluir, denunciar, like, etc.)
        const threeDotsButton = itemEl.querySelector('.three-dots-menu > button');
        if (threeDotsButton) {
            threeDotsButton.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.three-dots-dropdown.active').forEach(d => {
                    if (d !== threeDotsButton.nextElementSibling) d.classList.remove('active');
                });
                threeDotsButton.nextElementSibling.classList.toggle('active');
            });
        }
        itemEl.querySelector('.edit-item-btn')?.addEventListener('click', () => {
            editingItemId = item.id; editingItemType = type;
            if (editPostTitleInput) editPostTitleInput.value = item.title || '';
            if (editPostTitleInput) editPostTitleInput.style.display = type === 'post' ? 'block' : 'none';
            if (editPostContentInput) editPostContentInput.value = type === 'post' ? item.content : item.text;
            openModal(editPostModal);
        });
        itemEl.querySelector('.delete-item-btn')?.addEventListener('click', () => {
            if (confirm(`Tem certeza que deseja excluir este ${type}?`)) {
                deleteItemRecursive(mockForumPosts, item.id);
                renderForumPosts(currentCategoryFilter);
            }
        });
        itemEl.querySelector('.report-item-btn')?.addEventListener('click', () => {
            currentReportTarget = { type: type, id: item.id };
            const reportReasonEl = document.getElementById('reportReason');
            if (reportReasonEl) reportReasonEl.value = '';
            if (reportFeedback) reportFeedback.classList.add('hidden');
            openModal(reportModal);
        });

        itemEl.querySelector('.like-btn')?.addEventListener('click', (e) => handleReaction(item, 'like', itemEl));
        itemEl.querySelector('.dislike-btn')?.addEventListener('click', (e) => handleReaction(item, 'dislike', itemEl));

        const commentBtn = itemEl.querySelector('.comment-btn');
        const commentForm = itemEl.querySelector('.comment-reply-form');
        if(commentBtn && commentForm) {
            commentBtn.addEventListener('click', () => commentForm.classList.toggle('hidden'));
        }
        
        const suggestReplyAIBtn = itemEl.querySelector('.suggest-reply-ai-btn');
        if (suggestReplyAIBtn) {
            suggestReplyAIBtn.addEventListener('click', async () => {
                const textarea = commentForm.querySelector('textarea');
                const originalContent = type === 'post' ? item.content : item.text;
                const contextPrompt = `Contexto da discussão: "${originalContent.substring(0, 200)}...". Sugira uma resposta ou comentário breve e construtivo.`;
                try {
                    textarea.placeholder = "Gerando sugestão com IA...";
                    const suggestion = await callGeminiAPI(contextPrompt);
                    textarea.value = suggestion;
                    textarea.placeholder = `Escreva sua ${type === 'post' ? 'Comentário' : 'Resposta'}...`;
                } catch (error) {
                    textarea.placeholder = "Erro ao gerar sugestão. Tente novamente.";
                    console.error("Erro ao sugerir resposta com IA:", error);
                }
            });
        }


        const submitReplyBtn = itemEl.querySelector('.submit-reply-btn');
        if(submitReplyBtn) {
            submitReplyBtn.addEventListener('click', () => {
                const textarea = commentForm.querySelector('textarea');
                const newText = textarea.value.trim();
                if (newText) {
                    const newItemData = {
                        id: Date.now(), userId: currentUserId, author: "Usuário Atual", text: newText,
                        date: new Date().toLocaleDateString('pt-BR'), likes: 0, dislikes: 0,
                        likedByUser: false, dislikedByUser: false, replies: []
                    };
                    if (type === 'post') {
                        if (!item.comments) item.comments = [];
                        item.comments.push(newItemData);
                    } else { 
                        if (!item.replies) item.replies = [];
                        item.replies.push(newItemData);
                    }
                    renderForumPosts(currentCategoryFilter); // Re-renderiza tudo para atualizar
                    textarea.value = '';
                    commentForm.classList.add('hidden');
                }
            });
        }

        if (type === 'post') {
            itemEl.querySelector('h4')?.addEventListener('click', () => { // Expandir/recolher post
                itemEl.classList.toggle('expanded');
                const preview = itemEl.querySelector('.forum-post-preview');
                const fullContent = itemEl.querySelector('.forum-post-content-full');
                if (preview) preview.style.display = itemEl.classList.contains('expanded') ? 'none' : 'block';
                if (fullContent) fullContent.style.display = itemEl.classList.contains('expanded') ? 'block' : 'none';
            });
            const toggleCommentsBtn = itemEl.querySelector('.toggle-comments-btn');
            const commentsSection = itemEl.querySelector('.comments-section');
            if (toggleCommentsBtn && commentsSection) {
                toggleCommentsBtn.addEventListener('click', () => {
                    commentsSection.classList.toggle('hidden');
                    toggleCommentsBtn.textContent = commentsSection.classList.contains('hidden') ? `Ver Comentários (${item.comments?.length || 0})` : `Ocultar Comentários (${item.comments?.length || 0})`;
                });
            }
        }
        if (animatedElements) observer.observe(itemEl); // Adiciona ao observer de scroll
        return itemEl;
    }

    function handleReaction(item, reactionType, itemEl) {
        const isLike = reactionType === 'like';
        const oppositeReactionField = isLike ? 'dislikedByUser' : 'likedByUser';
        const currentReactionField = isLike ? 'likedByUser' : 'dislikedByUser';
        const countProperty = isLike ? 'likes' : 'dislikes';
        const oppositeCountProperty = isLike ? 'dislikes' : 'likes';

        if (item[currentReactionField]) { // Se já reagiu assim, desfaz
            item[currentReactionField] = false;
            item[countProperty]--;
        } else { // Nova reação ou mudando de dislike para like (ou vice-versa)
            item[currentReactionField] = true;
            item[countProperty]++;
            if (item[oppositeReactionField]) { // Se tinha a reação oposta, desfaz ela
                item[oppositeReactionField] = false;
                item[oppositeCountProperty]--;
            }
        }
        // Atualiza a UI
        const likeCountEl = itemEl.querySelector('.like-count');
        const dislikeCountEl = itemEl.querySelector('.dislike-count');
        const likeBtnEl = itemEl.querySelector('.like-btn');
        const dislikeBtnEl = itemEl.querySelector('.dislike-btn');

        if(likeCountEl) likeCountEl.textContent = item.likes;
        if(dislikeCountEl) dislikeCountEl.textContent = item.dislikes || 0;
        if(likeBtnEl) likeBtnEl.classList.toggle('liked', item.likedByUser);
        if(dislikeBtnEl) dislikeBtnEl.classList.toggle('disliked', item.dislikedByUser);
        if(likeBtnEl) likeBtnEl.setAttribute('aria-pressed', item.likedByUser);
        if(dislikeBtnEl) dislikeBtnEl.setAttribute('aria-pressed', item.dislikedByUser);
    }
    
    let currentCategoryFilter = "Todas";
    function renderForumPosts(categoryFilter = "Todas") {
        if (!forumPostsContainer) return;
        forumPostsContainer.innerHTML = '';
        currentCategoryFilter = categoryFilter;

        const filteredPosts = categoryFilter === "Todas"
            ? mockForumPosts
            : mockForumPosts.filter(post => post.category === categoryFilter);

        if (filteredPosts.length === 0) {
            forumPostsContainer.innerHTML = '<p class="text-center text-[var(--text-medium)] py-8">Nenhum tópico encontrado nesta categoria.</p>';
            return;
        }
        filteredPosts.forEach(post => {
            forumPostsContainer.appendChild(createPostElement(post, 'post'));
        });
        // Re-adicionar listener para fechar dropdowns de 3 pontos
        document.querySelectorAll('.three-dots-menu > button').forEach(button => {
             // Remove old listener before adding new one to prevent multiple listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            newButton.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.three-dots-dropdown.active').forEach(d => {
                    if (d !== newButton.nextElementSibling) d.classList.remove('active');
                });
                newButton.nextElementSibling.classList.toggle('active');
            });
        });
    }
    document.addEventListener('click', (e) => { // Fecha dropdowns de 3 pontos se clicar fora
        if (!e.target.closest('.three-dots-menu')) {
            document.querySelectorAll('.three-dots-dropdown.active').forEach(d => d.classList.remove('active'));
        }
    });

    if (createNewPostBtn) createNewPostBtn.addEventListener('click', () => {
        if(newPostTitleInput) newPostTitleInput.value = '';
        if(newPostCategoryInput) newPostCategoryInput.value = 'Ideias Gerais';
        if(newPostTagsInput) newPostTagsInput.value = '';
        if(newPostContentInput) newPostContentInput.value = '';
        openModal(newPostModal);
    });
    
    if (submitNewPostBtn) {
        submitNewPostBtn.addEventListener('click', () => {
            const title = newPostTitleInput.value.trim();
            const category = newPostCategoryInput.value;
            const tags = newPostTagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag);
            const content = newPostContentInput.value.trim();

            if (title && category && content) {
                const newPost = {
                    id: Date.now(), userId: currentUserId, category: category, title: title,
                    author: "Usuário Atual", date: new Date().toLocaleDateString('pt-BR'),
                    content: content, tags: tags, likes: 0, dislikes: 0,
                    likedByUser: false, dislikedByUser: false, comments: []
                };
                mockForumPosts.unshift(newPost);
                renderForumPosts(currentCategoryFilter);
                renderTrendingTopics(); // Atualiza tópicos em alta
                closeModal(newPostModal);
            } else {
                alert("Por favor, preencha todos os campos obrigatórios (Título, Categoria, Conteúdo).");
            }
        });
    }

    if(saveEditPostBtn && editPostModal) {
        saveEditPostBtn.addEventListener('click', () => {
            if (editingItemId === null) return;
            const found = findItemRecursive(mockForumPosts, editingItemId);
            if (found && found.item) {
                if (editingItemType === 'post') {
                    if(editPostTitleInput) found.item.title = editPostTitleInput.value.trim();
                    if(editPostContentInput) found.item.content = editPostContentInput.value.trim();
                } else { // comment or reply
                     if(editPostContentInput) found.item.text = editPostContentInput.value.trim();
                }
                renderForumPosts(currentCategoryFilter);
                closeModal(editPostModal);
                editingItemId = null; editingItemType = null;
            }
        });
    }
    
    if (submitReportBtn && reportModal) {
        submitReportBtn.addEventListener('click', () => {
            const reasonEl = document.getElementById('reportReason');
            const reason = reasonEl ? reasonEl.value.trim() : '';
            if (reason && currentReportTarget) {
                console.log(`Conteúdo denunciado: Tipo=${currentReportTarget.type}, ID=${currentReportTarget.id}, Motivo: ${reason}`);
                if(reportFeedback) {
                    reportFeedback.textContent = "Denúncia enviada com sucesso. Agradecemos sua colaboração.";
                    reportFeedback.classList.remove('hidden', 'text-red-600');
                    reportFeedback.classList.add('text-green-600');
                }
                if(reasonEl) reasonEl.value = '';
                setTimeout(() => { closeModal(reportModal); if(reportFeedback) reportFeedback.classList.add('hidden'); }, 3000);
                currentReportTarget = null;
            } else {
                if(reportFeedback) {
                    reportFeedback.textContent = "Por favor, especifique o motivo da denúncia.";
                    reportFeedback.classList.remove('hidden', 'text-green-600');
                    reportFeedback.classList.add('text-red-600');
                }
            }
        });
    }

    function renderTrendingTopics() {
        const trendingTopicsList = document.getElementById('trendingTopicsList');
        if (!trendingTopicsList) return;
        trendingTopicsList.innerHTML = '';
        const sortedPosts = [...mockForumPosts].sort((a, b) => (b.likes + (b.comments?.length || 0) * 2) - (a.likes + (a.comments?.length || 0) * 2)).slice(0, 5);
        if (sortedPosts.length === 0) {
            trendingTopicsList.innerHTML = '<li><a href="#" class="text-[var(--text-medium)]">Nenhum tópico em alta.</a></li>';
            return;
        }
        sortedPosts.forEach(post => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" class="text-[var(--text-medium)] hover:text-[var(--primary-blue)]" data-post-id="${post.id}">${post.title}</a>`;
            trendingTopicsList.appendChild(li);
            li.querySelector('a').addEventListener('click', (e) => {
                e.preventDefault();
                const postElement = forumPostsContainer.querySelector(`.forum-post-item[data-item-id="${post.id}"]`);
                if (postElement) {
                    postElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    if (!postElement.classList.contains('expanded')) {
                         postElement.querySelector('h4')?.click(); // Simula clique para expandir
                    }
                }
            });
        });
    }

    function setupCategoryFilters() {
        const filterButtons = document.querySelectorAll('.filter-category-btn');
        filterButtons.forEach(button => {
            const newButton = button.cloneNode(true); // Clona para remover listeners antigos
            button.parentNode.replaceChild(newButton, button);

            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                const category = newButton.dataset.category;
                renderForumPosts(category);
                filterButtons.forEach(btn => btn.classList.remove('font-bold', 'text-[var(--darker-blue)]'));
                newButton.classList.add('font-bold', 'text-[var(--darker-blue)]');
            });
            if (newButton.dataset.category === currentCategoryFilter) { // Destaca o filtro atual
                newButton.classList.add('font-bold', 'text-[var(--darker-blue)]');
            }
        });
    }
    
    // Verifica se há dados de post do localStorage (vindo do modal de insights)
    const storedTitle = localStorage.getItem('newForumPostTitle');
    const storedContent = localStorage.getItem('newForumPostContent');
    const storedCategory = localStorage.getItem('newForumPostCategory');

    if (storedTitle && storedContent && storedCategory && newPostModal) {
        if(newPostTitleInput) newPostTitleInput.value = storedTitle;
        if(newPostContentInput) newPostContentInput.value = storedContent;
        if(newPostCategoryInput) newPostCategoryInput.value = storedCategory;
        openModal(newPostModal);
        // Limpa os dados do localStorage após usá-los
        localStorage.removeItem('newForumPostTitle');
        localStorage.removeItem('newForumPostContent');
        localStorage.removeItem('newForumPostCategory');
    }


    renderForumPosts();
    renderTrendingTopics();
    setupCategoryFilters();
});
