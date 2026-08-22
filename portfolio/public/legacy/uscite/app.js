function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const state = {
    currentStep: 1,
    userName: '',
    events: [],
    rankedEvents: [],
    refusedEvents: [],
    preferredDates: [],
    unavailableDates: [],
    notes: '',
    datePickerType: null
};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        state.events = await window.api.readSheet('Events');
        state.rankedEvents = [...state.events.filter(e => e.active !== false)];
    } catch (error) {
        state.events = getDemoEvents();
        state.rankedEvents = [...state.events];
    }

    const nameInput = document.getElementById('user-name-input');
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') goToStep(2);
    });

    const dateInput = document.getElementById('date-input');
    dateInput.min = new Date().toISOString().split('T')[0];

    randomizeButtonColors();
});

const buttonColors = [
    { gradient: 'linear-gradient(135deg, #8B5CF6, #A855F7)', glow: '0 8px 32px rgba(139, 92, 246, 0.4)' },
    { gradient: 'linear-gradient(135deg, #22D3EE, #06B6D4)', glow: '0 8px 32px rgba(34, 211, 238, 0.4)' },
    { gradient: 'linear-gradient(135deg, #F472B6, #EC4899)', glow: '0 8px 32px rgba(244, 114, 182, 0.4)' },
    { gradient: 'linear-gradient(135deg, #84CC16, #65A30D)', glow: '0 8px 32px rgba(132, 204, 22, 0.4)' },
    { gradient: 'linear-gradient(135deg, #FB923C, #F97316)', glow: '0 8px 32px rgba(251, 146, 60, 0.4)' },
];

function randomizeButtonColors() {
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(btn => {
        const color = buttonColors[Math.floor(Math.random() * buttonColors.length)];
        btn.style.background = color.gradient;
        btn.style.boxShadow = color.glow;
    });
}

function getDemoEvents() {
    return [
        { id: 'sushi', name: 'Sushi', emoji: '🍣', description: 'All You Can Eat', active: true },
        { id: 'goblin', name: 'Goblin Cafe', emoji: '🎲', description: 'Giochi da tavolo', active: true },
        { id: 'ramen', name: 'Ramen', emoji: '🍜', description: 'Noodles caldi', active: true }
    ];
}

function goToStep(step) {
    if (step === 2 && state.currentStep === 1) {
        const name = document.getElementById('user-name-input').value.trim();
        if (!name) {
            shakeElement(document.getElementById('user-name-input'));
            return;
        }
        state.userName = name;
        renderEvents();
    }

    if (step === 3 && state.currentStep === 2) {
        const allRefused = state.rankedEvents.length === 0 && state.refusedEvents.length > 0;
        if (allRefused) {
            document.getElementById('pooper-name').textContent = state.userName;
            step = 5;
            savePartyPooperData();
        }
    }

    updateProgressBar(step);

    const currentSection = document.getElementById(`step-${state.currentStep}`);
    const nextSection = document.getElementById(`step-${step}`);

    currentSection.classList.add('exiting');

    setTimeout(() => {
        currentSection.classList.add('hidden');
        currentSection.classList.remove('exiting');
        nextSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        state.currentStep = step;
    }, 300);
}

async function savePartyPooperData() {
    const timestamp = new Date().toISOString();

    try {
        await window.api.appendRow('Users', {
            name: state.userName,
            timestamp: timestamp
        });

        for (const event of state.refusedEvents) {
            await window.api.appendRow('Preferences', {
                user_name: state.userName,
                event_id: event.id,
                rank: 0,
                refused: true,
                timestamp: timestamp
            });
        }

        await window.api.appendRow('Availability', {
            user_name: state.userName,
            preferred_dates: '',
            unavailable_dates: '',
            notes: 'Guastafeste - ha rifiutato tutto!',
            timestamp: timestamp
        });
    } catch (error) {
        console.error('Save error:', error);
    }
}

function updateProgressBar(step) {
    const steps = document.querySelectorAll('.progress-step');
    const lines = document.querySelectorAll('.progress-line');

    steps.forEach((s, i) => {
        const stepNum = i + 1;
        s.classList.remove('active', 'completed');
        if (stepNum < step) s.classList.add('completed');
        if (stepNum === step) s.classList.add('active');
    });

    lines.forEach((l, i) => {
        l.classList.remove('completed');
        if (i + 1 < step) l.classList.add('completed');
    });
}

function renderEvents() {
    const container = document.getElementById('events-list');
    container.innerHTML = '';

    state.rankedEvents.forEach((event, index) => {
        const card = createEventCard(event, index + 1);
        container.appendChild(card);
    });

    setupDragAndDrop();
    renderRefusedEvents();
}

function createEventCard(event, rank) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.draggable = true;
    card.dataset.id = event.id;

    card.innerHTML = `
        <span class="event-rank">${rank}</span>
        <span class="event-emoji">${escapeHtml(event.emoji)}</span>
        <div class="event-info">
            <div class="event-name">${escapeHtml(event.name)}</div>
            <div class="event-description">${escapeHtml(event.description)}</div>
        </div>
        <span class="material-icons-round event-drag-handle">drag_indicator</span>
    `;

    return card;
}

function setupDragAndDrop() {
    const container = document.getElementById('events-list');
    const nopeZone = document.getElementById('nope-zone');
    let draggedEl = null;
    let touchStartY = 0;
    let touchOffsetY = 0;
    let placeholder = null;

    container.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('dragstart', (e) => {
            draggedEl = card;
            card.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });

        card.addEventListener('dragend', () => {
            if (draggedEl) {
                draggedEl.classList.remove('dragging');
                draggedEl = null;
            }
            nopeZone.classList.remove('dragover');
        });

        card.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (draggedEl && draggedEl !== card) {
                const rect = card.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;

                if (e.clientY < midY) {
                    container.insertBefore(draggedEl, card);
                } else {
                    container.insertBefore(draggedEl, card.nextSibling);
                }
                updateRankNumbers();
            }
        });

        card.addEventListener('touchstart', (e) => {
            draggedEl = card;
            const touch = e.touches[0];
            touchStartY = touch.clientY;
            const rect = card.getBoundingClientRect();
            touchOffsetY = touch.clientY - rect.top;

            card.classList.add('dragging');
            card.style.position = 'fixed';
            card.style.zIndex = '1000';
            card.style.width = rect.width + 'px';
            card.style.left = rect.left + 'px';
            card.style.top = rect.top + 'px';

            placeholder = document.createElement('div');
            placeholder.style.height = rect.height + 'px';
            placeholder.style.background = 'rgba(139, 92, 246, 0.1)';
            placeholder.style.borderRadius = 'var(--radius-lg)';
            placeholder.style.border = '2px dashed var(--electric-purple)';
            placeholder.style.marginBottom = '16px';
            card.parentNode.insertBefore(placeholder, card);
        }, { passive: true });

        card.addEventListener('touchmove', (e) => {
            if (!draggedEl) return;
            e.preventDefault();

            const touch = e.touches[0];
            const newTop = touch.clientY - touchOffsetY;
            draggedEl.style.top = newTop + 'px';

            const nopeRect = nopeZone.getBoundingClientRect();
            if (touch.clientY > nopeRect.top && touch.clientY < nopeRect.bottom) {
                nopeZone.classList.add('dragover');
            } else {
                nopeZone.classList.remove('dragover');
            }

            const cards = container.querySelectorAll('.event-card:not(.dragging)');
            cards.forEach(otherCard => {
                const rect = otherCard.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;

                if (touch.clientY < midY && touch.clientY > rect.top - 20) {
                    container.insertBefore(placeholder, otherCard);
                } else if (touch.clientY > midY && touch.clientY < rect.bottom + 20) {
                    container.insertBefore(placeholder, otherCard.nextSibling);
                }
            });
        }, { passive: false });

        card.addEventListener('touchend', (e) => {
            if (!draggedEl) return;

            const touch = e.changedTouches[0];
            const nopeRect = nopeZone.getBoundingClientRect();

            if (touch.clientY > nopeRect.top && touch.clientY < nopeRect.bottom) {
                const eventId = draggedEl.dataset.id;
                const eventIndex = state.rankedEvents.findIndex(ev => ev.id === eventId);
                if (eventIndex > -1) {
                    const [event] = state.rankedEvents.splice(eventIndex, 1);
                    state.refusedEvents.push(event);
                }
                draggedEl.remove();
                renderRefusedEvents();
                nopeZone.style.transform = 'scale(1.05)';
                setTimeout(() => nopeZone.style.transform = '', 200);
            } else {
                if (placeholder && placeholder.parentNode) {
                    placeholder.parentNode.insertBefore(draggedEl, placeholder);
                }
            }

            draggedEl.classList.remove('dragging');
            draggedEl.style.position = '';
            draggedEl.style.zIndex = '';
            draggedEl.style.width = '';
            draggedEl.style.left = '';
            draggedEl.style.top = '';

            if (placeholder && placeholder.parentNode) {
                placeholder.parentNode.removeChild(placeholder);
            }
            placeholder = null;

            nopeZone.classList.remove('dragover');
            draggedEl = null;
            updateRankNumbers();
        });
    });

    nopeZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        nopeZone.classList.add('dragover');
    });

    nopeZone.addEventListener('dragleave', () => {
        nopeZone.classList.remove('dragover');
    });

    nopeZone.addEventListener('drop', (e) => {
        e.preventDefault();
        nopeZone.classList.remove('dragover');

        if (draggedEl) {
            const eventId = draggedEl.dataset.id;
            const eventIndex = state.rankedEvents.findIndex(ev => ev.id === eventId);
            if (eventIndex > -1) {
                const [event] = state.rankedEvents.splice(eventIndex, 1);
                state.refusedEvents.push(event);
            }

            draggedEl.remove();
            renderRefusedEvents();
            updateRankNumbers();

            nopeZone.style.transform = 'scale(1.05)';
            setTimeout(() => nopeZone.style.transform = '', 200);
        }
    });
}

function updateRankNumbers() {
    const cards = document.querySelectorAll('#events-list .event-card');
    cards.forEach((card, index) => {
        card.querySelector('.event-rank').textContent = index + 1;
    });

    state.rankedEvents = Array.from(cards).map(card => {
        return state.events.find(e => e.id === card.dataset.id);
    });
}

function renderRefusedEvents() {
    const container = document.getElementById('refused-list');
    container.innerHTML = '';

    state.refusedEvents.forEach(event => {
        const chip = document.createElement('div');
        chip.className = 'refused-chip';
        chip.innerHTML = `
            ${escapeHtml(event.emoji)} ${escapeHtml(event.name)}
            <span class="material-icons-round" style="font-size: 16px;">close</span>
        `;
        chip.onclick = () => restoreEvent(event.id);
        container.appendChild(chip);
    });
}

function restoreEvent(eventId) {
    const index = state.refusedEvents.findIndex(e => e.id === eventId);
    if (index > -1) {
        const [event] = state.refusedEvents.splice(index, 1);
        state.rankedEvents.push(event);
        renderEvents();
    }
}

function addDate(type) {
    state.datePickerType = type;
    document.getElementById('date-modal').classList.remove('hidden');
    document.getElementById('date-input').value = '';
    document.getElementById('date-input').focus();
}

function closeDateModal() {
    document.getElementById('date-modal').classList.add('hidden');
}

function confirmDate() {
    const dateInput = document.getElementById('date-input');
    const date = dateInput.value;

    if (!date) {
        shakeElement(dateInput);
        return;
    }

    if (state.datePickerType === 'preferred') {
        if (!state.preferredDates.includes(date)) {
            state.preferredDates.push(date);
            renderDateChips('preferred');
        }
    } else {
        if (!state.unavailableDates.includes(date)) {
            state.unavailableDates.push(date);
            renderDateChips('unavailable');
        }
    }

    closeDateModal();
}

function renderDateChips(type) {
    const containerId = type === 'preferred' ? 'preferred-dates' : 'unavailable-dates';
    const dates = type === 'preferred' ? state.preferredDates : state.unavailableDates;
    const container = document.getElementById(containerId);

    Array.from(container.querySelectorAll('.date-chip:not(.add-date)')).forEach(c => c.remove());

    const addBtn = container.querySelector('.add-date');
    dates.forEach(date => {
        const chip = document.createElement('div');
        chip.className = `date-chip selected-${type}`;
        chip.innerHTML = `
            ${formatDate(date)}
            <span class="material-icons-round" style="font-size: 16px; cursor: pointer;" onclick="removeDate('${type}', '${date}')">close</span>
        `;
        container.insertBefore(chip, addBtn);
    });
}

function removeDate(type, date) {
    event.stopPropagation();
    if (type === 'preferred') {
        state.preferredDates = state.preferredDates.filter(d => d !== date);
        renderDateChips('preferred');
    } else {
        state.unavailableDates = state.unavailableDates.filter(d => d !== date);
        renderDateChips('unavailable');
    }
}

function formatDate(dateStr) {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateStr).toLocaleDateString('it-IT', options);
}

async function submitAll() {
    const btn = document.getElementById('btn-submit');
    btn.disabled = true;
    btn.innerHTML = '<span class="material-icons-round">hourglass_empty</span> Salvando...';

    state.notes = document.getElementById('availability-notes').value.trim();

    startComicLoading();
    const minAnimationTime = new Promise(resolve => setTimeout(resolve, 5000));
    const timestamp = new Date().toISOString();
    const allRefused = state.rankedEvents.length === 0 && state.refusedEvents.length > 0;

    try {
        await window.api.appendRow('Users', {
            name: state.userName,
            timestamp: timestamp
        });

        for (let i = 0; i < state.rankedEvents.length; i++) {
            const event = state.rankedEvents[i];
            await window.api.appendRow('Preferences', {
                user_name: state.userName,
                event_id: event.id,
                rank: i + 1,
                refused: false,
                timestamp: timestamp
            });
        }

        for (const event of state.refusedEvents) {
            await window.api.appendRow('Preferences', {
                user_name: state.userName,
                event_id: event.id,
                rank: 0,
                refused: true,
                timestamp: timestamp
            });
        }

        await window.api.appendRow('Availability', {
            user_name: state.userName,
            preferred_dates: state.preferredDates.join(','),
            unavailable_dates: state.unavailableDates.join(','),
            notes: state.notes,
            timestamp: timestamp
        });

        await minAnimationTime;
        await stopComicLoading();

        if (allRefused) {
            document.getElementById('pooper-name').textContent = state.userName;
            goToStep(5);
        } else {
            document.getElementById('success-name').textContent = state.userName;
            goToStep(4);
            launchConfetti();
        }

    } catch (error) {
        console.error('Save error:', error);
        await minAnimationTime;
        await stopComicLoading();
        btn.disabled = false;
        btn.innerHTML = 'Snap! Conferma 💫';
        alert('Ops! Qualcosa è andato storto. Riprova!');
    }
}

function launchConfetti() {
    const container = document.getElementById('confetti');
    const colors = ['#8B5CF6', '#22D3EE', '#FACC15', '#F472B6', '#84CC16'];
    const emojis = ['🎉', '✨', '🎊', '💫', '🌟'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const isEmoji = Math.random() > 0.7;

            confetti.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: -20px;
                font-size: ${isEmoji ? Math.random() * 20 + 16 : 0}px;
                width: ${isEmoji ? 'auto' : Math.random() * 10 + 5 + 'px'};
                height: ${isEmoji ? 'auto' : Math.random() * 10 + 5 + 'px'};
                background: ${isEmoji ? 'transparent' : colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                animation: confettiFall ${Math.random() * 2 + 2}s ease-out forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            confetti.textContent = isEmoji ? emojis[Math.floor(Math.random() * emojis.length)] : '';

            container.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    
    .modal {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    
    .modal-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
    }
    
    .modal-content {
        position: relative;
        background: var(--bg-dark);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-lg);
        padding: 24px;
        width: 90%;
        max-width: 320px;
        box-sizing: border-box;
        overflow: hidden;
        animation: modalIn 0.3s var(--spring-bounce);
    }
    
    .modal-content .input-field {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
    }
    
    @keyframes modalIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    .modal-content h3 {
        margin-bottom: 16px;
        text-align: center;
    }
    
    .modal-actions {
        display: flex;
        gap: 12px;
        margin-top: 20px;
    }
    
    .modal-actions .btn {
        flex: 1;
        padding: 14px;
        font-size: 0.95rem;
    }
    
    .success-buttons {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        max-width: 280px;
    }
    
    .success-buttons .btn {
        text-decoration: none;
    }
    
    .qr-modal-content {
        text-align: center;
    }
    
    .qr-code-wrapper {
        background: white;
        padding: 16px;
        border-radius: var(--radius-md);
        display: inline-block;
        margin: 16px 0;
    }
    
    .qr-code-img {
        display: block;
        width: 200px;
        height: 200px;
    }
    
    .qr-url {
        font-family: monospace;
        font-size: 0.9rem;
        color: var(--cyan-pop);
        margin-bottom: 16px;
        padding: 8px 16px;
        background: var(--bg-card);
        border-radius: var(--radius-sm);
        display: inline-block;
    }
    
    .comic-loading {
        position: fixed;
        inset: 0;
        background: rgba(10, 10, 15, 0.95);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    }
    
    .comic-content {
        text-align: center;
        padding: 24px;
    }
    
    .comic-bubble {
        background: var(--bg-card);
        border: 3px solid var(--electric-purple);
        border-radius: var(--radius-lg);
        padding: 24px 32px;
        margin: 16px 0;
        position: relative;
        animation: bubbleIn 0.5s var(--spring-bounce);
        box-shadow: var(--shadow-glow-purple);
    }
    
    .comic-bubble::after {
        content: '';
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        border: 10px solid transparent;
        border-top-color: var(--electric-purple);
    }
    
    .comic-emoji {
        font-size: 3rem;
        display: block;
        margin-bottom: 12px;
        animation: emojiWiggle 0.5s ease-in-out infinite alternate;
    }
    
    @keyframes emojiWiggle {
        from { transform: rotate(-5deg); }
        to { transform: rotate(5deg); }
    }
    
    @keyframes bubbleIn {
        from { transform: scale(0); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    .comic-bubble p {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-primary);
    }
`;
document.head.appendChild(style);

function shakeElement(el) {
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 500);
}

function resetApp() {
    state.currentStep = 1;
    state.userName = '';
    state.rankedEvents = [...state.events.filter(e => e.active !== false)];
    state.refusedEvents = [];
    state.preferredDates = [];
    state.unavailableDates = [];
    state.notes = '';

    document.getElementById('user-name-input').value = '';
    document.getElementById('availability-notes').value = '';
    renderDateChips('preferred');
    renderDateChips('unavailable');

    const btn = document.getElementById('btn-submit');
    btn.disabled = false;
    btn.innerHTML = 'Snap! Conferma 💫';

    document.querySelectorAll('.step-container').forEach(s => s.classList.add('hidden'));
    document.getElementById('step-1').classList.remove('hidden');
    updateProgressBar(1);
    state.currentStep = 1;
}

function showQRCode() {
    document.getElementById('qr-modal').classList.remove('hidden');
}

function hideQRCode() {
    document.getElementById('qr-modal').classList.add('hidden');
}

let comicLoadingInterval = null;
let currentBubbleIndex = 0;
let comicLoadingTimeout = null;

function startComicLoading() {
    if (comicLoadingInterval) {
        clearInterval(comicLoadingInterval);
        comicLoadingInterval = null;
    }
    if (comicLoadingTimeout) {
        clearTimeout(comicLoadingTimeout);
        comicLoadingTimeout = null;
    }

    const overlay = document.getElementById('comic-loading');
    const bubbles = [
        document.getElementById('comic-bubble-1'),
        document.getElementById('comic-bubble-2'),
        document.getElementById('comic-bubble-3'),
        document.getElementById('comic-bubble-4')
    ];
    const finalBubble = document.getElementById('comic-bubble-5');

    currentBubbleIndex = 0;
    bubbles.forEach((b, i) => {
        if (b) {
            if (i === 0) b.classList.remove('hidden');
            else b.classList.add('hidden');
        }
    });
    if (finalBubble) finalBubble.classList.add('hidden');

    overlay.classList.remove('hidden');

    comicLoadingInterval = setInterval(() => {
        if (bubbles[currentBubbleIndex]) {
            bubbles[currentBubbleIndex].classList.add('hidden');
        }
        currentBubbleIndex = (currentBubbleIndex + 1) % 4;
        if (bubbles[currentBubbleIndex]) {
            bubbles[currentBubbleIndex].classList.remove('hidden');
        }
    }, 1200);

    comicLoadingTimeout = setTimeout(() => {
        stopComicLoading();
    }, 30000);
}

function stopComicLoading() {
    return new Promise((resolve) => {
        const overlay = document.getElementById('comic-loading');
        const bubbles = [
            document.getElementById('comic-bubble-1'),
            document.getElementById('comic-bubble-2'),
            document.getElementById('comic-bubble-3'),
            document.getElementById('comic-bubble-4')
        ];
        const finalBubble = document.getElementById('comic-bubble-5');

        if (comicLoadingInterval) {
            clearInterval(comicLoadingInterval);
            comicLoadingInterval = null;
        }

        if (comicLoadingTimeout) {
            clearTimeout(comicLoadingTimeout);
            comicLoadingTimeout = null;
        }

        bubbles.forEach(b => {
            if (b) b.classList.add('hidden');
        });

        if (finalBubble) finalBubble.classList.remove('hidden');

        setTimeout(() => {
            overlay.classList.add('hidden');
            resolve();
        }, 1200);
    });
}
