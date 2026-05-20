/**
 * db.js
 * Mock Database using localStorage
 */

const DB_KEY = 'bdd_portfolio_db';

// Default data to populate if the database is empty
const defaultData = {
    users: [
        {
            id: 1,
            nome: 'Paolo',
            cognome: 'Pirruccio',
            username: 'paolo_dev',
            email: 'paolo@example.com',
            password: 'password123',
            bio: 'Sviluppatore Web & Utente Premium',
            isPremium: 1,
            immagine_profilo: 'Pic1.webp',
        },
        {
            id: 2,
            nome: 'Mario',
            cognome: 'Rossi',
            username: 'mario_rossi',
            email: 'mario@example.com',
            password: 'password123',
            bio: 'Appassionato di cucina e viaggi.',
            isPremium: 0,
            immagine_profilo: 'Pic2.webp',
        },
        {
            id: 3,
            nome: 'Laura',
            cognome: 'Bianchi',
            username: 'laura_b',
            email: 'laura@example.com',
            password: 'password123',
            bio: 'Fotografa e travel blogger.',
            isPremium: 1,
            immagine_profilo: 'Pic3.webp',
        },
        {
            id: 4,
            nome: 'Luca',
            cognome: 'Verdi',
            username: 'luca_v',
            email: 'luca@example.com',
            password: 'password123',
            bio: 'Studente di informatica.',
            isPremium: 0,
            immagine_profilo: 'Pic4.webp',
        }
    ],
    blogs: [
        {
            id: 1,
            titolo: 'Sviluppo Web e Dintorni',
            tagline: 'Tutto ciò che c\'è da sapere sullo sviluppo frontend e backend.',
            descrizione: 'Un blog dedicato allo sviluppo web, con tutorial, best practices e novità dal mondo tech.',
            id_proprietario: 1,
            id_categoria: 1,
            categoria: 'Tecnologia',
            id_tema: 'Stile1',
            seguaci: [2, 3],
            data_creazione: new Date('2024-09-01').toISOString()
        },
        {
            id: 2,
            titolo: 'Viaggi Culinari',
            tagline: 'Esplorando il mondo un piatto alla volta.',
            descrizione: 'Scopri le migliori ricette da tutto il mondo e i ristoranti da non perdere.',
            id_proprietario: 2,
            id_categoria: 2,
            categoria: 'Cucina',
            id_tema: 'Stile2',
            seguaci: [1],
            data_creazione: new Date('2024-10-15').toISOString()
        },
        {
            id: 3,
            titolo: 'Scatti dal Mondo',
            tagline: 'Fotografia di viaggio e storytelling visivo.',
            descrizione: 'Racconto i miei viaggi attraverso le immagini, con consigli su fotografia e destinazioni.',
            id_proprietario: 3,
            id_categoria: 3,
            categoria: 'Viaggi',
            id_tema: 'Stile3',
            seguaci: [1, 2, 4],
            data_creazione: new Date('2024-11-20').toISOString()
        },
        {
            id: 4,
            titolo: 'Code & Coffee',
            tagline: 'Programmazione, caffè e curiosità tech.',
            descrizione: 'Appunti, tutorial e riflessioni di uno studente di informatica.',
            id_proprietario: 4,
            id_categoria: 4,
            categoria: 'Programmazione',
            id_tema: 'Stile4',
            seguaci: [1, 3],
            data_creazione: new Date('2025-01-10').toISOString()
        }
    ],
    posts: [
        {
            id: 1,
            titolo: 'Guida completa a CSS Grid',
            testo: 'CSS Grid è uno degli strumenti più potenti per creare layout moderni. In questa guida vedremo come usarlo al meglio, partendo dalle basi fino ai pattern più avanzati. Scopriamo insieme le proprietà fondamentali e i trucchi per creare layout responsive senza media queries.',
            immagine: null,
            alt_descrizione: '',
            data_ora: new Date('2025-02-28').toISOString(),
            bozza: 0,
            id_blog: 1,
            id_autore: 1,
            likes: 5
        },
        {
            id: 2,
            titolo: '10 Ricette veloci per la pausa pranzo',
            testo: 'Ecco 10 idee per una pausa pranzo veloce, sana e gustosa, ideale per chi lavora da casa o in ufficio. Dalla pasta al pesto fresco alle bowl di riso con verdure grigliate, ogni ricetta richiede meno di 20 minuti di preparazione.',
            immagine: null,
            alt_descrizione: '',
            data_ora: new Date('2025-02-25').toISOString(),
            bozza: 0,
            id_blog: 2,
            id_autore: 2,
            likes: 3
        },
        {
            id: 3,
            titolo: 'JavaScript: le novità di ES2025',
            testo: 'ECMAScript 2025 porta nuove funzionalità interessanti: pattern matching, record e tuple, e miglioramenti alle promise. Vediamo cosa cambia per gli sviluppatori e come queste feature possono migliorare il nostro codice quotidiano.',
            immagine: null,
            alt_descrizione: '',
            data_ora: new Date('2025-02-20').toISOString(),
            bozza: 0,
            id_blog: 1,
            id_autore: 1,
            likes: 8
        },
        {
            id: 4,
            titolo: 'Weekend a Lisbona: cosa vedere in 3 giorni',
            testo: 'Lisbona è una città che conquista al primo sguardo. Tra i vicoli dell\'Alfama, i tram gialli e i pastéis de nata, ecco il mio itinerario per un weekend perfetto. Consigli su dove mangiare, i migliori miradouros e come muoversi.',
            immagine: null,
            alt_descrizione: '',
            data_ora: new Date('2025-02-15').toISOString(),
            bozza: 0,
            id_blog: 3,
            id_autore: 3,
            likes: 12
        },
        {
            id: 5,
            titolo: 'Come configurare un progetto Vite da zero',
            testo: 'Vite è il build tool del momento. In questa guida pratica vedremo come configurarlo da zero per un progetto React, con TypeScript, ESLint e Prettier. Setup completo in 10 minuti.',
            immagine: null,
            alt_descrizione: '',
            data_ora: new Date('2025-02-10').toISOString(),
            bozza: 0,
            id_blog: 4,
            id_autore: 4,
            likes: 6
        },
        {
            id: 6,
            titolo: 'La pasta alla Norma: la ricetta originale siciliana',
            testo: 'La pasta alla Norma è un piatto iconico della cucina catanese. Melanzane fritte, pomodoro San Marzano, ricotta salata e basilico: ecco come prepararla rispettando la tradizione. I segreti per melanzane perfette e il sugo più autentico.',
            immagine: null,
            alt_descrizione: '',
            data_ora: new Date('2025-03-01').toISOString(),
            bozza: 0,
            id_blog: 2,
            id_autore: 2,
            likes: 15
        },
        {
            id: 7,
            titolo: 'Dark Mode: best practices per il web',
            testo: 'Implementare una dark mode efficace non è banale. Vediamo le best practices: CSS custom properties, prefers-color-scheme, transizioni fluide e accessibilità. Come evitare i classici errori che rendono la dark mode inutilizzabile.',
            immagine: null,
            alt_descrizione: '',
            data_ora: new Date('2025-03-02').toISOString(),
            bozza: 0,
            id_blog: 1,
            id_autore: 1,
            likes: 10
        }
    ],
    comments: [
        { id: 1, id_post: 1, id_autore: 2, testo: 'Ottima guida, molto utile!', data_ora: new Date('2025-02-28').toISOString() },
        { id: 2, id_post: 1, id_autore: 3, testo: 'Finalmente qualcuno che spiega Grid bene.', data_ora: new Date('2025-02-28').toISOString() },
        { id: 3, id_post: 4, id_autore: 1, testo: 'Lisbona è fantastica, ci voglio tornare!', data_ora: new Date('2025-02-16').toISOString() },
        { id: 4, id_post: 6, id_autore: 1, testo: 'Da siciliano approvo questa ricetta 🍝', data_ora: new Date('2025-03-01').toISOString() },
        { id: 5, id_post: 7, id_autore: 4, testo: 'Proprio quello che cercavo per il mio progetto!', data_ora: new Date('2025-03-02').toISOString() },
    ],
    likes: [],
    follows: [],
    saved_posts: [
        { id_utente: 1, id_post: 4 },
        { id_utente: 1, id_post: 6 },
    ],
    polls: [],
    poll_votes: [],
    categories: [
        { id: 1, nome_categoria: 'Tecnologia', id_genitore: null },
        { id: 2, nome_categoria: 'Cucina', id_genitore: null },
        { id: 3, nome_categoria: 'Viaggi', id_genitore: null },
        { id: 4, nome_categoria: 'Programmazione', id_genitore: 1 },
        { id: 5, nome_categoria: 'Ricette Italiane', id_genitore: 2 }
    ],
    themes: [
        { id: 'Stile1', nome: 'Classico (default)' },
        { id: 'Stile2', nome: 'Elegante' },
        { id: 'Stile3', nome: 'Ceruleo' },
        { id: 'Stile4', nome: 'Naturale' }
    ],
    currentUser: null
};

// Reset database to defaults
function resetDB() {
    localStorage.removeItem(DB_KEY);
    localStorage.setItem(DB_KEY, JSON.stringify(defaultData));
}

// Initialize the database
function initDB() {
    const data = localStorage.getItem(DB_KEY);
    if (!data) {
        localStorage.setItem(DB_KEY, JSON.stringify(defaultData));
    } else {
        let parsed = JSON.parse(data);
        let modified = false;

        const sanitizeImage = (imgName) => {
            if (!imgName) return imgName;
            // Estrai nome base senza .webp
            let cleanName = imgName.replace(/(\.webp)+$/, '');
            return cleanName + '.webp'; // Forza sempre esattamente un solo .webp
        };

        if (parsed.users) {
            parsed.users.forEach(u => {
                if (u.immagine_profilo) {
                    let oldImg = u.immagine_profilo;
                    u.immagine_profilo = sanitizeImage(u.immagine_profilo);
                    if (oldImg !== u.immagine_profilo) modified = true;
                }
            });
        }
        if (parsed.currentUser && parsed.currentUser.immagine_profilo) {
            let oldImg = parsed.currentUser.immagine_profilo;
            parsed.currentUser.immagine_profilo = sanitizeImage(parsed.currentUser.immagine_profilo);
            if (oldImg !== parsed.currentUser.immagine_profilo) modified = true;
        }

        if (modified) {
            localStorage.setItem(DB_KEY, JSON.stringify(parsed));
        }
    }
}

// Get the entire database object
function getDB() {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : defaultData;
}

// Save the entire database object
function saveDB(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
}

// --- User Functions ---

function loginUser(emailOrUsername, password) {
    const db = getDB();
    const user = db.users.find(u => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password);
    if (user) {
        db.currentUser = user;
        saveDB(db);
        return { success: true, user };
    }
    return { success: false, error: 'Email o password errati.' };
}

function logoutUser() {
    const db = getDB();
    db.currentUser = null;
    saveDB(db);
}

function getCurrentUser() {
    return getDB().currentUser;
}

function isUserLoggedIn() {
    return getCurrentUser() !== null;
}

function registerUser(userData) {
    const db = getDB();

    // Check if email or username already exists
    if (db.users.some(u => u.email === userData.email)) {
        return { success: false, error: 'Email già registrata.' };
    }
    if (db.users.some(u => u.username === userData.username)) {
        return { success: false, error: 'Username già in uso.' };
    }

    const newUser = {
        id: db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
        nome: userData.nome,
        cognome: userData.cognome,
        username: userData.username,
        email: userData.email,
        password: userData.password, // Storing plain text for this mock
        bio: userData.bio || '',
        isPremium: 0,
        immagine_profilo: 'Pic1.webp',
    };

    db.users.push(newUser);
    db.currentUser = newUser; // Auto-login after registration
    saveDB(db);
    return { success: true, user: newUser };
}

// --- Data Retrieval & Manipulation Functions ---
// (We will add more as needed for specific pages like getting posts, comments, etc.)

function getAllPosts() {
    const db = getDB();
    // Return posts enriched with author and blog details
    return db.posts
        .filter(post => post.bozza === 0)
        .map(post => {
            const author = db.users.find(u => u.id === post.id_autore);
            const blog = db.blogs.find(b => b.id === post.id_blog);
            return { ...post, author, blog };
        })
        .sort((a, b) => new Date(b.data_ora) - new Date(a.data_ora)); // Newest first
}

// Initialize on script load
initDB();

window.mockDB = {
    initDB,
    resetDB,
    getDB,
    saveDB,
    loginUser,
    logoutUser,
    getCurrentUser,
    isUserLoggedIn,
    registerUser,
    getAllPosts
};
