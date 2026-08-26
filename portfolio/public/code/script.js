const languages = [
    { id: 'html', name: 'HTML', icon: 'ph-file-html', color: 'var(--brand-html)' },
    { id: 'css', name: 'CSS', icon: 'ph-file-css', color: 'var(--brand-css)' },
    { id: 'js', name: 'JavaScript', icon: 'ph-file-js', color: 'var(--brand-js)' },
    { id: 'python', name: 'Python', icon: 'ph-file-code', color: 'var(--brand-python)', isPythonSVG: true },
    { id: 'sql', name: 'SQL', icon: 'ph-database', color: 'var(--brand-sql)' },
    { id: 'php', name: 'PHP', icon: 'ph-file-code', color: 'var(--brand-php)' }
];

// App State
let currentLangId = null;

// DOM Elements
const homeView = document.getElementById('home-view');
const languageView = document.getElementById('language-view');
const noResultsView = document.getElementById('no-results');
const languageGrid = document.getElementById('language-grid');
const syntaxGrid = document.getElementById('syntax-grid');
const breadcrumbs = document.getElementById('breadcrumbs');
const currentLangLabel = document.getElementById('current-lang');
const backHomeBtn = document.getElementById('back-home');
const logoBtn = document.getElementById('logo-btn');
const searchInput = document.getElementById('search-input');
const searchContainer = document.getElementById('search-container');

// Create Overlay for expanded cards
const overlay = document.createElement('div');
overlay.className = 'card-overlay';
document.body.appendChild(overlay);

// Initialize App
function init() {
    renderHomeGrid();
    setupEventListeners();
}

// Render the 6 language cards on the home screen
function renderHomeGrid() {
    languageGrid.innerHTML = '';
    
    languages.forEach(lang => {
        const card = document.createElement('div');
        card.className = 'bento-card lang-card';
        card.style.setProperty('--hover-color', lang.color);
        
        let iconHtml = `<i class="ph ${lang.icon} lang-icon"></i>`;
        
        // Use a better custom SVG for Python if defined
        if (lang.isPythonSVG) {
            iconHtml = `<svg class="lang-icon" viewBox="0 0 128 128" width="48" height="48" style="fill:currentColor; margin-bottom:16px;">
                <path d="M64.7,6.8c-18.1,0-27.1,7.9-27.1,7.9l-0.1,13h28.1v4H35.8c0,0-15.6,1.4-15.6,26s12.5,23.4,12.5,23.4h8v-11.4c0-0.2,0-0.6,0.1-1.3C41,56.7,51.8,55,51.8,55 c17.6,0,29.8-12.2,29.8-25.5C81.6,14.6,73.1,6.8,64.7,6.8z M51.1,17c2,0,3.6,1.6,3.6,3.6c0,2-1.6,3.6-3.6,3.6c-2,0-3.6-1.6-3.6-3.6 C47.5,18.7,49.1,17,51.1,17z M92.5,46.9c0,0-12.4-23.4-12.4-23.4h-8v11.4c0,0.2,0,0.6-0.1,1.3c-0.2,11.7-11.1,13.4-11.1,13.4 c-17.6,0-29.8,12.2-29.8,25.5C31.2,88.4,39.7,96.2,48.1,96.2c18.1,0,27.1-7.9,27.1-7.9l0.1-13H47.1v-4h29.8 C76.9,71.3,92.5,69.9,92.5,46.9z M76.9,86c-2,0-3.6-1.6-3.6-3.6c0-2,1.6-3.6,3.6-3.6c2,0,3.6,1.6,3.6,3.6C80.5,84.3,78.9,86,76.9,86 z"></path>
            </svg>`;
        }
        
        card.innerHTML = `
            ${iconHtml}
            <h3>${lang.name}</h3>
        `;
        
        card.addEventListener('click', () => loadLanguage(lang.id));
        addMouseEffect(card);
        
        languageGrid.appendChild(card);
    });
}

// Load a specific language view
function loadLanguage(langId) {
    currentLangId = langId;
    const langConfig = languages.find(l => l.id === langId);
    
    // Update UI
    currentLangLabel.textContent = langConfig.name;
    breadcrumbs.classList.remove('hidden');
    searchContainer.classList.remove('hidden');
    searchInput.value = ''; // clear search on language change
    
    // Toggle Views
    homeView.classList.remove('active');
    languageView.classList.add('active');
    
    // Render content
    renderSyntaxGrid(langId);
}

// Go back to home screen
function goHome() {
    currentLangId = null;
    breadcrumbs.classList.add('hidden');
    searchContainer.classList.add('hidden');
    searchInput.value = '';
    
    languageView.classList.remove('active');
    noResultsView.classList.remove('active');
    homeView.classList.add('active');
}

// Render the bento grid for the selected language
function renderSyntaxGrid(langId, filterText = '') {
    syntaxGrid.innerHTML = '';
    
    // syntaxData is loaded from data.js globally
    if (!syntaxData || !syntaxData[langId]) {
        showNoResults();
        return;
    }

    const topics = syntaxData[langId];
    
    // Filter logic
    const filtered = topics.filter(topic => 
        topic.title.toLowerCase().includes(filterText.toLowerCase()) || 
        topic.desc.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filtered.length === 0) {
        showNoResults();
        return;
    } else {
        noResultsView.classList.remove('active');
        languageView.classList.add('active');
    }

    const langConfig = languages.find(l => l.id === langId);

    // Create cards
    filtered.forEach(topic => {
        const card = document.createElement('div');
        // Add dynamic grid spanning sizes
        const colSpan = topic.colSpan || 1;
        const rowSpan = topic.rowSpan || 1;
        
        card.className = `bento-card syntax-card col-span-${colSpan} row-span-${rowSpan}`;
        card.style.setProperty('--hover-color', langConfig.color);
        
        // Check if there is code or just theory content
        let codeBlock = '';
        if (topic.code) {
            let highlightedCode = '';
            try {
                const langAlias = langId === 'html' ? 'xml' : (langId === 'js' ? 'javascript' : langId);
                highlightedCode = hljs.highlight(topic.code, { language: langAlias }).value;
            } catch (e) {
                highlightedCode = hljs.highlightAuto(topic.code).value;
            }
            codeBlock = `
            <div class="code-wrapper">
                <button class="copy-btn" onclick="copyToClipboard(this)" data-code="${encodeURIComponent(topic.code)}">
                    <i class="ph ph-copy"></i>
                </button>
                <pre><code>${highlightedCode}</code></pre>
            </div>`;
        } else if (topic.htmlContent) {
            codeBlock = `
            <div class="theory-content">
                ${topic.htmlContent}
            </div>`;
        }
        
        card.innerHTML = `
            <button class="card-close-btn"><i class="ph ph-x"></i></button>
            <div class="syntax-header">
                <h3>${topic.title}</h3>
                <span class="syntax-badge">${langConfig.name}</span>
            </div>
            ${topic.desc ? `<p class="syntax-desc">${topic.desc}</p>` : ''}
            ${codeBlock}
        `;
        
        addMouseEffect(card);
        
        // Expand logic
        card.addEventListener('click', (e) => {
            // don't expand if clicking copy button
            if (e.target.closest('.copy-btn')) return;
            // don't collapse if clicking card content when already expanded
            if (card.classList.contains('expanded') && !e.target.closest('.card-close-btn')) return;

            if (card.classList.contains('expanded')) {
                closeExpandedCard(card);
            } else {
                expandCard(card);
            }
        });
        
        syntaxGrid.appendChild(card);
    });
}

let activeExpandedCard = null;

function expandCard(card) {
    if (activeExpandedCard) closeExpandedCard(activeExpandedCard);
    
    // Calculate transform origin based on original position
    const rect = card.getBoundingClientRect();
    card.style.transformOrigin = `${rect.left + rect.width/2}px ${rect.top + rect.height/2}px`;
    
    card.classList.add('expanded');
    overlay.classList.add('active');
    activeExpandedCard = card;
}

function closeExpandedCard(card) {
    card.classList.remove('expanded');
    overlay.classList.remove('active');
    activeExpandedCard = null;
}

function showNoResults() {
    languageView.classList.remove('active');
    noResultsView.classList.add('active');
}

// Mouse effect for gradient glow tracking
function addMouseEffect(card) {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
}

// Setup global event listeners
function setupEventListeners() {
    backHomeBtn.addEventListener('click', goHome);
    logoBtn.addEventListener('click', goHome);
    
    searchInput.addEventListener('input', (e) => {
        if (currentLangId) {
            renderSyntaxGrid(currentLangId, e.target.value);
        }
    });

    overlay.addEventListener('click', () => {
        if (activeExpandedCard) closeExpandedCard(activeExpandedCard);
    });
}

// Utility: Copy to Clipboard
window.copyToClipboard = function(btn) {
    const code = decodeURIComponent(btn.getAttribute('data-code'));
    navigator.clipboard.writeText(code).then(() => {
        const icon = btn.querySelector('i');
        icon.classList.remove('ph-copy');
        icon.classList.add('ph-check', 'kw'); // Turn green/purple based on css
        setTimeout(() => {
            icon.classList.replace('ph-check', 'ph-copy');
            icon.classList.remove('kw');
        }, 2000);
    }).catch(err => console.error('Failed to copy', err));
}

// Removed custom simpleHighlight function because we now use Highlight.js

// Boot
document.addEventListener('DOMContentLoaded', init);
