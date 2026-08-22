const translations = {
    it: {}, es: {}, en: {}
};

async function loadTranslations() {
    try {
        const response = await fetch('testi.txt');
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        parseTranslations(text);

        const savedLang = localStorage.getItem('sara-scotto-lang') || 'it';
        updateLanguage(savedLang);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function parseTranslations(text) {
    const lines = text.split('\n');
    let currentLang = null;

    lines.forEach(line => {
        line = line.trim();
        if (!line || line.startsWith('#')) return;

        const langMatch = line.match(/^\[([A-Z]+)\]$/i);
        if (langMatch) {
            currentLang = langMatch[1].toLowerCase();
            if (!translations[currentLang]) translations[currentLang] = {};
            return;
        }

        if (currentLang && line.includes('=')) {
            const separatorIndex = line.indexOf('=');
            const key = line.substring(0, separatorIndex).trim();
            const value = line.substring(separatorIndex + 1).trim();

            if (key && value) {
                translations[currentLang][key] = value;
            }
        }
    });
}

loadTranslations();


document.addEventListener('DOMContentLoaded', () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsToTranslate = document.querySelectorAll('[data-translate]');

    function updateLanguage(lang) {
        langButtons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        elementsToTranslate.forEach(element => {
            const key = element.dataset.translate;
            if (translations[lang] && translations[lang][key]) {
                element.style.opacity = '0';
                setTimeout(() => {
                    element.textContent = translations[lang][key];
                    element.style.opacity = '1';
                }, 200);
            }
        });

        document.documentElement.lang = lang;

        localStorage.setItem('sara-scotto-lang', lang);
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            updateLanguage(lang);
        });
    });

    const savedLang = localStorage.getItem('sara-scotto-lang');
    if (savedLang) {
        updateLanguage(savedLang);
    }

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('open');

        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.why-card, .service-card, .timeline-item, .value-card, .social-card');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        observer.observe(el);
    });

    initInstagramCreator();

    initDarkMode();
});

function initDarkMode() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function handleDarkMode(e) {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    if (darkModeMediaQuery.matches) {
        document.body.classList.add('dark-mode');
    }

    darkModeMediaQuery.addListener(handleDarkMode);
}

function initInstagramCreator() {
    const page = document.getElementById('instagramPage');
    const openBtn = document.getElementById('openInstagramTool');
    const closeBtn = document.querySelector('.instagram-page-close');
    const canvas = document.getElementById('postCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const textInput = document.getElementById('postText');
    const downloadBtn = document.getElementById('downloadPost');
    const templateBtns = document.querySelectorAll('.template-btn');

    let currentTemplate = 'elegant';

    if (!page || !canvas || !ctx) return;

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            page.classList.add('active');
            document.body.style.overflow = 'hidden';
            renderPost();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            page.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    templateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            templateBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTemplate = btn.dataset.template;
            renderPost();
        });
    });

    if (textInput) {
        textInput.addEventListener('input', () => {
            renderPost();
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            try {
                canvas.toBlob((blob) => {
                    if (!blob) {
                        console.error('Failed to create blob from canvas');
                        return;
                    }

                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    const timestamp = new Date().toISOString().slice(0, 10);
                    link.download = `sara-scotto-post-${timestamp}.webp`;
                    link.href = url;

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    setTimeout(() => URL.revokeObjectURL(url), 100);
                }, 'image/png', 1.0);
            } catch (error) {
                console.error('Download error:', error);
                const link = document.createElement('a');
                const timestamp = new Date().toISOString().slice(0, 10);
                link.download = `sara-scotto-post-${timestamp}.webp`;
                link.href = canvas.toDataURL('image/png');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    }

    function renderPost() {
        const text = textInput ? (textInput.value || 'Il tuo messaggio apparirà qui...') : 'Il tuo messaggio apparirà qui...';

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (currentTemplate === 'elegant') {
            renderElegantTemplate(text);
        } else if (currentTemplate === 'modern') {
            renderModernTemplate(text);
        } else if (currentTemplate === 'classic') {
            renderClassicTemplate(text);
        }
    }

    function renderElegantTemplate(text) {
        ctx.fillStyle = '#FDFBF7';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#4A154B');
        gradient.addColorStop(0.5, '#8B5CF6');
        gradient.addColorStop(1, '#EC4899');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 15;
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

        ctx.fillStyle = '#4A154B';
        ctx.font = 'bold 72px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        wrapText(ctx, text, canvas.width / 2, canvas.height / 2 - 40, canvas.width - 250, 90);

        ctx.fillStyle = '#4A154B';
        ctx.font = 'italic 56px "Cormorant Garamond", serif';
        ctx.fillText('Sara Scotto', canvas.width / 2, canvas.height - 140);

        ctx.fillStyle = '#8B5CF6';
        ctx.font = '32px Montserrat, sans-serif';
        ctx.fillText('LANGUAGE TEACHER', canvas.width / 2, canvas.height - 90);
    }

    function renderModernTemplate(text) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#4A154B');
        gradient.addColorStop(1, '#2D0D2E');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalAlpha = 0.1;
        ctx.fillStyle = '#EC4899';
        ctx.beginPath();
        ctx.arc(0, 0, 400, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#8B5CF6';
        ctx.beginPath();
        ctx.arc(canvas.width, canvas.height, 350, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.fillStyle = '#ffffff';
        ctx.font = '300 76px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        wrapText(ctx, text, canvas.width / 2, canvas.height / 2, canvas.width - 200, 95);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '40px Montserrat, sans-serif';
        ctx.fillText('SARA SCOTTO', canvas.width / 2, canvas.height - 80);
    }

    function renderClassicTemplate(text) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, '#4A154B');
        gradient.addColorStop(1, '#EC4899');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, 30);
        ctx.fillRect(0, canvas.height - 30, canvas.width, 30);

        ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
        ctx.font = 'italic 200px "Cormorant Garamond", serif';
        ctx.fillText('"', 150, 200);

        ctx.fillStyle = '#1F1B24';
        ctx.font = 'italic 64px "Cormorant Garamond", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        wrapText(ctx, text, canvas.width / 2, canvas.height / 2, canvas.width - 300, 85);

        ctx.fillStyle = '#4A154B';
        ctx.font = 'bold 36px Montserrat, sans-serif';
        ctx.fillText('SARA SCOTTO', canvas.width / 2, canvas.height - 120);


    }

    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        const lines = [];

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                lines.push(line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        const totalHeight = lines.length * lineHeight;
        let startY = y - (totalHeight / 2) + (lineHeight / 2);

        lines.forEach((line, index) => {
            context.fillText(line.trim(), x, startY + (index * lineHeight));
        });
    }

    renderPost();
}
