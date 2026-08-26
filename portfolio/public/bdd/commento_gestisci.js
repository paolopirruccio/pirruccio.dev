/**
 * commento_gestisci.js
 * LocalStorage powered Comment management logic.
 */

// ── HTML Escape Utility ──
function escapeHtmlBdd(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

$(document).ready(function () {
    setupCommentEventListeners();
});

function setupCommentEventListeners() {
    $(document).on('click', '.bottone-commenta', toggleComments);
    $(document).on('click', '.invia-commento', submitComment);
}

function toggleComments() {
    var commentSection = $(this).closest('.contenuto-container-template-blog').find('.sezione-commenti');

    if (commentSection.is(':visible')) {
        commentSection.hide();
    } else {
        commentSection.show();
        var postId = parseInt($(this).data('post-id'));
        loadComments(postId, commentSection);
    }
}

function loadComments(postId, commentSection) {
    if (!window.mockDB) return;
    const fullDb = window.mockDB.getDB();
    const postComments = (fullDb.comments || []).filter(c => c.id_post === postId);

    let commentsHTML = '';

    if (postComments.length === 0) {
        commentsHTML = '<p style="text-align: center; color: #888; font-size: 14px;">Nessun commento. Sii il primo!</p>';
    } else {
        postComments.forEach(comment => {
            const author = fullDb.users.find(u => u.id === comment.id_autore);
            const authorName = author ? author.username : 'Anonimo';
            commentsHTML += `
                <div class="commento">
                    <span class="nome-commentatore">@${escapeHtmlBdd(authorName)}</span>
                    <p class="testo-commento">${escapeHtmlBdd(comment.testo)}</p>
                </div>
            `;
        });
    }

    commentSection.find('.commenti-esistenti').html(commentsHTML);
    commentSection.slideDown();
}

function submitComment() {
    if (!window.mockDB || !window.mockDB.isUserLoggedIn()) {
        mostraMessaggio('Devi effettuare l\'accesso per commentare.', 'info');
        return;
    }

    var postId = parseInt($(this).data('post-id'));
    var commentSection = $(this).closest('.sezione-commenti');
    var commentText = commentSection.find('textarea').val();
    var currentUser = window.mockDB.getCurrentUser();

    if (commentText.trim() !== '') {
        const fullDb = window.mockDB.getDB();
        if (!fullDb.comments) fullDb.comments = [];

        const newComment = {
            id: fullDb.comments.length > 0 ? Math.max(...fullDb.comments.map(c => c.id)) + 1 : 1,
            id_post: postId,
            id_autore: currentUser.id,
            testo: commentText.trim(),
            data_ora: new Date().toISOString()
        };

        fullDb.comments.push(newComment);
        window.mockDB.saveDB(fullDb);

        // Append to view
        const newCommentHtml = `
            <div class="commento">
                <span class="nome-commentatore">@${escapeHtmlBdd(currentUser.username)}</span>
                <p class="testo-commento">${escapeHtmlBdd(commentText)}</p>
            </div>
        `;
        commentSection.find('.commenti-esistenti').append(newCommentHtml);
        commentSection.find('textarea').val('');

    } else {
        mostraMessaggio('Per favore, scrivi un commento.', 'info');
    }
}

