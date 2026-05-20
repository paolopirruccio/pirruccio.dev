$(document).ready(function () {
    function setActiveNavLink() {
        $(".navbar-nav .nav-link").removeClass("active");
        let path = window.location.pathname.split("/").pop(); // Ottiene solo il nome del file

        if (path === "index.html") {
            $('a[href="index.html"]').addClass("active");
        } else if (path === "cerca.html") {
            $('a[href="cerca.html"]').addClass("active");
        } else if (path === "esplora_blog.html" || path === "blog.html") {
            $('a[href="esplora_blog.html"]').addClass("active");
        } else {
            $("#openMenu").addClass("active");
        }

        $('.menu-list li').removeClass('active');
        $('.menu-list li a').each(function () {
            if ($(this).attr('href') === path) {
                $(this).parent().addClass('active');
            }
        });
    }

    setActiveNavLink();  // Imposta la voce attiva del menu al caricamento della pagina

    $("#openMenu").click(function () {
        if ($("#slideMenu").width() === 0) {
            $("#slideMenu").css("width", "250px");
            $("#slideMenuOverlay").css("display", "block").css("opacity", "1");
            $(".navbar-nav .nav-link").removeClass("active");
            $(this).addClass("active");  // Attiva la voce "Altro"
        } else {
            $("#slideMenu").css("width", "0");
            $("#slideMenuOverlay").css("opacity", "0").one('transitionend', function () {
                $(this).css("display", "none");
            });
            $("#openMenu").removeClass("active");
            setActiveNavLink();  // Reimposta la voce attiva in base alla pagina corrente
        }
    });

    $("#closeMenu").click(function () {
        $("#slideMenu").css("width", "0");
        $("#slideMenuOverlay").css("opacity", "0").one('transitionend', function () {
            $(this).css("display", "none");
        });
        $("#openMenu").removeClass("active");
        setActiveNavLink();  // Reimposta la voce attiva in base alla pagina corrente
    });

    $("#closeMenu").hover(function () {
        $(this).css("transform", "rotate(90deg)");
    }, function () {
        $(this).css("transform", "rotate(0deg)");
    });

    $("#slideMenu").click(function (event) {
        event.stopPropagation();
    });

    $("#slideMenuOverlay").click(function () {
        $("#slideMenu").css("width", "0");
        $("#slideMenuOverlay").css("opacity", "0").one('transitionend', function () {
            $(this).css("display", "none");
        });
        $("#openMenu").removeClass("active");
        setActiveNavLink();
    });
});
