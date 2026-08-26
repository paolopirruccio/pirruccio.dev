// ========================================
// ========================================

let appData = null;
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const emptyState = document.getElementById('emptyState');
const resetBtn = document.getElementById('resetBtn');

const ACTION_STYLES = {
    social: { color: 'card-style-orange', label: 'SOCIAL', icon: 'fa-brands fa-instagram' },
    email: { color: 'card-style-gold', label: 'CONTACT', icon: 'fa-solid fa-envelope' },
    payment: { color: 'card-style-paypal', label: 'PAYMENT', icon: 'fa-brands fa-paypal' },
    file: { color: 'card-style-gold', label: 'DOWNLOAD', icon: 'fa-solid fa-file-arrow-down' },
    linkedin: { color: 'card-style-blue', label: 'CONNECT', icon: 'fa-brands fa-linkedin' },
    github: { color: 'card-style-dark', label: 'CODE', icon: 'fa-brands fa-github' },
    telegram: { color: 'card-style-telegram', label: 'CHAT', icon: 'fa-brands fa-telegram' },
    default: { color: 'card-style-dark', label: 'LINK', icon: 'fa-solid fa-link' }
};

// ========================================
// ========================================

if (typeof APP_DATA !== 'undefined') {
    appData = APP_DATA;
} else {
    appData = { intents: [], actions: {}, fallbacks: [], suggestions: [] };
}

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    checkEmptyState();
});

// ========================================
// ========================================

function handleUserMessage() {
    if (!userInput) return;
    const text = userInput.value.trim();
    if (!text) return;

    addUserMessage(text);
    userInput.value = '';
    userInput.style.height = 'auto';

    showTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        const response = findResponse(text);
        addBotMessage(response.text, response.action, response.suggestions);
    }, 800 + Math.random() * 400);
}

function findResponse(text) {
    if (typeof BotNLP !== 'undefined' && appData) {
        const res = BotNLP.findResponse(text, appData);
        if (res) {
            return {
                text: processText(res.text),
                action: res.action,
                suggestions: res.isFallback ? getRandomSuggestions(3) : []
            };
        }
    }

    const fallback = appData?.fallbacks?.[0] || "Non sono sicuro di aver capito.";
    return {
        text: fallback,
        action: null,
        suggestions: getRandomSuggestions(3)
    };
}

function getRandomSuggestions(count) {
    if (!appData?.suggestions) return [];
    return [...appData.suggestions].sort(() => 0.5 - Math.random()).slice(0, count);
}

function processText(text) {
    const now = new Date();
    const birthDate = new Date(2001, 5, 4); // June 4, 2001
    let age = now.getFullYear() - birthDate.getFullYear();
    if (now.getMonth() < 5 || (now.getMonth() === 5 && now.getDate() < 4)) age--;

    return text
        .replace('{{TIME}}', now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }))
        .replace('{{DATE}}', now.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
        .replace('{{AGE}}', age)
        .replace('{{LAST_UPDATE}}', appData.lastUpdate || 'Data sconosciuta');
}

// ========================================
// ========================================

function addUserMessage(text) {
    if (emptyState) emptyState.classList.add('hidden');

    const wrapper = document.createElement('div');
    wrapper.className = 'message message-user';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble message-user-bubble';
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    chatContainer.appendChild(wrapper);
    scrollToBottom();
}

function addBotMessage(text, actionData = null, suggestions = null) {
    const wrapper = document.createElement('div');
    wrapper.className = 'message message-ai';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble message-ai-bubble';
    bubble.textContent = text;
    wrapper.appendChild(bubble);

    if (actionData) wrapper.appendChild(createActionCard(actionData));

    if (suggestions?.length) {
        const chips = document.createElement('div');
        chips.className = 'suggestions-chips';
        suggestions.forEach(s => {
            const chip = document.createElement('button');
            chip.className = 'suggestion-chip';
            chip.textContent = s;
            chip.onclick = () => { userInput.value = s; handleUserMessage(); };
            chips.appendChild(chip);
        });
        wrapper.appendChild(chips);
    }

    chatContainer.appendChild(wrapper);
    scrollToBottom();
}

function createActionCard(action) {
    const card = document.createElement('a');
    card.className = 'action-card';
    card.href = action.url;

    if (action.download) {
        card.download = action.download;
    } else {
        card.target = '_blank';
    }

    let styleKey = action.type || 'default';
    if (styleKey === 'default' || !ACTION_STYLES[styleKey]) {
        const urlPatterns = ['linkedin', 'github', 'telegram'];
        styleKey = urlPatterns.find(p => action.url.includes(p)) || 'default';
    }

    const style = ACTION_STYLES[styleKey] || ACTION_STYLES.default;
    card.classList.add(style.color);

    const iconClass = action.icon || style.icon;
    const inlineStyle = action.color ? `style="background: ${action.color};"` : '';

    card.innerHTML = `
        <div class="card-inner" ${inlineStyle}>
            <div class="card-header">
                <span class="card-label">${style.label}</span>
                <div class="card-icon"><i class="${iconClass}"></i></div>
            </div>
            <h2 class="card-title">${action.title.replace(' ', '<br>')}</h2>
            <div class="card-visual"></div>
        </div>
    `;

    return card;
}

function showTypingIndicator() {
    const el = document.createElement('div');
    el.className = 'typing-indicator';
    el.id = 'typingIndicator';
    el.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    chatContainer.appendChild(el);
    scrollToBottom();
}

function removeTypingIndicator() {
    document.getElementById('typingIndicator')?.remove();
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function resetChat() {
    chatContainer.querySelectorAll('.message, .typing-indicator').forEach(el => el.remove());
    checkEmptyState();
}

function checkEmptyState() {
    const hasMessages = chatContainer.querySelectorAll('.message').length > 0;
    emptyState?.classList.toggle('hidden', hasMessages);
}

// ========================================
// ========================================

function setupEventListeners() {
    sendBtn?.addEventListener('click', e => { e.preventDefault(); handleUserMessage(); });

    userInput?.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleUserMessage(); }
    });

    userInput?.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
        if (!this.value) this.style.height = 'auto';
    });

    resetBtn?.addEventListener('click', resetChat);

    document.querySelectorAll('.suggestion-card').forEach(card => {
        card.addEventListener('click', () => {
            const prompt = card.dataset.prompt;
            if (userInput && prompt) {
                userInput.value = prompt;
                userInput.dispatchEvent(new Event('input'));
                userInput.focus();
            }
        });
    });
}
