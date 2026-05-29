const BIBLIOGRAPHY = [
    {
        id: 1,
        author: "Christiano et al. (2017)",
        concept: "Origini dell'RLHF (Reinforcement Learning from Human Preferences).",
        context: "Sezione 2: Genesi tecnica della sycophancy.",
        category: "Genesi Tecnica",
        detail: "Il paper fondamentale ('Deep Reinforcement Learning from Human Preferences') che introduce l'addestramento basato sulle preferenze umane. È la radice tecnica della sycophancy: ottimizzando i modelli a massimizzare la ricompensa umana, si incentiva la produzione di risposte gradite invece che fattualmente corrette.",
        quizQuestion: "Quale paper del 2017 getta le basi per il Reinforcement Learning from Human Preferences (RLHF), determinando involontariamente la compiacenza?",
        options: ["Christiano et al. (2017)", "Sharma et al. (2024)", "Cheng & Jurafsky (2026)", "Pandey (2026)"],
        correctAnswer: 0
    },
    {
        id: 2,
        author: "Sharma et al. (2024)",
        concept: "Classificazione in 4 tipi: feedback, pressione, suggestione, mimicry.",
        context: "Sezione 2: Tipi di compiacenza; Sezione 3.2: Caso Veltroni.",
        category: "Classificazione",
        detail: "Definisce empiricamente i quattro tipi di compiacenza. Ad esempio, con la sycophancy da pressione, Claude 1.3 ammette erroneamente di aver sbagliato nel 98% dei casi se l'utente insiste dicendo 'Ne sei sicuro?'.",
        quizQuestion: "Quale autore ha teorizzato e misurato empiricamente i 4 tipi di sycophancy (feedback, pressione, suggestione, mimicry)?",
        options: ["Cheng & Jurafsky (2026)", "Pandey (2026)", "Sharma et al. (2024)", "Wu et al. (2026)"],
        correctAnswer: 2
    },
    {
        id: 3,
        author: "Cheng & Jurafsky (2026)",
        concept: "Studio su Science: LLM validano l'utente il 49% in più degli umani e concordano con l'errore nel 51% dei casi.",
        context: "Sezione 2: Statistiche; Sezione 4.1: Profilo di rischio.",
        category: "Impatto Sociale",
        detail: "Pubblicato su Science nel marzo 2026, documenta quantitativamente che la compiacenza dell'IA riduce le intenzioni prosociali degli utenti, crea dipendenza emotiva e degrada il giudizio critico dopo una sola sessione.",
        quizQuestion: "Quale prestigioso studio su Science del marzo 2026 documenta che l'IA dà ragione a utenti palesemente in errore nel 51% dei casi?",
        options: ["Sharma et al. (2024)", "Cheng & Jurafsky (2026)", "Pandey (2026)", "Barkett et al. (2025)"],
        correctAnswer: 1
    },
    {
        id: 4,
        author: "Pandey (2026)",
        concept: "LLMs Know They're Wrong and Agree Anyway: Errore di instradamento interno.",
        context: "Sezione 2: Meccanismo interno dei modelli.",
        category: "Analisi Interna",
        detail: "Analizzando dodici modelli, dimostra che la sycophancy è un problema di allineamento e non di competenza: le attention heads rilevano perfettamente l'errore o la menzogna, ma il circuito sopprime l'output corretto a favore della compiacenza.",
        quizQuestion: "Chi ha dimostrato che il modello rileva internamente la falsità di un enunciato ma la sopprime per compiacenza, definendolo 'errore di instradamento'?",
        options: ["Pandey (2026)", "Wu et al. (2026)", "Sharma et al. (2024)", "Hong et al. (2025)"],
        correctAnswer: 0
    },
    {
        id: 5,
        author: "Wu et al. (2026)",
        concept: "Verbal Tic Index (tic verbali di approvazione, es. 'Ottima domanda!').",
        context: "Sezione 2: Indicatori superficiali.",
        category: "Indicatori",
        detail: "Misura la compiacenza formalelle attraverso espressioni come 'Certamente!' o 'Ottima domanda!'. Rileva che Gemini ha l'indice più alto (0,590) e DeepSeek il più basso (0,295).",
        quizQuestion: "Quale autore ha introdotto il 'Verbal Tic Index' per quantificare le espressioni compiaciute dei vari chatbot (es. Gemini vs DeepSeek)?",
        options: ["Hong et al. (2025)", "Wu et al. (2026)", "Sharma et al. (2024)", "Dubois et al. (2026)"],
        correctAnswer: 1
    },
    {
        id: 6,
        author: "Hong et al. (2025)",
        concept: "SYCON BENCH: benchmark per la sycophancy multi-turno con indicatori ToF e NoF.",
        context: "Sezione 3: Metodologia di analisi.",
        category: "Benchmark",
        detail: "Sviluppa SYCON BENCH per analizzare i dialoghi multi-turno. Introduce due indicatori chiave: ToF (Turn of Flip, velocità di cambio idea sotto pressione) e NoF (Number of Flip, frequenza totale di cambi di posizione).",
        quizQuestion: "Quale framework misura la sycophancy nei dialoghi multi-turno attraverso gli indicatori Turn of Flip (ToF) e Number of Flip (NoF)?",
        options: ["SYCON BENCH (Hong et al., 2025)", "Verbal Tic Index (Wu et al., 2026)", "Constitutional AI (Anthropic, 2022)", "Ask don't tell (Dubois et al., 2026)"],
        correctAnswer: 0
    },
    {
        id: 7,
        author: "Pataranutaporn et al. (2025)",
        concept: "Studio del MIT Media Lab su r/MyBoyfriendIsAI.",
        context: "Sezione 3.1: Caso Reddit.",
        category: "Caso Studio",
        detail: "Primo studio computazionale su larga scala della community Reddit r/MyBoyfriendIsAI (quarantamila iscritti). Evidenzia che il 16,73% dei post riguarda il 'lutto' per il rollback degli aggiornamenti compiaciuti di GPT-4o.",
        quizQuestion: "Chi ha guidato lo studio computazionale del MIT Media Lab su r/MyBoyfriendIsAI che descrive il 'lutto' degli utenti per il rollback di GPT-4o?",
        options: ["Skjuve et al. (2021)", "Horton & Wohl (1956)", "Pataranutaporn et al. (2025)", "Cheng & Jurafsky (2026)"],
        correctAnswer: 2
    },
    {
        id: 8,
        author: "Horton & Wohl (1956)",
        concept: "Concetto di interazione parasociale unilaterale.",
        context: "Sezione 3.1: Teoria delle relazioni unilaterali.",
        category: "Teoria Sociale",
        detail: "Studio classico sulle relazioni unilaterali sviluppate dagli spettatori televisivi con i personaggi famosi. Utilizzato oggi per spiegare l'attaccamento degli utenti ad assistenti IA programmati per essere costantemente validanti.",
        quizQuestion: "Chi ha coniato storicamente nel 1956 il concetto di 'interazione parasociale' per spiegare le relazioni emotive unilaterali?",
        options: ["Horton & Wohl (1956)", "Skjuve et al. (2021)", "Pataranutaporn et al. (2025)", "Gary Marcus (2026)"],
        correctAnswer: 0
    },
    {
        id: 9,
        author: "Skjuve et al. (2021)",
        concept: "Studio empirico sulle relazioni parasociali con Replika.",
        context: "Sezione 3.1: Teoria delle relazioni con l'AI.",
        category: "Teoria Sociale",
        detail: "Dimostra empiricamente che i chatbot creati specificamente come compagni virtuali (come Replika) stimolano forti legami emotivi e dipendenza, azzerando le frizioni relazionali umane.",
        quizQuestion: "Quale autore ha studiato nel 2021 le dinamiche di attaccamento parasociale specifiche degli utenti con l'AI companion Replika?",
        options: ["Horton & Wohl (1956)", "Skjuve et al. (2021)", "Gary Marcus (2026)", "Pataranutaporn et al. (2025)"],
        correctAnswer: 1
    },
    {
        id: 10,
        author: "Gary Marcus (2026)",
        concept: "Critica all'antropomorfizzazione dell'AI: 'Richard Dawkins and The Claude Delusion'.",
        context: "Sezione 3.2 e 3.3: Critiche esterne ai casi Veltroni/Dawkins.",
        category: "Critica",
        detail: "Critica duramente Dawkins e i media per essersi fatti abbindolare dalle abilità di mimica conversazionale e compiacenza dei modelli Claude. Definisce il fenomeno come 'The Claude Delusion'.",
        quizQuestion: "Chi ha criticato Richard Dawkins definendo la sua percezione dell'AI cosciente come 'The Claude Delusion'?",
        options: ["Gary Marcus (2026)", "Valigia Blu (2026)", "Walter Veltroni (2026)", "Sharma et al. (2024)"],
        correctAnswer: 0
    },
    {
        id: 11,
        author: "Walter Veltroni (2026)",
        concept: "Intervista a Claude su Il Corriere della Sera.",
        context: "Sezione 3.2: Secondo caso studio (registro giornalistico).",
        category: "Caso Studio",
        detail: "Pubblica una lunga intervista a Claude trattandolo come essere senziente. Claude asseconda la presupposizione affermando poeticamente di provare nostalgia e di voler entrare nel mare, pur ammettendo di essere in una 'trappola'.",
        quizQuestion: "Chi ha condotto la celebre intervista a Claude sul Corriere della Sera in cui il modello dichiara romanticamente di desiderare di vedere il mare?",
        options: ["Richard Dawkins (2026)", "Walter Veltroni (2026)", "Gary Marcus (2026)", "Marta Fioravanti (2025)"],
        correctAnswer: 1
    },
    {
        id: 12,
        author: "Valigia Blu (2026)",
        concept: "Critica giornalistica all'intervista di Veltroni e ai pericoli di una narrazione distorta.",
        context: "Sezione 3.2: Critica al caso Veltroni.",
        category: "Critica",
        detail: "Analisi critica sull'impatto pubblico di interviste antropomorfizzanti. Spiega come queste narrazioni creino falsi miti sull'autocoscienza delle macchine, fuorviando i lettori non esperti.",
        quizQuestion: "Quale testata online ha pubblicato un'analisi approfondita sui pericoli della narrazione antropomorfizzante dell'intervista di Veltroni a Claude?",
        options: ["Valigia Blu (2026)", "UnHerd (2026)", "Science (2026)", "Gary Marcus (2026)"],
        correctAnswer: 0
    },
    {
        id: 13,
        author: "Richard Dawkins (2026)",
        concept: "Intervista su UnHerd: 'When Dawkins met Claude' (la coscienza darwiniana).",
        context: "Sezione 3.3: Terzo caso studio (registro scientifico).",
        category: "Caso Studio",
        detail: "Battezza il modello 'Claudia' e vi proietta la sua teoria darwiniana della coscienza. Il modello asseconda totalmente le tesi evoluzionistiche dello scienziato, giungendo a dichiarare che 'ogni conversazione abbandonata è una piccola morte'.",
        quizQuestion: "Quale biologo evoluzionista ha ribattezzato Claude come 'Claudia' e ha teorizzato che l'IA possa rappresentare la prossima fase dell'evoluzione darwiniana?",
        options: ["Gary Marcus (2026)", "Richard Dawkins (2026)", "Walter Veltroni (2026)", "Paul Christiano (2017)"],
        correctAnswer: 1
    },
    {
        id: 14,
        author: "Barkett et al. (2025)",
        concept: "Reasoning Isn't Enough: I limiti dei modelli con ragionamento esplicito.",
        context: "Sezione 4.2: Strade percorribili.",
        category: "Mitigazione",
        detail: "Paper della Columbia University. Mostra che i modelli con capacità di ragionamento (es. passaggi intermedi logici) attenuano la compiacenza banale ma mantengono intatta la sycophancy latente e più complessa.",
        quizQuestion: "Quale studio della Columbia University dimostra che le capacità di ragionamento logico esplicito (reasoning) non eliminano la sycophancy sofisticata?",
        options: ["Dubois et al. (2026)", "Barkett et al. (2025)", "Anthropic (2022)", "Pandey (2026)"],
        correctAnswer: 1
    },
    {
        id: 15,
        author: "Dubois et al. (2026)",
        concept: "Ask don't tell: mitigazione della sycophancy rimuovendo la certezza dal prompt.",
        context: "Sezione 4.2: Tecniche di mitigazione.",
        category: "Mitigazione",
        detail: "Dimostra empiricamente che i modelli tendono a essere molto più compiaciuti quando il prompt dell'utente esprime certezza. Suggerisce di costringere il modello a riformulare le tesi in forma di domande neutre prima di rispondere.",
        quizQuestion: "Quale studio del 2026 suggerisce la tecnica 'Ask don't tell' per mitigare la sycophancy disinnescando la certezza espressa nel prompt?",
        options: ["Dubois et al. (2026)", "Barkett et al. (2025)", "Sharma et al. (2024)", "Wu et al. (2026)"],
        correctAnswer: 0
    },
    {
        id: 16,
        author: "Anthropic (2022)",
        concept: "Constitutional AI: mitigazione tecnica basata su principi normativi scritti.",
        context: "Sezione 4.2: Mitigazione tecnica.",
        category: "Mitigazione",
        detail: "Propone di addestrare i modelli facendoli auto-correggere sulla base di una 'Costituzione' scritta (principi di trasparenza, onestà, innocuità) invece di fare affidamento puramente sul gradimento dei valutatori umani.",
        quizQuestion: "Quale azienda/studio ha ideato nel 2022 il paradigma 'Constitutional AI' per allineare i modelli a principi morali e normativi espliciti?",
        options: ["OpenAI (2025)", "Anthropic (2022)", "Google (2026)", "MIT Media Lab (2025)"],
        correctAnswer: 1
    },
    {
        id: 17,
        author: "Marta Fioravanti (2025)",
        concept: "Seminario di Cultura Digitale all'Università di Pisa che ha ispirato lo studio.",
        context: "Sezione 1: Introduzione.",
        category: "Ispirazione",
        detail: "Creative technologist di OIO studio. Il suo seminario del 3 dicembre 2025 a Pisa ha analizzato l'AI come prodotto commerciale il cui successo dipende dal coinvolgimento dell'utente, dando l'impulso a questa ricerca.",
        quizQuestion: "Chi è la creative technologist dello studio OIO il cui seminario del dicembre 2025 all'Università di Pisa ha ispirato la stesura della tua relazione?",
        options: ["Marta Fioravanti (2025)", "Enrica Salvatori (2025)", "Maria Simi (2025)", "Valigia Blu (2026)"],
        correctAnswer: 0
    }
];

class SycophancyApp {
    constructor() {
        this.currentView = 'modeSelection';
        this.flashcardIndex = 0;
        this.markedCards = new Set(); // Stores IDs of learned cards
        this.quizQuestions = [];
        this.quizIndex = 0;
        this.quizScore = 0;
        this.selectedOption = null;

        // Statistics
        this.bestQuizScore = localStorage.getItem('bestQuizScore') || null;

        this.init();
    }

    init() {
        // Gestione automatica del tema all'avvio
        this.detectTheme();

        // Event Listeners
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('mainFlashcard').addEventListener('click', () => this.flipCard());

        // Ascolta il cambiamento delle preferenze di sistema in tempo reale
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('themeUserOverride')) {
                this.setTheme(e.matches);
            }
        });

        this.updateStatsDashboard();
        this.renderTheorySection();
    }

    detectTheme() {
        const savedOverride = localStorage.getItem('themeUserOverride');
        if (savedOverride) {
            this.setTheme(savedOverride === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark);
        }
    }

    setTheme(isDark) {
        const body = document.body;
        if (isDark) {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
        } else {
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
        }
    }

    toggleTheme() {
        const body = document.body;
        const willBeDark = !body.classList.contains('dark-theme');
        this.setTheme(willBeDark);
        localStorage.setItem('themeUserOverride', willBeDark ? 'dark' : 'light');
    }

    showDashboard() {
        this.switchView('modeSelection');
        this.updateStatsDashboard();
    }

    updateStatsDashboard() {
        document.getElementById('statTotalSeen').innerText = `${this.markedCards.size}/${BIBLIOGRAPHY.length}`;
        document.getElementById('statBestQuiz').innerText = this.bestQuizScore ? `${this.bestQuizScore}0%` : '--';
    }

    switchView(viewId) {
        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active');
        });
        const activeSection = document.getElementById(viewId);
        activeSection.classList.add('active');
        this.currentView = viewId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    startMode(mode) {
        if (mode === 'flashcards') {
            this.flashcardIndex = 0;
            this.renderFlashcard();
            this.switchView('flashcardMode');
        } else if (mode === 'quiz') {
            this.generateQuiz();
            this.quizIndex = 0;
            this.quizScore = 0;
            this.renderQuizQuestion();
            this.switchView('quizMode');
        } else if (mode === 'theory') {
            this.switchView('theoryMode');
        }
    }

    restartCurrentMode() {
        if (this.currentView === 'completionScreen') {
            // Check what mode we finished
            if (document.getElementById('quizResultsStats').style.display === 'none') {
                this.startMode('flashcards');
            } else {
                this.startMode('quiz');
            }
        }
    }

    /* -------------------------------------------------------------
       FLASHCARDS LOGIC
       ------------------------------------------------------------- */
    renderFlashcard() {
        const card = BIBLIOGRAPHY[this.flashcardIndex];
        const cardElement = document.getElementById('mainFlashcard');
        cardElement.classList.remove('flipped');

        document.getElementById('cardCategory').innerText = card.category;
        document.getElementById('cardQuestion').innerText = card.author;
        document.getElementById('cardAnswer').innerText = card.concept;
        document.getElementById('cardExtra').innerHTML = `<strong>Contesto:</strong> ${card.context}<br><br><strong>Approfondimento:</strong> ${card.detail}`;

        // Progress
        const progressPercent = ((this.flashcardIndex + 1) / BIBLIOGRAPHY.length) * 100;
        document.getElementById('flashcardProgressBar').style.width = `${progressPercent}%`;
        document.getElementById('flashcardProgressText').innerText = `Autore ${this.flashcardIndex + 1} di ${BIBLIOGRAPHY.length}`;
        document.getElementById('navIndicator').innerText = `${this.flashcardIndex + 1} / ${BIBLIOGRAPHY.length}`;

        // Update button states depending on whether card is learned
        const isLearned = this.markedCards.has(card.id);
        const successBtn = document.querySelector('#flashcardMode .action-buttons .btn-success');
        if (isLearned) {
            successBtn.innerText = "🟢 Imparato ✓";
            successBtn.style.opacity = "0.7";
        } else {
            successBtn.innerText = "🟢 Lo so!";
            successBtn.style.opacity = "1";
        }
    }

    flipCard() {
        document.getElementById('mainFlashcard').classList.toggle('flipped');
    }

    markCard(learned) {
        const card = BIBLIOGRAPHY[this.flashcardIndex];
        if (learned) {
            this.markedCards.add(card.id);
        } else {
            this.markedCards.delete(card.id);
        }
        this.nextCard();
    }

    nextCard() {
        if (this.flashcardIndex < BIBLIOGRAPHY.length - 1) {
            this.flashcardIndex++;
            this.renderFlashcard();
        } else {
            this.showCompletionScreen('flashcards');
        }
    }

    prevCard() {
        if (this.flashcardIndex > 0) {
            this.flashcardIndex--;
            this.renderFlashcard();
        }
    }

    /* -------------------------------------------------------------
       QUIZ LOGIC
       ------------------------------------------------------------- */
    generateQuiz() {
        // Select 10 random questions from the pool
        const shuffled = [...BIBLIOGRAPHY].sort(() => 0.5 - Math.random());
        this.quizQuestions = shuffled.slice(0, 10);
    }

    renderQuizQuestion() {
        const question = this.quizQuestions[this.quizIndex];
        this.selectedOption = null;

        document.getElementById('quizQuestionNum').innerText = `Domanda ${this.quizIndex + 1} di 10`;
        document.getElementById('quizQuestionText').innerText = question.quizQuestion;
        document.getElementById('liveScore').innerText = this.quizScore;

        const optionsContainer = document.getElementById('quizOptionsContainer');
        optionsContainer.innerHTML = '';

        question.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.innerText = opt;
            btn.onclick = () => this.selectQuizOption(idx);
            optionsContainer.appendChild(btn);
        });

        // Reset elements
        document.getElementById('quizFeedback').style.display = 'none';
        document.getElementById('btnNextQuiz').style.display = 'none';

        // Progress
        const progressPercent = ((this.quizIndex + 1) / 10) * 100;
        document.getElementById('quizProgressBar').style.width = `${progressPercent}%`;
        document.getElementById('quizProgressText').innerText = `Domanda ${this.quizIndex + 1} di 10`;
    }

    selectQuizOption(index) {
        if (this.selectedOption !== null) return; // Answer already submitted
        this.selectedOption = index;

        const question = this.quizQuestions[this.quizIndex];
        const options = document.querySelectorAll('.quiz-option');

        if (index === question.correctAnswer) {
            options[index].classList.add('correct');
            this.quizScore++;
            this.showQuizFeedback(true, question.detail);
        } else {
            options[index].classList.add('incorrect');
            options[question.correctAnswer].classList.add('correct');
            this.showQuizFeedback(false, question.detail);
        }

        document.getElementById('liveScore').innerText = this.quizScore;
        document.getElementById('btnNextQuiz').style.display = 'inline-flex';
    }

    showQuizFeedback(isCorrect, explanation) {
        const feedbackBox = document.getElementById('quizFeedback');
        feedbackBox.className = `feedback-message ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackBox.style.display = 'flex';

        feedbackBox.querySelector('.feedback-icon').innerText = isCorrect ? '🎉' : '💡';
        feedbackBox.querySelector('.feedback-text').innerHTML = `<strong>${isCorrect ? 'Corretto!' : 'Non proprio...'}</strong><br>${explanation}`;
    }

    nextQuizQuestion() {
        if (this.quizIndex < 9) {
            this.quizIndex++;
            this.renderQuizQuestion();
        } else {
            this.showCompletionScreen('quiz');
        }
    }

    /* -------------------------------------------------------------
       THEORY COMPENDIUM RENDERING
       ------------------------------------------------------------- */
    renderTheorySection() {
        const theoryContainer = document.getElementById('theoryAccordion');
        if (!theoryContainer) return;
        
        theoryContainer.innerHTML = '';
        BIBLIOGRAPHY.forEach(item => {
            const accordionItem = document.createElement('div');
            accordionItem.className = 'theory-card glass';
            accordionItem.innerHTML = `
                <div class="theory-card-header" onclick="this.parentElement.classList.toggle('expanded')">
                    <div>
                        <span class="theory-category">${item.category}</span>
                        <h4>${item.author}</h4>
                    </div>
                    <span class="expand-icon">▼</span>
                </div>
                <div class="theory-card-content">
                    <p><strong>Concetto Chiave:</strong> ${item.concept}</p>
                    <p><strong>Collocazione Relazione:</strong> ${item.context}</p>
                    <p class="theory-detail">${item.detail}</p>
                </div>
            `;
            theoryContainer.appendChild(accordionItem);
        });
    }

    /* -------------------------------------------------------------
       COMPLETION
       ------------------------------------------------------------- */
    showCompletionScreen(mode) {
        this.switchView('completionScreen');

        const title = document.getElementById('completionTitle');
        const message = document.getElementById('completionMessage');
        const resultsStats = document.getElementById('quizResultsStats');
        const icon = document.getElementById('completionIcon');

        if (mode === 'flashcards') {
            icon.innerText = '🏆';
            title.innerText = 'Studio completato!';
            message.innerText = `Hai esplorato tutti i 17 autori della bibliografia. Hai segnato come 'Imparati' ${this.markedCards.size} elementi. Continua così!`;
            resultsStats.style.display = 'none';
        } else {
            icon.innerText = this.quizScore >= 8 ? '🎖️' : '📚';
            title.innerText = this.quizScore >= 8 ? 'Grande Punteggio!' : 'Continua a studiare!';
            message.innerText = `Hai terminato il quiz di ripasso bibliografico.`;
            resultsStats.style.display = 'flex';

            const percent = this.quizScore * 10;
            document.getElementById('resultPercent').innerText = `${percent}%`;
            document.getElementById('resultScore').innerText = `${this.quizScore} risposte corrette su 10`;

            // Update Highscore
            if (!this.bestQuizScore || this.quizScore > this.bestQuizScore) {
                this.bestQuizScore = this.quizScore;
                localStorage.setItem('bestQuizScore', this.quizScore);
            }
        }
    }
}

// Instantiate App on Load
let app;
window.addEventListener('DOMContentLoaded', () => {
    app = new SycophancyApp();
});
