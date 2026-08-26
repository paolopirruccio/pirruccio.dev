$(document).ready(function () {
    createOverlayMenuCrea();
    setupCreaMenuEventListeners();
});

function createOverlayMenuCrea() {
    const menuHTML = `
        <div class="overlay-menu" id="overlayMenuCrea">
            <div class="menu">
                <a href="crea_blog.html" class="voce-menu">
                    <i class="fa-solid fa-layer-group"></i>
                    <span>Crea blog</span>
                </a>
                <a href="crea_post.html" class="voce-menu">
                    <i class="fas fa-feather"></i>
                    <span>Crea post</span>
                </a>
                <a href="crea_post.html" class="voce-menu">
                    <i class="fas fa-poll"></i>
                    <span>Crea sondaggio</span>
                </a>
                <a href="bozze.html" class="voce-menu">
                    <i class="fa-solid fa-eraser"></i>
                    <span>Rivedi bozze</span>
                </a>
            </div>
        </div>
    `;
    $('body').append(menuHTML);
}

function setupCreaMenuEventListeners() {
    $('#bottoneCrea').click(function (e) {
        e.stopPropagation();
        $('#overlayMenuCrea').fadeIn(300).addClass('active');
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('#overlayMenuCrea .menu').length && !$(e.target).is('#bottoneCrea')) {
            closeOverlayMenu();
        }
    });

    $('#overlayMenuCrea .voce-menu').click(function () {
        closeOverlayMenu();
    });
}

function closeOverlayMenu() {
    $('#overlayMenuCrea').fadeOut(300, function () {
        $(this).removeClass('active');
    });
}