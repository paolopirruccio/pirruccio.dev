$(document).ready(function() {
    $("#formLogin").show();
    $("#formRegistrazione").hide();

    $(".pillola-filtro").click(function() {
        var isLogin = $(this).text().trim() === 'Login';
        
        $(".pillola-filtro").removeClass("attivo").addClass("inattivo");
        $(this).removeClass("inattivo").addClass("attivo");
        
        if (isLogin) {
            $("#formLogin").show();
            $("#formRegistrazione").hide();
        } else {
            $("#formLogin").hide();
            $("#formRegistrazione").show();
        }
    });

    $("#registerUsername, #registerEmail, #registerPassword, #registerConfermaPassword").on("keydown", function(e) {
        if (e.which === 32) {
            e.preventDefault();
        }
    });

    function togglePasswordVisibility() {
        $(".password-toggle").click(function() {
            const inputField = $(this).siblings("input");
            const type = inputField.attr("type");
            if (type === "password") {
                inputField.attr("type", "text");
                $(this).removeClass("fa-eye").addClass("fa-eye-slash");
            } else {
                inputField.attr("type", "password");
                $(this).removeClass("fa-eye-slash").addClass("fa-eye");
            }
        });
    }

    togglePasswordVisibility();

    function aggiornaContatore(idInput, idContatore) {
        const length = $(idInput).val().length;
        $(idContatore).text(length);
    }

    $("#registerNome").on("input", function() {
        $("#errorNome").text("");
        aggiornaContatore("#registerNome", "#contatoreCaratteriNome");
    });

    $("#registerCognome").on("input", function() {
        $("#errorCognome").text("");
        aggiornaContatore("#registerCognome", "#contatoreCaratteriCognome");
    });

    $("#registerBio").on("input", function() {
        $("#errorBio").text("");
        aggiornaContatore("#registerBio", "#contatoreCaratteriBio");
    });

    $("#registerUsername").on("input", function() {
        $("#errorUsername").text("");
        aggiornaContatore("#registerUsername", "#contatoreCaratteriUsername");
    });

    $("#registerEmail").on("input", function() {
        $("#errorEmail").text("");
        aggiornaContatore("#registerEmail", "#contatoreCaratteriEmail");
    });

    $("#registerPassword").on("input", function() {
        $("#errorPassword").text("");
        aggiornaContatore("#registerPassword", "#contatoreCaratteriPassword");
        $("#errorConfermaPassword").text("");
    });

    $("#registerConfermaPassword").on("input", function() {
        $("#errorConfermaPassword").text("");
        aggiornaContatore("#registerConfermaPassword", "#contatoreCaratteriConfermaPassword");
    });

    $("#formRegistrazione").on("submit", function(e) {
        e.preventDefault();

        const password = $("#registerPassword").val();
        const confermaPassword = $("#registerConfermaPassword").val();

        if (password !== confermaPassword) {
            $("#errorConfermaPassword").text("Le password non corrispondono.");
            return;
        }

        $.ajax({
            type: "POST",
            url: "registrazione.php",
            data: $(this).serialize(),
            dataType: "json",
            success: function(response) {
                $(".error-message").text("");

                if (response.success) {
                    window.location.href = "accesso.php";
                } else if (response.error) {
                    alert(response.error);
                } else {
                    if (response.errorNome) {
                        $("#errorNome").text(response.errorNome);
                    }
                    if (response.errorCognome) {
                        $("#errorCognome").text(response.errorCognome);
                    }
                    if (response.errorEmail) {
                        $("#errorEmail").text(response.errorEmail);
                    }
                    if (response.errorUsername) {
                        $("#errorUsername").text(response.errorUsername);
                    }
                    if (response.errorPassword) {
                        $("#errorPassword").text(response.errorPassword);
                    }
                    if (response.errorBio) {
                        $("#errorBio").text(response.errorBio);
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                alert("Si è verificato un errore. Riprova.");
            }
        });
    });
});
