document.addEventListener('DOMContentLoaded', function() {
    const maxSottocategorie = 5;
    const maxCollaboratori = 5;

    const aggiungiSottocategoriaButton = document.getElementById('aggiungiSottocategoria');
    const sottocategorieContainer = document.getElementById('sottocategorie');

    const aggiungiCollaboratoreButton = document.getElementById('aggiungiCollaboratore');
    const collaboratoriContainer = document.getElementById('collaboratori');

    function removeExcessiveSpaces(input) {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/\s+/g, ' ').trim();
        });
    }
    function addRemoveListener(button) {
        button.addEventListener('click', function() {
            this.closest('.todo-item').remove();
        });
    }
    function updateCharacterCount(input) {
        const counter = input.nextElementSibling.querySelector('span');
        input.addEventListener('input', function() {
            counter.textContent = this.value.length;
        });

        counter.textContent = input.value.length;
    }
    aggiungiSottocategoriaButton.addEventListener('click', function() {
        if (sottocategorieContainer.children.length < maxSottocategorie) {
            const newItem = document.createElement('div');
            newItem.classList.add('todo-item');
            newItem.innerHTML = `
                <button type="button" class="rimuovi-campo"><i class="fas fa-minus-circle"></i></button>
                <input type="text" name="sottocategorie[]" value="" maxlength="25" required>
                <div class="contatore-caratteri">
                    <span>0</span>/25
                </div>
            `;
            sottocategorieContainer.appendChild(newItem);

            const input = newItem.querySelector('input');
            removeExcessiveSpaces(input);
            updateCharacterCount(input);
            addRemoveListener(newItem.querySelector('.rimuovi-campo'));
        } else {
            $.post('set_messaggio.php', { message: 'Puoi aggiungere un massimo di 5 sottocategorie.', type: 'error' }, function() {
                location.reload();
            });
        }
    });
    aggiungiCollaboratoreButton.addEventListener('click', function() {
        if (collaboratoriContainer.children.length < maxCollaboratori) {
            const newItem = document.createElement('div');
            newItem.classList.add('todo-item');
            newItem.innerHTML = `
                <button type="button" class="rimuovi-campo"><i class="fas fa-minus-circle"></i></button>
                <input type="text" name="coEditors[]" value="" maxlength="20" required class="username-input" autocomplete="off">
                <div class="contatore-caratteri">
                    <span>0</span>/20
                </div>
                <div class="suggestion-box"></div>
            `;
            collaboratoriContainer.appendChild(newItem);

            const input = newItem.querySelector('input');
            setupAutocomplete(input);
            removeExcessiveSpaces(input);
            updateCharacterCount(input);
            addRemoveListener(newItem.querySelector('.rimuovi-campo'));
        } else {
            $.post('set_messaggio.php', { message: 'Puoi aggiungere un massimo di 5 collaboratori.', type: 'error' }, function() {
                location.reload();
            });
        }
    });

    document.querySelectorAll('#collaboratori .todo-item input').forEach(input => {
        setupAutocomplete(input);
        removeExcessiveSpaces(input);
        addRemoveListener(input.closest('.todo-item').querySelector('.rimuovi-campo'));
        updateCharacterCount(input);
    });
    document.querySelectorAll('#sottocategorie .todo-item input').forEach(input => {
        removeExcessiveSpaces(input);
        addRemoveListener(input.closest('.todo-item').querySelector('.rimuovi-campo'));
        updateCharacterCount(input);
    });

    function setupAutocomplete(input) {
        const suggestionBox = input.nextElementSibling.nextElementSibling;

        input.addEventListener('input', function() {
            const term = this.value.trim();

            if (term.length > 0) {
                fetch(`cerca_utenti.php?term=${encodeURIComponent(term)}`)
                    .then(response => response.json())
                    .then(data => {
                        suggestionBox.innerHTML = '';
                        if (data.length > 0) {
                            data.forEach(username => {
                                const option = document.createElement('div');
                                option.className = 'suggestion-item';
                                option.textContent = username;
                                suggestionBox.appendChild(option);

                                option.addEventListener('click', function() {
                                    input.value = username;
                                    suggestionBox.innerHTML = '';
                                    suggestionBox.style.display = 'none';
                                });
                            });
                            suggestionBox.style.display = 'block';
                        } else {
                            suggestionBox.style.display = 'none';
                        }
                    });
            } else {
                suggestionBox.innerHTML = '';
                suggestionBox.style.display = 'none';
            }
        });

        input.addEventListener('blur', function() {
            setTimeout(() => suggestionBox.style.display = 'none', 200);
        });

        input.addEventListener('focus', function() {
            if (this.value.trim().length > 0 && suggestionBox.innerHTML !== '') {
                suggestionBox.style.display = 'block';
            }
        });
    }

    const titoloBlogInput = document.getElementById('titoloBlog');
    const taglineBlogInput = document.getElementById('taglineBlog');
    const descrizioneBlogInput = document.getElementById('descrizioneBlog');
    const categoriaInput = document.getElementById('categoria');

    removeExcessiveSpaces(categoriaInput);
    updateCharacterCount(titoloBlogInput);
    updateCharacterCount(taglineBlogInput);
    updateCharacterCount(descrizioneBlogInput);
    updateCharacterCount(categoriaInput);

    sottocategorieContainer.querySelectorAll('.todo-item input').forEach(input => {
        removeExcessiveSpaces(input);
        updateCharacterCount(input);
    });
    collaboratoriContainer.querySelectorAll('.todo-item input').forEach(input => {
        removeExcessiveSpaces(input);
        updateCharacterCount(input);
    });

    window.showOverlay = function(overlayId) {
        document.getElementById(overlayId).classList.add('active');
    };

    window.hideOverlay = function(overlayId) {
        document.getElementById(overlayId).classList.remove('active');
    };

    document.getElementById('confermaEliminaBlog').addEventListener('click', function() {
        showOverlay('overlayEliminaBlog');
    });

    document.getElementById('formBlog').addEventListener('submit', function(e) {
        const titolo = document.getElementById('titoloBlog').value;
        const tagline = document.getElementById('taglineBlog').value;
        const descrizione = document.getElementById('descrizioneBlog').value;
        const categoria = document.getElementById('categoria').value;

        const patternTitleDescriptionTagline = /^[a-zA-Z0-9\s.,:;!?()'àèéìòùÀÈÉÌÒÙ\-']+$/u;
        const patternCategory = /^[a-zA-Z\sàèéìòùÀÈÉÌÒÙ]+$/u;

        if (!patternTitleDescriptionTagline.test(titolo) || 
            !patternTitleDescriptionTagline.test(tagline) || 
            !patternTitleDescriptionTagline.test(descrizione) ||
            !patternCategory.test(categoria)) {
            e.preventDefault();
            $.post('set_messaggio.php', { message: 'Hai inserito caratteri non validi nei campi del form.', type: 'error' }, function() {
                location.reload();
            });
        }

        const sottocategorie = document.querySelectorAll('#sottocategorie input');
        for (let sottocategoria of sottocategorie) {
            if (!patternCategory.test(sottocategoria.value)) {
                e.preventDefault();
                $.post('set_messaggio.php', { message: 'Hai inserito caratteri non validi in una sottocategoria.', type: 'error' }, function() {
                    location.reload();
                });
                break;
            }
        }
    });
});
