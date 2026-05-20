/**
 * auth.js
 * Handles Login and Registration logic, interacting with db.js
 */

document.addEventListener('DOMContentLoaded', () => {

    // Redirect if already logged in
    if (window.mockDB && window.mockDB.isUserLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }

    const loginTab = document.getElementById('tab-login');
    const registerTab = document.getElementById('tab-registrati');
    const loginForm = document.getElementById('formLogin');
    const registerForm = document.getElementById('formRegistrazione');
    const messageContainer = document.getElementById('messaggio-container');

    function showMessage(msg, type) {
        mostraMessaggio(msg, type);
    }

    // Toggle Forms
    if (loginTab && registerTab) {
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('attivo');
            loginTab.classList.remove('inattivo');
            registerTab.classList.add('inattivo');
            registerTab.classList.remove('attivo');
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        });

        registerTab.addEventListener('click', () => {
            registerTab.classList.add('attivo');
            registerTab.classList.remove('inattivo');
            loginTab.classList.add('inattivo');
            loginTab.classList.remove('attivo');
            registerForm.style.display = 'block';
            loginForm.style.display = 'none';
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const res = window.mockDB.loginUser(email, password);
            if (res.success) {
                window.location.href = 'index.html';
            } else {
                showMessage(res.error, 'errore');
            }
        });
    }

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfermaPassword').value;

            if (password !== confirmPassword) {
                showMessage('Le password non coincidono.', 'errore');
                return;
            }

            const userData = {
                nome: document.getElementById('registerNome').value,
                cognome: document.getElementById('registerCognome').value,
                email: document.getElementById('registerEmail').value,
                username: document.getElementById('registerUsername').value,
                password: password,
                bio: document.getElementById('registerBio').value
            };

            const res = window.mockDB.registerUser(userData);

            if (res.success) {
                // Auto login and redirect
                window.location.href = 'index.html';
            } else {
                showMessage(res.error, 'errore');
            }
        });
    }

    // Setup password toggle visibility
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const input = this.previousElementSibling;
            if (input.getAttribute('type') === 'password') {
                input.setAttribute('type', 'text');
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.setAttribute('type', 'password');
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Character counters for registration form
    const setupCounter = (inputId, counterId, maxLen) => {
        const input = document.getElementById(inputId);
        const counter = document.getElementById(counterId);
        if (input && counter) {
            input.addEventListener('input', () => {
                counter.textContent = input.value.length;
            });
        }
    };

    setupCounter('registerNome', 'contatoreCaratteriNome', 50);
    setupCounter('registerCognome', 'contatoreCaratteriCognome', 50);
    setupCounter('registerEmail', 'contatoreCaratteriEmail', 250);
    setupCounter('registerUsername', 'contatoreCaratteriUsername', 12);
    setupCounter('registerPassword', 'contatoreCaratteriPassword', 10);
    setupCounter('registerConfermaPassword', 'contatoreCaratteriConfermaPassword', 10);
    setupCounter('registerBio', 'contatoreCaratteriBio', 250);
});
