
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyrm177TePqYDb0ubpsH-6wsng9T9Y8C_8Lo6szcAmiv7IHiU75JjyHBcRSdy2l6uSh9g/exec';

const SHEET_NAMES = {
    events: 'Events',
    users: 'Users',
    preferences: 'Preferences',
    availability: 'Availability'
};

window.SHEETS_CONFIG = {
    WEB_APP_URL,
    SHEET_NAMES
};
