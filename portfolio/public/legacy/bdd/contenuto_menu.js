/**
 * contenuto_menu.js
 * Post/Poll context menu fully powered by mockDB (localStorage).
 */

$(document).ready(function () {
    setupMenuEventListeners();
    setupPostEventListeners();
    createOverlayMenu();
    createOverlayConfermaEliminazione();
});

function setupMenuEventListeners() {
    $(document).on('click', '#menuOverlay', function (e) {
        if (e.target === this) {
            $(this).hide();
        }
    });

    $(document).on('click', '.azioni', function (e) {
        e.preventDefault();

        var postContainer = $(this).closest('.container-template-blog, .container-template-sondaggio');

        if (postContainer.length === 0) {
            console.error("Errore: non è stato trovato il container per il post o il sondaggio.");
            return;
        }

        var postId = postContainer.data('post-id') || postContainer.data('sondaggio-id');
        var isAuthor = isTrue(postContainer.data('is-author'));
        var blogId = postContainer.data('blog-id');
        var isSondaggio = postContainer.hasClass('container-template-sondaggio');

        if (isSondaggio) {
            showSondaggioMenu(postId, isAuthor, blogId);
        } else {
            var isFollowing = checkIfFollowingSync(blogId);
            var isSaved = checkIfSavedSync(postId);
            showPostMenu(postId, isAuthor, isFollowing, isSaved, blogId);
        }
    });

    $(document).on('click', '.bottone-vota', function (e) {
        e.preventDefault();
        // Polls are a simplified mock — just show a message
        setSuccessMessage('Voto registrato con successo!');
    });
}

function displaySondaggioResults(sondaggioContainer, opzioni, opzioneSelezionata) {
    sondaggioContainer.find('.bottone-vota')
        .prop('disabled', true)
        .html('<i class="fas fa-vote-yea" style="margin-right: 5px;"></i>Hai già votato');

    sondaggioContainer.find('.opzione').each(function (index) {
        var opzioneTesto = $(this).find('label').text();
        var percentuale = 0;

        opzioni.forEach(function (opzione) {
            if (opzione.testo === opzioneTesto) {
                percentuale = opzione.percentuale;
            }
        });

        if (opzioneTesto === opzioneSelezionata) {
            $(this).css('background-color', '#d1e7dd');
        }

        $(this).find('input[type="radio"]').prop('disabled', true);

        var percentualeVotiElement = $(this).find('.percentuale-voti');
        if (percentualeVotiElement.length) {
            percentualeVotiElement.text(percentuale + '%');
        } else {
            $(this).append('<span class="percentuale-voti" style="margin-left: auto; padding-left: 10px;">' + percentuale + '%</span>');
        }
    });
}

$(document).on('click', '.opzione', function () {
    var radioButton = $(this).find('input[type="radio"]');
    if (!radioButton.is(':disabled')) {
        radioButton.prop('checked', true).trigger('change');
    }
});

function isTrue(value) {
    return value === true || value === "true" || value === 1 || value === "1";
}

function checkIfFollowingSync(blogId) {
    if (!window.mockDB || !window.mockDB.isUserLoggedIn()) return false;
    const db = window.mockDB.getDB();
    const user = window.mockDB.getCurrentUser();
    const blog = db.blogs.find(b => b.id === blogId);
    if (!blog || !blog.seguaci) return false;
    return blog.seguaci.includes(user.id);
}

function checkIfSavedSync(postId) {
    if (!window.mockDB || !window.mockDB.isUserLoggedIn()) return false;
    const db = window.mockDB.getDB();
    const user = window.mockDB.getCurrentUser();
    return (db.saved_posts || []).some(s => s.id_utente === user.id && s.id_post === postId);
}

// Legacy compatibility wrappers
function checkIfFollowing(blogId, callback) {
    callback(checkIfFollowingSync(blogId));
}

function checkIfSaved(postId, callback) {
    callback(checkIfSavedSync(postId));
}

function setupPostEventListeners() {
    $(document).on('click', '#bottoneModificaPost', showEditPostForm);
    $(document).on('click', '#bottoneCancellaPost', deleteContent);
    $(document).on('click', '#bottoneCancellaSondaggio', deleteContent);
    $(document).on('click', '#bottoneSalvaPost', toggleSavePost);
    $(document).on('click', '#bottoneRimuoviSalvato', toggleSavePost);
    $(document).on('click', '#savePostChanges', savePostChanges);
    $(document).on('click', '#cancelPostChanges', hideEditPostForm);
    $(document).on('click', '#bottoneNonSeguire', toggleFollow);
    $(document).on('click', '#bottoneBozze', pubblicaBozza);
}

function toggleFollow() {
    var blogId = $('#menuOverlay').data('blog-id');
    if (!window.mockDB || !window.mockDB.isUserLoggedIn()) return;

    const fullDb = window.mockDB.getDB();
    const user = window.mockDB.getCurrentUser();
    const blog = fullDb.blogs.find(b => b.id === blogId);
    if (!blog) return;

    if (!blog.seguaci) blog.seguaci = [];
    const index = blog.seguaci.indexOf(user.id);

    if (index > -1) {
        blog.seguaci.splice(index, 1);
        updateFollowButtons(blogId, false);
        setSuccessMessage('Hai smesso di seguire il blog!');
    } else {
        blog.seguaci.push(user.id);
        updateFollowButtons(blogId, true);
        setSuccessMessage('Hai iniziato a seguire il blog!');
    }

    window.mockDB.saveDB(fullDb);
    $('#menuOverlay').hide();
}

function updateFollowButtons(blogId, isFollowing) {
    $('button[data-blog-id="' + blogId + '"]').each(function () {
        var button = $(this);
        if (isFollowing) {
            button.find('.follow-text').text('Non Seguire');
            button.find('i').removeClass('fa-circle-check').addClass('fa-circle-xmark');
        } else {
            button.find('.follow-text').text('Segui');
            button.find('i').removeClass('fa-circle-xmark').addClass('fa-circle-check');
        }
    });

    $('#bottoneNonSeguire').html(isFollowing ? '<i class="fas fa-circle-xmark"></i><span>Smetti di seguire</span>' : '<i class="fa-circle-check"></i><span>Segui</span>');
}

function toggleSavePost() {
    var postId = $('#menuOverlay').data('post-id');
    if (!window.mockDB || !window.mockDB.isUserLoggedIn()) return;

    const fullDb = window.mockDB.getDB();
    const user = window.mockDB.getCurrentUser();
    if (!fullDb.saved_posts) fullDb.saved_posts = [];

    const existingIndex = fullDb.saved_posts.findIndex(s => s.id_utente === user.id && s.id_post === postId);

    if (existingIndex > -1) {
        // Unsave
        fullDb.saved_posts.splice(existingIndex, 1);
        $('#bottoneSalvaPost').html('<i class="fas fa-bookmark"></i><span>Salva</span>');
        $('#bottoneSalvaPost').data('is-saved', false);
        setSuccessMessage('Post rimosso dai preferiti!');
    } else {
        // Save
        fullDb.saved_posts.push({ id_utente: user.id, id_post: postId });
        $('#bottoneSalvaPost').html('<i class="fas fa-bookmark"></i><span>Rimuovi salvataggio</span>');
        $('#bottoneSalvaPost').data('is-saved', true);
        setSuccessMessage('Post salvato nei preferiti!');
    }

    window.mockDB.saveDB(fullDb);
    $('#menuOverlay').hide();
}

function pubblicaBozza() {
    var postId = $('#menuOverlay').data('post-id');
    if (!window.mockDB) return;

    const fullDb = window.mockDB.getDB();
    const post = fullDb.posts.find(p => p.id === postId);

    if (post) {
        post.bozza = 0;
        post.data_ora = new Date().toISOString();
        window.mockDB.saveDB(fullDb);
        setSuccessMessage('La bozza è stata pubblicata con successo!');
        window.location.href = 'blog.html?id=' + post.id_blog;
    } else {
        setErrorMessage('Bozza non trovata.');
    }
}

function createOverlayMenu() {
    const menuHTML = `
        <div class="overlay-menu" id="menuOverlay">
            <div class="menu">
                <div class="voce-menu" id="bottoneModificaPost">
                    <i class="fas fa-edit"></i>
                    <span>Modifica</span>
                </div>
                <div class="voce-menu" id="bottoneCancellaPost">
                    <i class="fas fa-trash-alt"></i>
                    <span>Elimina Post</span>
                </div>
                <div class="voce-menu" id="bottoneSalvaPost">
                    <i class="fas fa-bookmark"></i>
                    <span>Salva</span>
                </div>
                <div class="voce-menu" id="bottoneNonSeguire">
                    <i class="fas fa-circle-check"></i>
                    <span>Segui</span>
                </div>
                <div class="voce-menu" id="bottoneBozze">
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                    <span>Pubblica bozza</span>
                </div>
                <div class="voce-menu" id="bottoneCancellaSondaggio">
                    <i class="fas fa-trash-alt"></i>
                    <span>Elimina sondaggio</span>
                </div>
            </div>
        </div>
    `;

    $('body').append(menuHTML);
}

function createOverlayConfermaEliminazione() {
    const overlayHTML = `
        <div class="overlay" id="overlayConfermaEliminaPost">
            <div class="overlay-content">
                <h3><i class="fas fa-exclamation-triangle"></i> Attenzione</h3>
                <p>Sei sicuro di voler eliminare questo post?</p>
                <div class="bottoni-overlay">
                    <button id="confermaEliminaPost" class="bottone bottone-invia">Conferma</button>
                    <button id="annullaEliminaPost" class="bottone bottone-bozza">Annulla</button>
                </div>
            </div>
        </div>

        <div class="overlay" id="overlayConfermaEliminaSondaggio">
            <div class="overlay-content">
                <h3><i class="fas fa-exclamation-triangle"></i> Attenzione</h3>
                <p>Sei sicuro di voler eliminare questo sondaggio?</p>
                <div class="bottoni-overlay">
                    <button id="confermaEliminaSondaggio" class="bottone bottone-invia">Conferma</button>
                    <button id="annullaEliminaSondaggio" class="bottone bottone-bozza">Annulla</button>
                </div>
            </div>
        </div>
    `;
    $('body').append(overlayHTML);

    $('#overlayConfermaEliminaPost, #overlayConfermaEliminaSondaggio').on('click', function (e) {
        if (!$(e.target).closest('.overlay-content').length) {
            e.stopPropagation();
        }
    });
}

function showPostMenu(postId, isAuthor, isFollowing, isSaved, blogId) {
    $('#menuOverlay').data('post-id', postId);
    $('#menuOverlay').data('blog-id', blogId);

    $('#bottoneModificaPost, #bottoneCancellaPost, #bottoneSalvaPost, #bottoneNonSeguire, #bottoneBozze, #bottoneCancellaSondaggio').hide();

    const currentPage = getCurrentPage();

    if (currentPage === 'index.html' || currentPage === 'cerca.html' || currentPage === 'blog.html' || currentPage === 'salvati.html') {
        $('#bottoneSalvaPost').show();
        if (isSaved) {
            $('#bottoneSalvaPost').html('<i class="fas fa-bookmark"></i><span>Rimuovi salvataggio</span>');
            $('#bottoneSalvaPost').data('is-saved', true);
        } else {
            $('#bottoneSalvaPost').html('<i class="fas fa-bookmark"></i><span>Salva</span>');
            $('#bottoneSalvaPost').data('is-saved', false);
        }
        if (isAuthor || $('#menuOverlay').data('is-author') === "true") {
            $('#bottoneModificaPost, #bottoneCancellaPost').show();
        } else {
            $('#bottoneNonSeguire').show();
            $('#bottoneNonSeguire').html(isFollowing ? '<i class="fas fa-circle-xmark"></i><span>Smetti di seguire</span>' : '<i class="fas fa-circle-check"></i><span>Segui</span>');
        }
    } else if (currentPage === 'bozze.html') {
        $('#bottoneModificaPost, #bottoneCancellaPost, #bottoneBozze').show();
    }

    $('#menuOverlay').show();
}

function showSondaggioMenu(sondaggioId, isAuthor, blogId) {
    $('#menuOverlay').data('sondaggio-id', sondaggioId);
    $('#menuOverlay').data('blog-id', blogId);

    $('#bottoneModificaPost, #bottoneCancellaPost, #bottoneSalvaPost, #bottoneBozze, #bottoneCancellaSondaggio, #bottoneNonSeguire').hide();

    if (isAuthor || $('#menuOverlay').data('is-author') === "true") {
        $('#bottoneCancellaSondaggio').show();
    } else {
        var isFollowing = checkIfFollowingSync(blogId);
        if (!isAuthor) {
            $('#bottoneNonSeguire').show();
            $('#bottoneNonSeguire').html(isFollowing ? '<i class="fas fa-circle-xmark"></i><span>Smetti di seguire</span>' : '<i class="fas fa-circle-check"></i><span>Segui</span>');
        }
    }

    $('#menuOverlay').show();
}

function deleteContent() {
    var postId = $('#menuOverlay').data('post-id');
    var sondaggioId = $('#menuOverlay').data('sondaggio-id');
    var isSondaggio = $(this).attr('id') === 'bottoneCancellaSondaggio';

    if (isSondaggio && sondaggioId !== undefined) {
        showDeleteSondaggioOverlay(sondaggioId);
    } else if (postId !== undefined) {
        showDeletePostOverlay(postId);
    }
}

function showDeletePostOverlay(postId) {
    $('#overlayConfermaEliminaPost').data('post-id', postId).addClass('active');
}
function hideDeletePostOverlay() {
    $('#overlayConfermaEliminaPost').removeClass('active');
}
function showDeleteSondaggioOverlay(sondaggioId) {
    $('#overlayConfermaEliminaSondaggio').data('sondaggio-id', sondaggioId).addClass('active');
}
function hideDeleteSondaggioOverlay() {
    $('#overlayConfermaEliminaSondaggio').removeClass('active');
}

$(document).on('click', '#confermaEliminaPost', function () {
    var postId = $('#overlayConfermaEliminaPost').data('post-id');
    if (!window.mockDB) return;

    const fullDb = window.mockDB.getDB();
    fullDb.posts = fullDb.posts.filter(p => p.id !== postId);
    fullDb.comments = (fullDb.comments || []).filter(c => c.id_post !== postId);
    window.mockDB.saveDB(fullDb);

    $('div[data-post-id="' + postId + '"]').fadeOut(300, function () {
        $(this).remove();
    });
    hideDeletePostOverlay();
    $('#menuOverlay').hide();
    setSuccessMessage('Post eliminato con successo!');
});

$(document).on('click', '#annullaEliminaPost', function () {
    hideDeletePostOverlay();
});

$(document).on('click', '#confermaEliminaSondaggio', function () {
    var sondaggioId = $('#overlayConfermaEliminaSondaggio').data('sondaggio-id');
    // Mock: just remove from DOM
    $('div[data-sondaggio-id="' + sondaggioId + '"]').fadeOut(300, function () {
        $(this).remove();
    });
    hideDeleteSondaggioOverlay();
    $('#menuOverlay').hide();
    setSuccessMessage('Sondaggio eliminato con successo!');
});

$(document).on('click', '#annullaEliminaSondaggio', function () {
    hideDeleteSondaggioOverlay();
});

function getCurrentPage() {
    return window.location.pathname.split("/").pop();
}

function showEditPostForm() {
    var postId = $('#menuOverlay').data('post-id');
    var postText = $('div[data-post-id="' + postId + '"] .testo-post').text();
    var postTitle = $('div[data-post-id="' + postId + '"] .titolo-post').text();

    $('#editPostTitle').val(postTitle);
    $('#editPostText').val(postText);
    $('#overlayMenuPost').data('post-id', postId).show();
    $('#menuOverlay').hide();
}

function savePostChanges() {
    var postId = $('#overlayMenuPost').data('post-id');
    var newPostTitle = $('#editPostTitle').val();
    var newPostText = $('#editPostText').val();

    if (!window.mockDB) return;

    const fullDb = window.mockDB.getDB();
    const post = fullDb.posts.find(p => p.id === postId);

    if (post) {
        post.titolo = newPostTitle;
        post.testo = newPostText;
        window.mockDB.saveDB(fullDb);

        $('div[data-post-id="' + postId + '"] .titolo-post').text(newPostTitle);
        $('div[data-post-id="' + postId + '"] .testo-post').text(newPostText);

        var dataElement = $('div[data-post-id="' + postId + '"] .data_contenuto');
        var currentDateText = dataElement.text().replace(/ \(modificato\)$/, '');
        dataElement.text(currentDateText + ' (modificato)');

        $('#overlayMenuPost').hide();
        setSuccessMessage('Post modificato con successo!');
    } else {
        setErrorMessage('Post non trovato.');
    }
}

function hideEditPostForm() {
    $('#overlayMenuPost').hide();
}

function setSuccessMessage(message) {
    mostraMessaggio(message, 'successo');
}

function setErrorMessage(message) {
    mostraMessaggio(message, 'errore');
}
