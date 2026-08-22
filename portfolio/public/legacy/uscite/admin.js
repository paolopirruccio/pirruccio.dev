/**
 * ChiDoQuà Admin Dashboard Logic 📊
 */

// ── Auth Gate ──
const ADMIN_PASSWORD = 'chidoqua2026'; // Change this to your desired password

function checkAuth() {
    if (sessionStorage.getItem('admin_authed') === 'true') {
        unlockDashboard();
        return;
    }

    const submitBtn = document.getElementById('auth-submit');
    const passwordInput = document.getElementById('auth-password');

    const tryAuth = () => {
        if (passwordInput.value === ADMIN_PASSWORD) {
            sessionStorage.setItem('admin_authed', 'true');
            unlockDashboard();
        } else {
            document.getElementById('auth-error').style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
        }
    };

    submitBtn.addEventListener('click', tryAuth);
    passwordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') tryAuth();
    });
    passwordInput.focus();
}

function unlockDashboard() {
    document.getElementById('auth-overlay').style.display = 'none';
    document.querySelector('.admin-container').style.display = '';
    loadAllData();
}

// ── HTML Escape Utility ──
function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

const adminState = {
    events: [],
    users: [],
    preferences: [],
    availability: [],
    eventScores: {}   // event_id -> { score, votes, topPick }
};


document.addEventListener('DOMContentLoaded', () => {
    console.log('📊 ChiDoQuà Admin starting...');
    checkAuth();
});

async function loadAllData() {
    try {
        const [events, users, preferences, availability] = await Promise.all([
            window.api.readSheet('Events'),
            window.api.readSheet('Users'),
            window.api.readSheet('Preferences'),
            window.api.readSheet('Availability')
        ]);

        adminState.events = events;
        adminState.users = users;
        adminState.preferences = preferences;
        adminState.availability = availability;

        console.log('✅ Data loaded:', { events, users, preferences, availability });

        calculateEventScores();
        renderStats();
        renderBestMatch();
        renderEventsRanking();
        renderParticipants();
        renderAvailability();
        renderUnavailability();
        renderNotes();

    } catch (error) {
        console.error('Failed to load data:', error);
        showError();
    }
}

function refreshData() {
    const icon = document.getElementById('refresh-icon');
    icon.classList.add('spin');

    localStorage.removeItem('sheet_Events');
    localStorage.removeItem('sheet_Users');
    localStorage.removeItem('sheet_Preferences');
    localStorage.removeItem('sheet_Availability');

    loadAllData().finally(() => {
        setTimeout(() => icon.classList.remove('spin'), 500);
    });
}


function calculateEventScores() {
    const scores = {};
    const numUsers = adminState.users.length;

    adminState.events.forEach(event => {
        scores[event.id] = {
            score: 0,
            votes: 0,
            topPicks: 0,
            refused: 0
        };
    });

    adminState.preferences.forEach(pref => {
        if (!scores[pref.event_id]) return;

        if (pref.refused === true || pref.refused === 'true' || pref.rank === 0) {
            scores[pref.event_id].refused++;
        } else {
            const rank = parseInt(pref.rank) || 0;
            if (rank > 0) {
                const points = Math.max(4 - rank, 1);
                scores[pref.event_id].score += points;
                scores[pref.event_id].votes++;

                if (rank === 1) {
                    scores[pref.event_id].topPicks++;
                }
            }
        }
    });

    adminState.eventScores = scores;
}

function getBestMatch() {
    let bestEvent = null;
    let highestScore = -1;

    for (const [eventId, data] of Object.entries(adminState.eventScores)) {
        if (data.score > highestScore) {
            highestScore = data.score;
            bestEvent = adminState.events.find(e => e.id === eventId);
        }
    }

    const dateCounts = {};
    adminState.availability.forEach(av => {
        const rawDates = av.preferred_dates || '';

        const isoPattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?/g;
        const isoMatches = rawDates.match(isoPattern) || [];
        const dates = [];

        isoMatches.forEach(isoStr => {
            const date = new Date(isoStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            dates.push(`${year}-${month}-${day}`);
        });

        const cleanedStr = rawDates.replace(isoPattern, '');
        const simpleDatePattern = /\d{4}-\d{1,2}-\d{1,2}/g;
        const simpleMatches = cleanedStr.match(simpleDatePattern) || [];
        simpleMatches.forEach(dateStr => {
            const parts = dateStr.split('-');
            const normalized = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
            if (!dates.includes(normalized)) {
                dates.push(normalized);
            }
        });

        dates.forEach(date => {
            dateCounts[date] = (dateCounts[date] || 0) + 1;
        });
    });

    let bestDate = null;
    let highestDateCount = 0;
    for (const [date, count] of Object.entries(dateCounts)) {
        if (count > highestDateCount) {
            highestDateCount = count;
            bestDate = date;
        }
    }

    return { event: bestEvent, date: bestDate, score: highestScore, dateCount: highestDateCount };
}


function renderStats() {
    document.getElementById('stat-users').textContent = adminState.users.length;
    document.getElementById('stat-events').textContent = adminState.events.filter(e => e.active !== false && e.active !== 'false').length;

    const best = getBestMatch();
    document.getElementById('stat-dates').textContent = best.date
        ? formatDateShort(best.date)
        : '--';
}

function renderBestMatch() {
    const best = getBestMatch();

    if (best.event) {
        document.getElementById('match-emoji').textContent = best.event.emoji;
        document.getElementById('match-name').textContent = best.event.name;
        document.getElementById('match-score').textContent = `${best.score} punti totali • ${adminState.eventScores[best.event.id]?.topPicks || 0} primi posti`;
    } else {
        document.getElementById('match-name').textContent = 'Nessun dato';
        document.getElementById('match-score').textContent = 'Aspettando risposte...';
    }

    const dateEl = document.getElementById('match-date');
    if (best.date) {
        dateEl.querySelector('span:last-child').textContent = `${formatDate(best.date)} (${best.dateCount} disponibili)`;
    } else {
        dateEl.querySelector('span:last-child').textContent = 'Nessuna data ancora';
    }
}

function renderEventsRanking() {
    const container = document.getElementById('events-ranking');

    const sortedEvents = [...adminState.events]
        .filter(e => e.active !== false && e.active !== 'false')
        .sort((a, b) => {
            const scoreA = adminState.eventScores[a.id]?.score || 0;
            const scoreB = adminState.eventScores[b.id]?.score || 0;
            return scoreB - scoreA;
        });

    if (sortedEvents.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="material-icons-round">celebration</span>
                <p>Nessun evento configurato</p>
            </div>
        `;
        return;
    }

    container.innerHTML = sortedEvents.map((event, index) => {
        const data = adminState.eventScores[event.id] || { score: 0, votes: 0, topPicks: 0, refused: 0 };
        const positionClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : 'default';

        return `
            <div class="ranking-item">
                <div class="ranking-position ${positionClass}">${index + 1}</div>
                <span class="ranking-emoji">${escapeHtml(event.emoji)}</span>
                <div class="ranking-info">
                    <div class="ranking-name">${escapeHtml(event.name)}</div>
                    <div class="ranking-desc">${data.topPicks} primi posti • ${data.refused} rifiuti</div>
                </div>
                <div class="ranking-score">
                    <span class="ranking-points">${data.score}</span>
                    <span class="ranking-votes">${data.votes} voti</span>
                </div>
            </div>
        `;
    }).join('');
}

function renderParticipants() {
    const container = document.getElementById('participants-list');

    if (adminState.users.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="material-icons-round">person_off</span>
                <p>Nessun partecipante ancora</p>
            </div>
        `;
        return;
    }

    container.innerHTML = adminState.users.map(user => {
        const userName = escapeHtml((user.name || '').trim());
        const rawUserName = (user.name || '').trim();
        const initials = getInitials(rawUserName);

        const userPrefs = adminState.preferences
            .filter(p => {
                const prefUserName = (p.user_name || '').trim();
                return prefUserName === rawUserName &&
                    p.refused !== true &&
                    p.refused !== 'true' &&
                    parseInt(p.rank) > 0;
            })
            .sort((a, b) => parseInt(a.rank) - parseInt(b.rank))
            .slice(0, 3);

        const prefEmojis = userPrefs.map(p => {
            const eventId = String(p.event_id || '').trim();
            const event = adminState.events.find(e => String(e.id || '').trim() === eventId);
            if (event && event.emoji) {
                return `<span class="pref-emoji">${escapeHtml(event.emoji)}</span>`;
            }
            return '';
        }).filter(e => e).join('');

        const prefNames = userPrefs.map(p => {
            const eventId = String(p.event_id || '').trim();
            const e = adminState.events.find(ev => String(ev.id || '').trim() === eventId);
            return e?.name || '';
        }).filter(n => n).join(' > ');

        return `
            <div class="participant-chip" title="Preferenze: ${escapeHtml(prefNames)}">
                <div class="participant-avatar">${escapeHtml(initials)}</div>
                <span>${userName}</span>
                <div class="participant-prefs">${prefEmojis || '<span style="opacity:0.5">-</span>'}</div>
            </div>
        `;
    }).join('');
}

function renderAvailability() {
    const container = document.getElementById('availability-grid');

    function normalizeDateStr(str) {
        if (!str) return [];

        const results = [];

        const isoPattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?/g;
        const isoMatches = str.match(isoPattern) || [];
        isoMatches.forEach(isoStr => {
            const date = new Date(isoStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            results.push(`${year}-${month}-${day}`);
        });

        const cleanedStr = str.replace(isoPattern, '');
        const simpleDatePattern = /\d{4}-\d{1,2}-\d{1,2}/g;
        const simpleMatches = cleanedStr.match(simpleDatePattern) || [];
        simpleMatches.forEach(dateStr => {
            const parts = dateStr.split('-');
            const normalized = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
            if (!results.includes(normalized)) {
                results.push(normalized);
            }
        });

        return results;
    }

    const dateCounts = {};
    const dateUsers = {}; // date -> [users]

    adminState.availability.forEach(av => {
        const rawDates = av.preferred_dates || '';
        const rawUnavailableDates = av.unavailable_dates || '';

        const preferredDates = normalizeDateStr(rawDates);
        const unavailableDates = normalizeDateStr(rawUnavailableDates);
        const unavailableSet = new Set(unavailableDates);

        preferredDates.forEach(d => {
            if (unavailableSet.has(d)) {
                return;
            }

            dateCounts[d] = (dateCounts[d] || 0) + 1;
            if (!dateUsers[d]) dateUsers[d] = [];
            const userName = (av.user_name || '').trim();
            if (userName && !dateUsers[d].includes(userName)) {
                dateUsers[d].push(userName);
            }
        });
    });

    if (Object.keys(dateCounts).length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="material-icons-round">event_busy</span>
                <p>Nessuna disponibilità inserita</p>
            </div>
        `;
        return;
    }

    const sortedDates = Object.entries(dateCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10); // Show top 10

    const maxCount = adminState.users.length || 1;

    window.dateUsersData = dateUsers;

    container.innerHTML = sortedDates.map(([date, count]) => {
        const users = dateUsers[date] || [];
        const percentage = Math.round((count / maxCount) * 100);

        const avatarsHtml = users.slice(0, 4).map(name =>
            `<div class="date-avatar">${escapeHtml(getInitials(name))}</div>`
        ).join('');

        return `
            <div class="date-row">
                <div class="date-info">
                    <div class="date-day">${formatDateShort(date)}</div>
                    <div class="date-full">${formatDate(date)}</div>
                </div>
                <div class="date-bar-container">
                    <div class="date-bar">
                        <div class="date-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div class="date-count">${count}/${maxCount}</div>
                </div>
                <div class="date-avatars">${avatarsHtml}</div>
                <button class="btn-info" data-date="${escapeHtml(date)}" onclick="showDateUsers(this.dataset.date)" title="Vedi chi">
                    <span class="material-icons-round">info</span>
                </button>
            </div>
        `;
    }).join('');
}

function renderUnavailability() {
    const container = document.getElementById('unavailability-grid');

    function normalizeDateStr(str) {
        if (!str) return [];

        const results = [];

        const isoPattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?/g;
        const isoMatches = str.match(isoPattern) || [];
        isoMatches.forEach(isoStr => {
            const date = new Date(isoStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            results.push(`${year}-${month}-${day}`);
        });

        const cleanedStr = str.replace(isoPattern, '');
        const simpleDatePattern = /\d{4}-\d{1,2}-\d{1,2}/g;
        const simpleMatches = cleanedStr.match(simpleDatePattern) || [];
        simpleMatches.forEach(dateStr => {
            const parts = dateStr.split('-');
            const normalized = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
            if (!results.includes(normalized)) {
                results.push(normalized);
            }
        });

        return results;
    }

    const dateCounts = {};
    const dateUsers = {}; // date -> [users]

    adminState.availability.forEach(av => {
        const rawUnavailableDates = av.unavailable_dates || '';
        const unavailableDates = normalizeDateStr(rawUnavailableDates);

        unavailableDates.forEach(d => {
            dateCounts[d] = (dateCounts[d] || 0) + 1;
            if (!dateUsers[d]) dateUsers[d] = [];
            const userName = (av.user_name || '').trim();
            if (userName && !dateUsers[d].includes(userName)) {
                dateUsers[d].push(userName);
            }
        });
    });

    if (Object.keys(dateCounts).length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="material-icons-round">event_available</span>
                <p>Nessuna non disponibilità inserita</p>
            </div>
        `;
        return;
    }

    const sortedDates = Object.entries(dateCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10); // Show top 10

    const maxCount = adminState.users.length || 1;

    window.unavailableDateUsersData = dateUsers;

    container.innerHTML = sortedDates.map(([date, count]) => {
        const users = dateUsers[date] || [];
        const percentage = Math.round((count / maxCount) * 100);

        const avatarsHtml = users.slice(0, 4).map(name =>
            `<div class="date-avatar unavailable">${escapeHtml(getInitials(name))}</div>`
        ).join('');

        return `
            <div class="date-row unavailable">
                <div class="date-info">
                    <div class="date-day">${formatDateShort(date)}</div>
                    <div class="date-full">${formatDate(date)}</div>
                </div>
                <div class="date-bar-container">
                    <div class="date-bar unavailable">
                        <div class="date-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div class="date-count">${count}/${maxCount}</div>
                </div>
                <div class="date-avatars">${avatarsHtml}</div>
                <button class="btn-info unavailable" data-date="${escapeHtml(date)}" onclick="showUnavailableDateUsers(this.dataset.date)" title="Vedi chi">
                    <span class="material-icons-round">info</span>
                </button>
            </div>
        `;
    }).join('');
}

function showError() {
    const sections = ['events-ranking', 'participants-list', 'availability-grid'];
    sections.forEach(id => {
        document.getElementById(id).innerHTML = `
            <div class="empty-state">
                <span class="material-icons-round">error_outline</span>
                <p>Errore nel caricamento</p>
            </div>
        `;
    });
}


function getInitials(name) {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function formatDate(dateStr) {
    try {
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day, 12, 0, 0);
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return date.toLocaleDateString('it-IT', options);
    } catch {
        return dateStr;
    }
}

function formatDateShort(dateStr) {
    try {
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day, 12, 0, 0);
        const options = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('it-IT', options);
    } catch {
        return dateStr;
    }
}

function renderNotes() {
    const container = document.getElementById('notes-list');

    const notesWithContent = adminState.availability.filter(av =>
        av.notes && av.notes.trim() && av.notes.trim() !== ''
    );

    if (notesWithContent.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="material-icons-round">speaker_notes_off</span>
                <p>Nessuna nota inserita</p>
            </div>
        `;
        return;
    }

    container.innerHTML = notesWithContent.map(av => {
        const userName = (av.user_name || '').trim();
        const initials = getInitials(userName);
        return `
            <div class="note-item">
                <div class="note-avatar">${escapeHtml(initials)}</div>
                <div class="note-content">
                    <div class="note-author">${escapeHtml(userName)}</div>
                    <div class="note-text">${escapeHtml(av.notes)}</div>
                </div>
            </div>
        `;
    }).join('');
}

function showDateUsers(date) {
    const users = window.dateUsersData?.[date] || [];

    document.getElementById('date-modal-title').textContent = `📅 ${formatDate(date)}`;

    const usersHtml = users.length > 0
        ? users.map(name => `
            <div class="date-modal-user">
                <div class="date-modal-avatar">${escapeHtml(getInitials(name))}</div>
                <span>${escapeHtml(name)}</span>
            </div>
        `).join('')
        : '<p class="no-users">Nessun partecipante</p>';

    document.getElementById('date-modal-users').innerHTML = `
        <p class="date-modal-count">${users.length} disponibil${users.length === 1 ? 'e' : 'i'}</p>
        ${usersHtml}
    `;

    document.getElementById('date-modal').classList.remove('hidden');
}

function closeDateModal() {
    document.getElementById('date-modal').classList.add('hidden');
}

function showUnavailableDateUsers(date) {
    const users = window.unavailableDateUsersData?.[date] || [];

    document.getElementById('date-modal-title').textContent = `🚫 ${formatDate(date)}`;

    const usersHtml = users.length > 0
        ? users.map(name => `
            <div class="date-modal-user unavailable">
                <div class="date-modal-avatar unavailable">${escapeHtml(getInitials(name))}</div>
                <span>${escapeHtml(name)}</span>
            </div>
        `).join('')
        : '<p class="no-users">Nessun partecipante</p>';

    document.getElementById('date-modal-users').innerHTML = `
        <p class="date-modal-count unavailable">${users.length} non disponibil${users.length === 1 ? 'e' : 'i'}</p>
        ${usersHtml}
    `;

    document.getElementById('date-modal').classList.remove('hidden');
}
