(function () {
    const DATA_URL = 'https://raw.githubusercontent.com/plumkewe/dove-unipi/main/data/unified.json';
    const buildingSelect = document.getElementById('orientati-building');
    const searchInput = document.getElementById('orientati-search');
    const results = document.getElementById('orientati-results');
    const filters = document.querySelector('.orientati-filters');
    const categoryButtons = Array.from(document.querySelectorAll('.orientati-category'));
    let activeCategory = null;
    let entries = [];
    let loadFailed = false;
    filters.hidden = true;
    results.hidden = true;

    function flattenPolo(data) {
        const buildings = data && data.polo && data.polo.fibonacci && data.polo.fibonacci.edificio;
        if (!buildings) return [];
        const output = [];
        Object.entries(buildings).forEach(([key, building]) => {
            const sourceBuildingName = (building.alias && building.alias[0]) || building.text || `Edificio ${key.toUpperCase()}`;
            const isMainBuilding = key.toUpperCase() === 'B' || /\bprincipale\b/i.test(sourceBuildingName);
            const buildingName = isMainBuilding ? 'B (Principale)' : sourceBuildingName;
            const mappedEntries = [];
            Object.entries(building.piano || {}).forEach(([floor, places]) => {
                (places || []).forEach(place => {
                    const link = place.link || place.url;
                    if (!place.nome || !link) return;
                    const parsed = new URL(link, window.location.href);
                    if (parsed.protocol !== 'https:' || parsed.hostname !== 'plumkewe.github.io') return;
                    const record = {
                        name: place.cognome || place.nome,
                        type: place.type || 'sala',
                        building: buildingName,
                        floor,
                        search: [place.nome, place.cognome, place.ricerca, ...(place.alias || [])].filter(Boolean).join(' ').toLocaleLowerCase('it'),
                        link: parsed.href
                    };
                    output.push(record);
                    if (record.type !== 'persona' && record.type !== 'erogatore_acqua') mappedEntries.push(record);
                });
            });
            if (mappedEntries.length) {
                output.push({
                    name: isMainBuilding ? buildingName : (buildingName.toLowerCase().startsWith('edificio') ? buildingName : `Edificio ${building.text || key.toUpperCase()}`),
                    type: 'building',
                    building: buildingName,
                    floor: '',
                    search: `${buildingName} edificio ${key}`.toLocaleLowerCase('it'),
                    link: mappedEntries[0].link
                });
            }
        });
        return output;
    }

    function categoryEntries() {
        if (!activeCategory) return entries;
        if (activeCategory === 'building') return entries.filter(item => item.type === 'building');
        if (activeCategory === 'other') return entries.filter(item => ['sala', 'dipartimento', 'biblioteca', 'erogatore_acqua'].includes(item.type));
        return entries.filter(item => item.type === activeCategory);
    }

    function updateFilters() {
        const showFilters = Boolean(activeCategory) && activeCategory !== 'building';
        filters.hidden = !showFilters;
        if (!showFilters) {
            buildingSelect.value = '';
            searchInput.value = '';
            return;
        }

        const previousBuilding = buildingSelect.value;
        const availableBuildings = [...new Set(categoryEntries().map(item => item.building))]
            .sort((a, b) => a.localeCompare(b, 'it'));
        buildingSelect.replaceChildren(buildingSelect.options[0]);
        availableBuildings.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            buildingSelect.appendChild(option);
        });
        buildingSelect.value = availableBuildings.includes(previousBuilding) ? previousBuilding : '';
    }

    function render() {
        results.replaceChildren();
        if (!activeCategory) {
            results.hidden = true;
            return;
        }
        results.hidden = false;
        if (loadFailed) {
            const status = document.createElement('p');
            status.className = 'orientati-status';
            status.textContent = window.BussolaI18n ? BussolaI18n.t('orientati_load_error') : 'Non riesco a caricare ora i luoghi. Puoi comunque aprire la mappa completa qui sotto.';
            results.appendChild(status);
            return;
        }
        const building = buildingSelect.value;
        const query = searchInput.value.trim().toLocaleLowerCase('it');
        const matches = categoryEntries().filter(item => (!building || item.building === building) && (!query || item.search.includes(query)));
        if (!matches.length) {
            const empty = document.createElement('p');
            empty.className = 'orientati-status';
            empty.textContent = window.BussolaI18n ? BussolaI18n.t('orientati_no_results') : 'Nessun risultato. Prova a cambiare categoria o ricerca.';
            results.appendChild(empty);
            return;
        }
        matches.forEach(item => {
            const link = document.createElement('a');
            link.className = 'orientati-result';
            link.href = item.link;
            link.setAttribute('aria-label', `${item.name}, ${item.building}`);
            const text = document.createElement('span');
            text.textContent = item.name;
            const detail = document.createElement('small');
            detail.textContent = [item.building, item.floor ? `${BussolaI18n.t('aule_floor')} ${item.floor}` : ''].filter(Boolean).join(' · ');
            text.appendChild(detail);
            const icon = document.createElement('i');
            icon.className = 'ri-arrow-right-up-line';
            icon.setAttribute('aria-hidden', 'true');
            link.append(text, icon);
            results.appendChild(link);
        });
    }

    function setCategory(category) {
        activeCategory = activeCategory === category ? null : category;
        categoryButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === activeCategory)));
        updateFilters();
        render();
    }

    categoryButtons.forEach(button => button.addEventListener('click', () => setCategory(button.dataset.category)));
    buildingSelect.addEventListener('change', render);
    searchInput.addEventListener('input', render);

    if (window.BussolaI18n) BussolaI18n.applyDataI18n(BussolaI18n.getLang());
    fetch(DATA_URL)
        .then(response => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); })
        .then(data => {
            entries = flattenPolo(data);
            updateFilters();
            render();
        })
        .catch(error => {
            console.warn('Impossibile caricare la mappa DOVE?UNIPI:', error);
            loadFailed = true;
            buildingSelect.disabled = true;
            render();
        });
})();
