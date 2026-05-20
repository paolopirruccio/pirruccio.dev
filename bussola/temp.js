    <script>
        const API_URL = "https://unipi.prod.up.cineca.it/api/Impegni/getImpegniCalendarioPubblico";
        const CLIENTE_ID = "628de8b9b63679f193b87046";
        const DATA_URL = "https://raw.githubusercontent.com/plumkewe/dove-unipi/main/data/unified.json";

        const POLES = {
            fibonacci: { name: "Polo Fibonacci", id: "63223a029f080a0aab032afc" },
            guidotti: { name: "Polo Guidotti", id: "63223a309f080a0aab032b0a" }

        };

        let weeklyEvents = [];
        let dataLoaded = false;
        let dataError = false;
        let roomsData = [];

        const searchInput = document.getElementById('search-input');
        const resultsList = document.getElementById('results-list');
        const resultsTotal = document.getElementById('results-total');
        const initialStateHtml = '';

        document.fonts.ready.then(() => {
            document.body.classList.add('remixicon-loaded');
        });

        const DAYS_IT = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
        const MONTHS_IT = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

        function getWeekRange() {
            const now = new Date();
            const day = now.getDay();
            const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1);

            const monday = new Date(now.setDate(diffToMonday));
            monday.setHours(0, 0, 0, 0);

            const saturday = new Date(monday);
            saturday.setDate(monday.getDate() + 5);
            saturday.setHours(23, 59, 59, 999);

            return {
                start: monday.toISOString().split('T')[0] + "T00:00:00.000Z",
                end: saturday.toISOString().split('T')[0] + "T23:59:59.999Z"
            };
        }

        function matchesRoom(aula, room) {
            const code = aula.codice?.toUpperCase().trim() || "";
            const roomCode = code.replace(/^(FIB|ING)\s+/i, '').trim();
            const roomName = room.name.toUpperCase().replace(/^(AULA|SALA)\s+/i, '').trim();
            return roomCode === roomName;
        }

        async function fetchRooms() {
            try {
                const res = await fetch(DATA_URL);
                const data = await res.json();
                const fib = data.polo.fibonacci.edificio;
                for (const eId in fib) {
                    const b = fib[eId];
                    const bName = b.alias ? b.alias[0] : (b.text || "Edificio");
                    for (const fId in b.piano) {
                        b.piano[fId].forEach(r => {
                            if (r.type === 'aula' || r.hasStatus) {
                                let routeCode = r.link ? new URLSearchParams(r.link.split('?')[1]).get('c') : null;
                                if (!routeCode) routeCode = r.nome.replace(/^(Aula|Sala)\s+/i, '').toLowerCase().replace(/\s/g, '');
                                roomsData.push({
                                    id: r.id,
                                    name: r.nome,
                                    building: bName,
                                    floor: fId,
                                    routeCode: routeCode
                                });
                            }
                        });
                    }
                }
            } catch (e) {
                console.warn("Errore fetch unified data:", e);
            }
        }

        function formatDateToItaliano(dateString) {
            const d = new Date(dateString);
            return `${DAYS_IT[d.getDay()]} ${d.getDate()} ${MONTHS_IT[d.getMonth()]}`;
        }

        function isPastEvent(dateString) {
            return new Date(dateString) < new Date();
        }

        async function fetchWeeklySchedule() {
            const range = getWeekRange();
            dataLoaded = false;
            dataError = false;

            const badge = document.getElementById('week-badge');
            if (badge) {
                const mondayDate = new Date(range.start);
                badge.innerHTML = `<i class="ri-calendar-line"></i> Settimana dal ${mondayDate.getDate()} ${MONTHS_IT[mondayDate.getMonth()]}`;
            }

            try {
                if (roomsData.length === 0) await fetchRooms();

                const bodyTemplate = {
                    mostraImpegniAnnullati: false,
                    mostraIndisponibilitaTotali: false,
                    clienteId: CLIENTE_ID,
                    limitaRisultati: false,
                    dataInizio: range.start,
                    dataFine: range.end
                };

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 15000);

                const requests = Object.entries(POLES).map(async ([key, val]) => {
                    try {
                        const res = await fetch(API_URL, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ...bodyTemplate, linkCalendarioId: val.id }),
                            signal: controller.signal
                        });

                        if (res.ok) {
                            const data = await res.json();
                            return data.map(e => ({
                                ...e,
                                poloNome: val.name,
                                poloKey: key
                            }));
                        }
                    } catch (e) {
                        if (e.name === 'AbortError') {
                            console.warn(`Timeout fetch polo ${key}`);
                        } else {
                            console.warn(`Errore fetch polo ${key}:`, e);
                        }
                    }
                    return [];
                });

                const results = await Promise.all(requests);
                clearTimeout(timeoutId);

                weeklyEvents = results.flat().filter(e => {
                    return e.evento?.dettagliDidattici?.[0]?.nome || e.evento?.tipoAttivita?.descrizione;
                });

                dataLoaded = true;
                renderResults();

            } catch (err) {
                console.error('Errore fetch Cineca:', err);
                dataLoaded = true;
                dataError = true;
                renderResults();
            }
        }

        function renderResults() {
            const query = searchInput.value.toLowerCase().trim();
            const resultsBar = document.getElementById('results-bar');

            if (query.length > 0 && query.length < 3) {
                resultsList.innerHTML = `
                        <div class="no-results" style="padding: 2rem; border: none; background: transparent;">
                            <i class="ri-keyboard-line" style="font-size: 2rem; display: block; margin-bottom: 0.5rem; color: var(--text-secondary);"></i>
                            <h3 style="margin-bottom: 0.2rem; color: var(--text-primary); font-family: var(--font-display); font-size: 1.2rem; font-weight: 400;">Continua a digitare...</h3>
                            <p style="font-size: 0.9rem; color: var(--text-secondary);">Inserisci almeno 3 caratteri per iniziare la ricerca.</p>
                        </div>
                    `;
                resultsTotal.textContent = "0";
                return;
            }

            if (query.length === 0) {
                resultsList.innerHTML = initialStateHtml;
                document.getElementById('results-count-container').style.display = 'none';
                resultsTotal.textContent = "0";
                return;
            }

            document.getElementById('results-count-container').style.display = 'flex';

            resultsBar.style.display = 'flex';

            if (!dataLoaded) {
                resultsList.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; padding: 4rem 0; gap: 1rem;">
                        <div class="spinner"></div>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Caricamento lezioni in corso...</p>
                    </div>`;
                return;
            }

            if (dataError && weeklyEvents.length === 0) {
                resultsList.innerHTML = `
                    <div class="no-results" style="padding: 3rem 1rem; text-align: center;">
                        <i class="ri-wifi-off-line" style="font-size: 2.5rem; display: block; margin-bottom: 1rem; color: var(--text-secondary); opacity: 0.5;"></i>
                        <h3 style="font-family: var(--font-display); font-size: 1.4rem; color: var(--text-primary); margin-bottom: 0.5rem; font-weight: 400;">Errore di connessione</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">Impossibile caricare le lezioni. Controlla la connessione e riprova.</p>
                        <button onclick="dataLoaded=false; dataError=false; renderResults(); fetchWeeklySchedule();" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); color: var(--text-primary); padding: 0.6rem 1.5rem; border-radius: 12px; font-family: var(--font-family); font-size: 0.9rem; cursor: pointer; transition: all 0.2s;">Riprova</button>
                    </div>`;
                resultsTotal.textContent = "0";
                return;
            }

            const filtered = weeklyEvents.filter(e => {
                const nome = (e.evento?.dettagliDidattici?.[0]?.nome || e.evento?.tipoAttivita?.descrizione || '').toLowerCase();
                if (nome.includes(query)) return true;

                const docenti = e.docenti || [];
                const nomeDocenti = docenti.map(d => `${d.nome} ${d.cognome}`).join(' ').toLowerCase();
                if (nomeDocenti.includes(query)) return true;

                return false;
            });

            filtered.sort((a, b) => new Date(a.dataInizio) - new Date(b.dataInizio));

            resultsTotal.textContent = filtered.length;

            if (filtered.length === 0) {
                resultsList.innerHTML = `
                <div class="no-results" style="padding: 4rem 1rem; text-align: center;">
                    <i class="ri-presentation-line" style="font-size: 3rem; display: block; margin-bottom: 1.5rem; color: var(--text-secondary); opacity: 0.5;"></i>
                    <h2 style="font-family: var(--font-display); font-size: 2rem; font-style: italic; color: var(--text-primary); margin-bottom: 0.5rem; font-weight: 400;">Nessuna lezione trovata</h2>
                    <p style="color: var(--text-secondary); font-size: 1rem; max-width: 400px; margin: 0 auto;">Prova con un altro nome di corso, professore o aula.</p>
                </div>
            `;
                return;
            }

            const groupedByDay = filtered.reduce((acc, event) => {
                const dayKey = formatDateToItaliano(event.dataInizio);
                if (!acc[dayKey]) acc[dayKey] = [];
                acc[dayKey].push(event);
                return acc;
            }, {});

            let html = "";
            const todayStr = formatDateToItaliano(new Date());

            for (const [day, events] of Object.entries(groupedByDay)) {
                const isToday = day === todayStr;
                html += `
                        <div class="day-group fade-in-card ${isToday ? 'today' : ''}">
                            <i class="${isToday ? 'ri-calendar-check-fill' : 'ri-calendar-event-line'}"></i> ${isToday ? 'Oggi, ' + day : day}
                        </div>
                    `;

                events.forEach(item => {
                    const nome = item.evento?.dettagliDidattici?.[0]?.nome || item.evento?.tipoAttivita?.descrizione || 'Corso Sconosciuto';
                    const auleText = item.risorse?.filter(r => r.aula).map(r => r.aula.descrizione || r.aula.nome).join(', ') || 'Aula da definire';

                    const docentiList = item.docenti || [];
                    const profHtml = docentiList.length > 0
                        ? docentiList.map(d => `<span class="prof-badge"><i class="ri-user-line"></i> ${d.nome} ${d.cognome}</span>`).join('')
                        : '';

                    const start = new Date(item.dataInizio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const end = new Date(item.dataFine).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const past = isPastEvent(item.dataFine);

                    let mapUrlUrl = "https://plumkewe.github.io/dove-unipi/";
                    if (item.risorse && item.risorse.length > 0 && item.poloKey === 'fibonacci') {
                        const cinecaAula = item.risorse[0].aula;
                        const matchedRoom = roomsData.find(r => matchesRoom(cinecaAula, r));

                        if (matchedRoom) {
                            mapUrlUrl = `https://plumkewe.github.io/dove-unipi/?p=${item.poloKey}&c=${matchedRoom.routeCode}`;
                        } else {
                            const rName = cinecaAula?.nome || "";
                            const cleanRoomName = rName.replace(/^(Aula|Sala)\s+/i, '').toLowerCase().replace(/\s/g, '');
                            if (cleanRoomName) {
                                mapUrlUrl = `https://plumkewe.github.io/dove-unipi/?p=${item.poloKey}&c=${cleanRoomName}`;
                            }
                        }
                    }

                    html += `
                            <div class="course-card fade-in-card">
                                <div class="course-header">
                                    <div class="course-title">${nome.split('-')[0].trim()}</div>
                                    <div class="course-time-badge ${past ? 'past' : ''}">
                                        <i class="ri-time-line"></i> ${start} - ${end}
                                    </div>
                                </div>
                                <div class="course-details">
                                    ${profHtml ? `<div class="detail-row" style="flex-wrap: wrap; margin-bottom: 0.2rem;">${profHtml}</div>` : ''}
                                    <div class="detail-row">
                                        <i class="ri-building-4-line"></i> 
                                        <span>${item.poloNome}</span>
                                    </div>
                                    <div class="detail-row">
                                        <i class="ri-map-pin-line" style="color: var(--accent);"></i> 
                                        <a href="${mapUrlUrl}" target="_blank" style="color: var(--text-primary); font-weight: 500; text-decoration: underline; text-decoration-color: rgba(255,255,255,0.2); text-underline-offset: 4px;">
                                            ${auleText}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        `;
                });

                resultsList.innerHTML = html;
            }

            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase().trim();
                const resultsBar = document.getElementById('results-bar');
                const clearBtn = document.getElementById('search-clear');

                if (clearBtn) {
                    if (searchInput.value.length > 0) {
                        clearBtn.classList.add('visible');
                    } else {
                        clearBtn.classList.remove('visible');
                    }
                }

                if (query.length > 0 && query.length < 3) {
                    resultsList.innerHTML = `
                        <div class="no-results" style="padding: 2rem; border: none; background: transparent;">
                            <i class="ri-keyboard-line" style="font-size: 2rem; display: block; margin-bottom: 0.5rem; color: var(--text-secondary);"></i>
                            <h3 style="margin-bottom: 0.2rem; color: var(--text-primary); font-family: var(--font-display); font-size: 1.2rem; font-weight: 400;">Continua a digitare...</h3>
                            <p style="font-size: 0.9rem; color: var(--text-secondary);">Inserisci almeno 3 caratteri per iniziare la ricerca.</p>
                        </div>
                    `;
                    resultsTotal.textContent = "0";
                } else if (query.length === 0) {
                    resultsList.innerHTML = initialStateHtml;
                    document.getElementById('results-count-container').style.display = 'none';
                    resultsTotal.textContent = "0";
                }

                clearTimeout(window.searchTimeout);
                window.searchTimeout = setTimeout(renderResults, 300);
            });

            const clearBtn = document.getElementById('search-clear');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    searchInput.value = '';
                    clearBtn.classList.remove('visible');
                    searchInput.dispatchEvent(new Event('input'));
                    searchInput.focus();
                });
            }

            fetchWeeklySchedule();

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            });

            const originalRenderResults = renderResults;
            renderResults = function () {
                originalRenderResults();
                setTimeout(() => {
                    document.querySelectorAll('.fade-in-card:not(.visible)').forEach(card => {
                        observer.observe(card);
                    });
                }, 50);
            };

            window.addEventListener('scroll', () => {
                const scrollBtn = document.querySelector('.scroll-buttons');
                if (!scrollBtn) return;
                if (window.scrollY > 200) {
                    scrollBtn.classList.add('visible');
                } else {
                    scrollBtn.classList.remove('visible');
                }
            });
            window.dispatchEvent(new Event('scroll'));
        });
    </script>
