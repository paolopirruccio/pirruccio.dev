/**
 * components.js
 * Handles injecting common HTML components (Navbar, Sidebar)
 * Evaluates the authentication state via db.js and toggles visibility.
 * Must be included AFTER db.js in HTML files.
 */

document.addEventListener('DOMContentLoaded', () => {

    const navbarHTML = `
<nav class="navbar">
    <a href="index.html" class="navbar-brand">
        <img src="illustrazioni/logo-navbar.svg" alt="BlogOwl Logo" class="navbar-logo" onerror="this.src='illustrazioni/logo-navbar-black.svg'">
    </a>
    <ul class="navbar-nav" id="navList">
        <!-- Injected via JavaScript based on login status -->
    </ul>
</nav>

<!-- Auth required sidebar overlay -->
<div id="slideMenuOverlay"></div>
<div id="sidebar-placeholder"></div>
`;

    const sidebarHTML = `
<div id="slideMenu" class="slide-menu">
    <div class="close-btn" id="closeMenu">&times;</div>
    <div class="menu-content">
        <ul class="menu-list">
            <li>
                <a href="account.html"><i class="fas fa-circle-user"></i> <span id="sidebar-username">Account</span></a>
            </li>
            <li>
                <a href="bozze.html"><i class="fa-solid fa-file-pen"></i> Le tue bozze</a>
            </li>
            <li>
                <a href="salvati.html"><i class="fas fa-bookmark"></i> Post salvati</a>
            </li>
            <li>
                <a href="#" id="randomBlogSidebarBtn"><i class="fa-solid fa-dice"></i> Pagina Random</a>
            </li>
            <li>
                <a href="crea_post.html"><i class="fa-solid fa-feather"></i> Crea post</a>
            </li>
            <li>
                <a href="crea_blog.html"><i class="fa-solid fa-layer-group"></i> Crea blog</a>
            </li>
            <li>
                <a href="impostazioni.html"><i class="fa-solid fa-gear"></i> Impostazioni</a>
            </li>
            <li>
                <a href="#" id="sidebar-logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </li>
        </ul>
    </div>
</div>
`;

    const injectNavbarAndSidebar = () => {
        const bodyStart = document.body;

        // 1. Create a wrapper at the top of the body for the Navbar
        const navContainer = document.createElement('div');
        navContainer.id = 'navbar-container-injection';
        navContainer.innerHTML = navbarHTML;
        bodyStart.insertBefore(navContainer, bodyStart.firstChild);

        let currentUser = null;
        let isLoggedIn = false;

        if (window.mockDB) {
            currentUser = window.mockDB.getCurrentUser();
            isLoggedIn = window.mockDB.isUserLoggedIn();
        }

        // 2. Setup Navbar links dynamically based on Auth State
        const navList = document.getElementById('navList');

        // Get current page name for 'active' class
        const path = window.location.pathname;
        const page = path.split("/").pop() || 'index.html';

        if (isLoggedIn && currentUser) {
            if (navList) {
                navList.innerHTML = `
                    <li class="nav-item">
                        <a href="index.html" class="nav-link ${page === 'index.html' ? 'active' : ''}">
                            <i class="fas fa-home"></i> Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="cerca.html" class="nav-link ${page === 'cerca.html' ? 'active' : ''}">
                            <i class="fa-solid fa-magnifying-glass"></i> Cerca
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="esplora_blog.html" class="nav-link ${page === 'esplora_blog.html' ? 'active' : ''}">
                            <i class="fa-solid fa-compass"></i> Blog
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" id="openMenu" class="nav-link">
                            <i class="fas fa-bars"></i> Altro
                        </a>
                    </li>
                `;
            }

            // 3. Load the Sidebar since User is logged in
            const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
            if (sidebarPlaceholder) {
                sidebarPlaceholder.innerHTML = sidebarHTML;
            }

            // Set Username
            const sidebarUsername = document.getElementById('sidebar-username');
            if (sidebarUsername) {
                sidebarUsername.textContent = currentUser.username;
            }

            // Setup Sidebar Events
            const slideMenu = document.getElementById('slideMenu');
            const slideMenuOverlay = document.getElementById('slideMenuOverlay');
            const openMenuBtn = document.getElementById('openMenu');
            const closeMenuBtn = document.getElementById('closeMenu');

            if (openMenuBtn && slideMenu && slideMenuOverlay) {
                openMenuBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    slideMenu.classList.add('active');
                    slideMenuOverlay.classList.add('active');
                });
            }

            if (closeMenuBtn && slideMenu && slideMenuOverlay) {
                closeMenuBtn.addEventListener('click', () => {
                    slideMenu.classList.remove('active');
                    slideMenuOverlay.classList.remove('active');
                });
            }

            if (slideMenuOverlay) {
                slideMenuOverlay.addEventListener('click', () => {
                    slideMenu.classList.remove('active');
                    slideMenuOverlay.classList.remove('active');
                });
            }

            
            // Setup Random Blog Event
            const randomBtn = document.getElementById('randomBlogSidebarBtn');
            if(randomBtn) {
                randomBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if(window.mockDB) {
                        const db = window.mockDB.getDB();
                        if(db.blogs && db.blogs.length > 0) {
                            const randomIndex = Math.floor(Math.random() * db.blogs.length);
                            const randomBlog = db.blogs[randomIndex];
                            window.location.href = `blog.html?id=${randomBlog.id}`;
                        } else {
                            alert("Nessun blog disponibile al momento.");
                        }
                    }
                });
            }

            // Setup Logout Event via Delegation since sidebar might be injected dynamically
            document.body.addEventListener('click', (e) => {
                const target = e.target.closest('#sidebar-logout');
                if (target) {
                    e.preventDefault();
                    if(window.mockDB) {
                        window.mockDB.logoutUser();
                        window.location.href = 'login.html';
                    }
                }
            });

        } else {
            // Not Logged In
            if (navList) {
                navList.innerHTML = `
                    <li class="nav-item">
                        <a href="cerca.html" class="nav-link ${page === 'cerca.html' ? 'active' : ''}">
                            <i class="fa-solid fa-magnifying-glass"></i> Cerca
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="login.html" class="nav-link ${page === 'login.html' ? 'active' : ''}">
                            <i class="fas fa-sign-in-alt"></i> Login
                        </a>
                    </li>
                `;
            }
        }
    };

    // Trigger Injection
    injectNavbarAndSidebar();
});
