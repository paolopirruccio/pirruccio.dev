$(document).ready(function() {
    $(document).on('click', '.bottone-mostra-desc', function() {
        var postId = $(this).data('post-id');
        $('#alt-descrizione-overlay-' + postId).show();
    });

    $(document).on('click', '.close-btn', function() {
        $(this).closest('.overlay').hide();
    });

    $(document).on('click', '.overlay', function(e) {
        if (e.target == this) {
            $(this).hide();
        }
    });

    function posizionaPulsanteDesc() {
        $('.immagine-container').each(function() {
            var $container = $(this);
            var $img = $container.find('img');
            var $button = $container.find('.bottone-mostra-desc');
            
            $img.on('load', function() {
                var imgWidth = $img.width();
                var imgHeight = $img.height();
                
                $button.css({
                    'position': 'absolute',
                    'bottom': '10px',
                    'right': '10px'
                });
            });
        });
    }

    $(window).on('load resize', posizionaPulsanteDesc);

    $(document).ajaxComplete(function() {
        posizionaPulsanteDesc();
    });
});