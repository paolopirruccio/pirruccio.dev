class GoogleSheetsAPI {
    constructor() {
        this.config = window.SHEETS_CONFIG;
        this.webAppUrl = this.config.WEB_APP_URL;
        this.cache = new Map();
        this.cacheTimeout = 60000;
    }

    async readSheet(sheetName) {
        const cacheKey = `sheet_${sheetName}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                if (Date.now() - parsed.timestamp < this.cacheTimeout) {
                    return parsed.data;
                }
            } catch (e) { }
        }

        if (!this.webAppUrl || this.webAppUrl.includes('YOUR_WEB_APP_URL')) {
            return this.getDemoData(sheetName);
        }

        let baseUrl = this.webAppUrl.trim();
        if (baseUrl.includes('?')) baseUrl = baseUrl.split('?')[0];

        try {
            const url = `${baseUrl}?sheet=${sheetName}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const result = await response.json();
            if (result.error) throw new Error(result.error);

            const data = Array.isArray(result) ? result : [];

            localStorage.setItem(cacheKey, JSON.stringify({
                data,
                timestamp: Date.now()
            }));

            return data;
        } catch (error) {
            throw new Error(`Load Failed: ${error.message}`);
        }
    }

    async appendRow(sheetName, data) {
        return this.sendPost({
            sheet: sheetName,
            action: 'append',
            data: data
        });
    }

    async updateRow(sheetName, rowIndex, data) {
        return this.sendPost({
            sheet: sheetName,
            action: 'update',
            rowIndex: rowIndex,
            data: data
        });
    }

    async sendPost(payload) {
        if (!this.webAppUrl || this.webAppUrl.includes('YOUR_WEB_APP_URL')) {
            await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
            return { status: 'demo_success' };
        }

        try {
            const response = await fetch(this.webAppUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(payload)
            });

            const text = await response.text();
            let result;
            try {
                result = JSON.parse(text);
            } catch (e) {
                throw new Error('Risposta server non valida');
            }

            if (result.error) throw new Error(result.error);

            localStorage.removeItem(`sheet_${payload.sheet}`);

            return result;
        } catch (error) {
            throw error;
        }
    }

    getDemoData(sheetName) {
        const demoData = {
            Events: [
                { id: 'sushi', name: 'Sushi', emoji: '🍣', description: 'All You Can Eat', active: true },
                { id: 'goblin', name: 'Goblin Cafe', emoji: '🎲', description: 'Giochi da tavolo', active: true },
                { id: 'ramen', name: 'Ramen', emoji: '🍜', description: 'Noodles caldi', active: true }
            ],
            Users: [],
            Preferences: [],
            Availability: []
        };
        return demoData[sheetName] || [];
    }
}

window.api = new GoogleSheetsAPI();
