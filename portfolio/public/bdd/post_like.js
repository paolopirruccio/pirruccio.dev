/**
 * post_like.js
 * Handles adding/removing likes using the frontend mock database.
 */

$(document).ready(function () {
    $(document).on('click', '.bottone-mi-piace', function () {
        if (!window.mockDB || !window.mockDB.isUserLoggedIn()) {
            mostraMessaggio('Devi effettuare il login per mettere mi piace.', 'info');
            return;
        }

        var $button = $(this);
        var postId = parseInt($button.data('post-id'));
        var isLiked = $button.find('i').hasClass('fas');

        const fullDb = window.mockDB.getDB();
        const postIndex = fullDb.posts.findIndex(p => p.id === postId);

        if (postIndex === -1) {
            mostraMessaggio('Post non trovato.', 'errore');
            return;
        }

        var $likeIcon = $button.find('i');
        var $contatoreLike = $button.find('.contatore-like');
        var likeCount = parseInt($contatoreLike.text() || "0");

        if (!isLiked) {
            // Add Like
            fullDb.posts[postIndex].likes = (fullDb.posts[postIndex].likes || 0) + 1;
            $likeIcon.removeClass('far fa-heart').addClass('fas fa-heart liked');
            $contatoreLike.text(likeCount + 1);
        } else {
            // Remove Like
            fullDb.posts[postIndex].likes = Math.max(0, (fullDb.posts[postIndex].likes || 0) - 1);
            $likeIcon.removeClass('fas fa-heart liked').addClass('far fa-heart');
            $contatoreLike.text(likeCount - 1);
        }

        window.mockDB.saveDB(fullDb);

        $button.addClass('pulsazione');

        setTimeout(function () {
            $button.removeClass('pulsazione');
        }, 1000);

    });
});
