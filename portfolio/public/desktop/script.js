
let windowCount = 0;
let activeWindow = null;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };
let mobileAppOpen = false;

const isMobile = () => window.innerWidth <= 768;


function openWindow(windowId) {
    if (isMobile()) return;

    const windowEl = document.getElementById(windowId);
    if (windowEl.style.display === 'block') {
        bringToFront(windowEl);
        return;
    }

    const x = Math.max(50, Math.random() * (window.innerWidth - 600));
    const y = Math.max(50, Math.random() * (window.innerHeight - 500));

    let width = 500;
    let height = 400;

    if (windowId === 'pomodoro') { width = 400; height = 450; }
    else if (windowId === 'calculator') { width = 320; height = 480; }
    else if (windowId === 'notes') { width = 400; height = 500; }
    else if (windowId === 'drawings') { width = 600; height = 500; }
    else if (windowId === 'stopwatch') { width = 350; height = 450; }
    else if (windowId === 'timer') { width = 350; height = 400; }
    else if (windowId === 'timer') { width = 350; height = 400; }
    else if (windowId === 'spotify') { width = 400; height = 500; }
    else if (windowId === 'wallpapers') { width = 600; height = 500; }

    windowEl.style.left = x + 'px';
    windowEl.style.top = y + 'px';
    windowEl.style.width = width + 'px';
    windowEl.style.height = height + 'px';
    windowEl.style.display = 'block';
    windowEl.classList.add('opening');

    setTimeout(() => {
        windowEl.classList.remove('opening');
        if (windowId === 'drawings') initCanvas('drawing-canvas');
    }, 300);

    bringToFront(windowEl);
    windowCount++;
}

function closeWindow(windowId) {
    const windowEl = document.getElementById(windowId);
    windowEl.style.display = 'none';
    windowCount--;
}

function maximizeWindow(windowId) {
    const windowEl = document.getElementById(windowId);
    const isMaximized = windowEl.dataset.maximized === 'true';

    if (isMaximized) {
        windowEl.style.width = windowEl.dataset.originalWidth || '500px';
        windowEl.style.height = windowEl.dataset.originalHeight || '400px';
        windowEl.style.left = windowEl.dataset.originalLeft || '50px';
        windowEl.style.top = windowEl.dataset.originalTop || '50px';
        windowEl.dataset.maximized = 'false';
    } else {
        windowEl.dataset.originalWidth = windowEl.style.width;
        windowEl.dataset.originalHeight = windowEl.style.height;
        windowEl.dataset.originalLeft = windowEl.style.left;
        windowEl.dataset.originalTop = windowEl.style.top;

        windowEl.style.width = '100vw';
        windowEl.style.height = '100vh';
        windowEl.style.left = '0px';
        windowEl.style.top = '0px';
        windowEl.dataset.maximized = 'true';
    }

    bringToFront(windowEl);
}

function bringToFront(windowEl) {
    document.querySelectorAll('.window').forEach(w => {
        w.classList.remove('active');
    });

    windowEl.classList.add('active');
    activeWindow = windowEl;
}


function openMobileApp(appId) {
    if (!isMobile()) return;

    const app = document.getElementById('mobile-' + appId);
    const springboard = document.querySelector('.springboard');

    springboard.style.display = 'none';
    app.style.display = 'block';
    app.classList.add('opening');
    mobileAppOpen = true;

    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        app.classList.remove('opening');
        if (appId === 'drawings') initCanvas('mobile-drawing-canvas');
    }, 300);
}

function closeMobileApp(appId) {
    const app = document.getElementById('mobile-' + appId);
    const springboard = document.querySelector('.springboard');

    app.classList.add('closing');

    setTimeout(() => {
        app.style.display = 'none';
        app.classList.remove('closing');
        springboard.style.display = 'block';
        mobileAppOpen = false;
        document.body.style.overflow = '';
    }, 300);
}


document.addEventListener('mousedown', (e) => {
    if (isMobile()) return;

    const windowHeader = e.target.closest('.window-header');
    if (windowHeader && !e.target.closest('.window-controls')) {
        const windowEl = windowHeader.closest('.window');
        bringToFront(windowEl);

        isDragging = true;
        activeWindow = windowEl;
        const rect = windowEl.getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;

        document.addEventListener('mousemove', dragWindow);
        document.addEventListener('mouseup', stopDragging);
        e.preventDefault();
    }
});

function dragWindow(e) {
    if (!isDragging || !activeWindow) return;

    const x = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 100));
    const y = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 40));

    activeWindow.style.left = x + 'px';
    activeWindow.style.top = y + 'px';
}

function stopDragging() {
    isDragging = false;
    document.removeEventListener('mousemove', dragWindow);
    document.removeEventListener('mouseup', stopDragging);
}


document.addEventListener('click', (e) => {
    if (isMobile()) return;

    if (!e.target.closest('.window') &&
        !e.target.closest('.dock-icon') &&
        !e.target.closest('.credits-button') &&
        !e.target.closest('.contact-button')) {
        document.querySelectorAll('.window').forEach(w => {
            w.classList.remove('active');
        });
        activeWindow = null;
    }
});

window.addEventListener("resize", () => {
    if (isMobile()) {
        document.querySelectorAll('.window').forEach(window => {
            window.style.display = 'none';
        });

        if (!mobileAppOpen) {
            document.querySelectorAll('.mobile-app').forEach(app => {
                app.style.display = 'none';
            });
            document.querySelector('.springboard').style.display = 'block';
        }
        windowCount = 0;
    } else {
        document.querySelectorAll('.mobile-app').forEach(app => {
            app.style.display = 'none';
        });
        document.querySelector('.springboard').style.display = 'none';
    }
});

function openContactMail() {
    window.location.href = 'mailto:pirruccio.01@gmail.com';
}


let pomodoroInterval;
let pomodoroTime = 25 * 60;
let pomodoroMode = 'focus'; // focus, short, long

function updatePomodoroDisplay(isMobile = false) {
    const minutes = Math.floor(pomodoroTime / 60);
    const seconds = pomodoroTime % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const id = isMobile ? 'mobile-pomodoro-display' : 'pomodoro-display';
    const el = document.getElementById(id);
    if (el) el.textContent = display;

    const otherId = isMobile ? 'pomodoro-display' : 'mobile-pomodoro-display';
    const otherEl = document.getElementById(otherId);
    if (otherEl) otherEl.textContent = display;
}

function startPomodoro(isMobile = false) {
    if (pomodoroInterval) return;
    pomodoroInterval = setInterval(() => {
        if (pomodoroTime > 0) {
            pomodoroTime--;
            updatePomodoroDisplay(isMobile);
        } else {
            clearInterval(pomodoroInterval);
            pomodoroInterval = null;
            alert('Pomodoro finished!');
        }
    }, 1000);
}

function pausePomodoro(isMobile = false) {
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
}

function resetPomodoro(isMobile = false) {
    pausePomodoro();
    if (pomodoroMode === 'focus') pomodoroTime = 25 * 60;
    else if (pomodoroMode === 'short') pomodoroTime = 5 * 60;
    else if (pomodoroMode === 'long') pomodoroTime = 15 * 60;
    updatePomodoroDisplay(isMobile);
}

function setPomodoroMode(mode, isMobile = false) {
    pomodoroMode = mode;
    resetPomodoro(isMobile);
}

function calcAppend(val, isMobile = false) {
    const id = isMobile ? 'mobile-calc-display' : 'calc-display';
    const display = document.getElementById(id);
    display.value += val;
}

function calcClear(isMobile = false) {
    const id = isMobile ? 'mobile-calc-display' : 'calc-display';
    document.getElementById(id).value = '';
}

function calcCalculate(isMobile = false) {
    const id = isMobile ? 'mobile-calc-display' : 'calc-display';
    const display = document.getElementById(id);
    try {
        const expr = display.value;
        // Only allow digits, operators, parentheses, decimal points, and spaces
        if (!/^[\d+\-*/().%\s]+$/.test(expr)) {
            display.value = 'Error';
            return;
        }
        display.value = Function('"use strict"; return (' + expr + ')')();
    } catch (e) {
        display.value = 'Error';
    }
}

const notesArea = document.getElementById('notes-area');
const mobileNotesArea = document.getElementById('mobile-notes-area');

function saveNotes() {
    const content = this.value;
    localStorage.setItem('desktop_notes', content);

    if (this === notesArea && mobileNotesArea) mobileNotesArea.value = content;
    if (this === mobileNotesArea && notesArea) notesArea.value = content;

    const statusId = this === mobileNotesArea ? 'mobile-notes-status' : 'notes-status';
    const status = document.getElementById(statusId);
    status.textContent = 'Saving...';
    setTimeout(() => status.textContent = 'Saved', 1000);
}

if (notesArea) {
    notesArea.value = localStorage.getItem('desktop_notes') || '';
    notesArea.addEventListener('input', saveNotes);
}
if (mobileNotesArea) {
    mobileNotesArea.value = localStorage.getItem('desktop_notes') || '';
    mobileNotesArea.addEventListener('input', saveNotes);
}

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let ctx = null;

function initCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight - 60; // Subtract controls height

    ctx = canvas.getContext('2d');
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    canvas.addEventListener('mousedown', (e) => startDrawing(e, canvas));
    canvas.addEventListener('mousemove', (e) => draw(e, canvas));
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
}

function startDrawing(e, canvas) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
}

function draw(e, canvas) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const isMobileCanvas = canvas.id.includes('mobile');
    const colorId = isMobileCanvas ? 'mobile-draw-color' : 'draw-color';
    const sizeId = isMobileCanvas ? 'mobile-draw-size' : 'draw-size';

    ctx.strokeStyle = document.getElementById(colorId).value;
    ctx.lineWidth = document.getElementById(sizeId).value;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
}

function clearCanvas(isMobile = false) {
    const id = isMobile ? 'mobile-drawing-canvas' : 'drawing-canvas';
    const canvas = document.getElementById(id);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

let stopwatchInterval;
let stopwatchTime = 0; // in milliseconds
let stopwatchRunning = false;

function formatTime(ms) {
    const date = new Date(ms);
    const m = date.getUTCMinutes().toString().padStart(2, '0');
    const s = date.getUTCSeconds().toString().padStart(2, '0');
    const cs = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    return `${m}:${s}.${cs}`;
}

function updateStopwatchDisplay(isMobile = false) {
    const display = formatTime(stopwatchTime);
    const id = isMobile ? 'mobile-stopwatch-display' : 'stopwatch-display';
    document.getElementById(id).textContent = display;

    const otherId = isMobile ? 'stopwatch-display' : 'mobile-stopwatch-display';
    const otherEl = document.getElementById(otherId);
    if (otherEl) otherEl.textContent = display;
}

function startStopwatch(isMobile = false) {
    if (stopwatchRunning) return;
    stopwatchRunning = true;
    const startTime = Date.now() - stopwatchTime;
    stopwatchInterval = setInterval(() => {
        stopwatchTime = Date.now() - startTime;
        updateStopwatchDisplay(isMobile);
    }, 10);
}

function stopStopwatch(isMobile = false) {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
}

function resetStopwatch(isMobile = false) {
    stopStopwatch();
    stopwatchTime = 0;
    updateStopwatchDisplay(isMobile);
    const listId = isMobile ? 'mobile-laps-list' : 'laps-list';
    document.getElementById(listId).innerHTML = '';
}

function lapStopwatch(isMobile = false) {
    if (!stopwatchRunning) return;
    const lapTime = formatTime(stopwatchTime);
    const listId = isMobile ? 'mobile-laps-list' : 'laps-list';
    const list = document.getElementById(listId);
    const item = document.createElement('div');
    item.className = 'lap-item';
    item.textContent = `Lap ${list.children.length + 1}: ${lapTime}`;
    list.prepend(item);
}

let timerInterval;
let timerTotalSeconds = 0;

function updateTimerDisplay(isMobile = false) {
    const h = Math.floor(timerTotalSeconds / 3600);
    const m = Math.floor((timerTotalSeconds % 3600) / 60);
    const s = timerTotalSeconds % 60;
    const display = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    const displayId = isMobile ? 'mobile-timer-display' : 'timer-display';
    document.getElementById(displayId).textContent = display;
}

function startTimer(isMobile = false) {
    if (timerInterval) return;

    const hId = isMobile ? 'mobile-timer-h' : 'timer-h';
    const mId = isMobile ? 'mobile-timer-m' : 'timer-m';
    const sId = isMobile ? 'mobile-timer-s' : 'timer-s';

    const h = parseInt(document.getElementById(hId).value) || 0;
    const m = parseInt(document.getElementById(mId).value) || 0;
    const s = parseInt(document.getElementById(sId).value) || 0;

    if (timerTotalSeconds === 0) {
        timerTotalSeconds = h * 3600 + m * 60 + s;
    }

    if (timerTotalSeconds <= 0) return;

    const inputsId = isMobile ? 'mobile-timer-inputs' : 'timer-inputs';
    const displayId = isMobile ? 'mobile-timer-display' : 'timer-display';

    document.getElementById(inputsId).style.display = 'none';
    document.getElementById(displayId).style.display = 'block';

    updateTimerDisplay(isMobile);

    timerInterval = setInterval(() => {
        if (timerTotalSeconds > 0) {
            timerTotalSeconds--;
            updateTimerDisplay(isMobile);
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert('Timer finished!');
            resetTimer(isMobile);
        }
    }, 1000);
}

function stopTimer(isMobile = false) {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer(isMobile = false) {
    stopTimer();
    timerTotalSeconds = 0;

    const inputsId = isMobile ? 'mobile-timer-inputs' : 'timer-inputs';
    const displayId = isMobile ? 'mobile-timer-display' : 'timer-display';

    document.getElementById(inputsId).style.display = 'flex';
    document.getElementById(displayId).style.display = 'none';
}

const wallpapers = {
    nature: [
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1920&q=80'
    ],
    abstract: [
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&w=1920&q=80'
    ],
    space: [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1920&q=80'
    ],
    minimal: [
        'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?auto=format&fit=crop&w=1920&q=80'
    ],
    architecture: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1485628390555-1a7bd503f9fe?auto=format&fit=crop&w=1920&q=80'
    ],
    dark: [
        'https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1536566482680-fca31930a0bd?auto=format&fit=crop&w=1920&q=80'
    ]
};

function setWallpaper(category) {
    let url;
    if (wallpapers[category]) {
        const images = wallpapers[category];
        url = images[Math.floor(Math.random() * images.length)];
    } else {
        url = category;
    }

    document.body.style.backgroundImage = `url('${url}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';

    const style = document.createElement('style');
    style.id = 'wallpaper-override';
    style.innerHTML = `
        body::before, body::after { display: none !important; }
        body { background-color: #000; } 
    `;

    const existing = document.getElementById('wallpaper-override');
    if (existing) existing.remove();
    document.head.appendChild(style);
}

function setRandomWallpaper() {
    const categories = Object.keys(wallpapers);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    setWallpaper(randomCategory);
}

function resetWallpaper() {
    document.body.style.backgroundImage = '';
    const override = document.getElementById('wallpaper-override');
    if (override) override.remove();
}


function initPortfolio() {
    console.log('🚀 Desktop Environment Loaded');

    if (isMobile()) {
        document.querySelector('.springboard').style.display = 'block';
    } else {
        document.querySelector('.springboard').style.display = 'none';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}

document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});