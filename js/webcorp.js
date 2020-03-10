var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else if (n == (x.length - 1)) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Ir para o site";

    } else {
        document.getElementById("nextBtn").innerHTML = "Proximo";
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}

//Para produção


$("document").ready(function () {

    $("#phone").mask("(00) 00000-0000");
});
$("form").on("submit", function (event) {
    event.preventDefault();

    if (!validaForm()) {

        return false;
    }

    $.ajax({
        url: "/webcorp",
        type: 'POST',
        dataType: 'JSON',
        data: {
            name: $("#name").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            login: $("#login").val(),
            password: $("#password").val(),
        },
        success: (data) => {
            if (data.success) {

                location.href = data.link;
            }
            else {

                swal("Atenção!\nCorrija os dados do formulário.");

                data.errors.forEach(function (a) {
                    let campo = Object.keys(a);
                    let valor = Object.values(a);

                    setErro(campo, valor);
                });
            };
        }
    });
});

$("form").on("change", "input", function (event) {

    if ($(this).hasClass('fail')) {

        $(this).removeClass('fail');
        let campo = $(this).attr("name");
        let valor = $("label[for='" + campo + "']").attr("value");
        $("label[for='" + campo + "']").text(valor);
    }
});

function onReCaptchaSuccess() {

    $("#recaptcha").removeClass("fail").text("");
}

function validaForm() {

    let name = $("#name").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let login = $("#login").val();
    let password = $("#password").val();
    // let recaptcha = grecaptcha.getResponse();

    let isValid = true;

    if (name == "") {

        isValid = setErro("name", "Nome em branco");
    }

    if (email == "") {

        isValid = setErro("email", "E-Mail em branco");
    }
    else if (!validateEmail(email)) {

        isValid = setErro("email", "E-Mail em formato inválido");
    }

    if (phone == "") {

        isValid = setErro("phone", "Telefone em branco");
    }
    else if (!validatePhone(phone)) {

        isValid = setErro("phone", "Telefone formato inválido");
    }

    if (login == "") {

        isValid = setErro("login", "Login em branco");
    }
    else if (!validateSpecialCharacters(login)) {

        isValid = setErro("login", "Login não pode ter caracteres especiais");
    }
    else if (login.length > 15) {

        isValid = setErro("login", "Login não pode ter mais do que 15 caracteres");
    }

    if (password == "") {

        isValid = setErro("password", "Senha em branco");
    }
    if (confirmpass == "") {

        isValid = setErro("confirmpass", "Confirme Senha em branco");
    }

    // {% if isProduction == 1 %}
    // if (recaptcha == "") {

    //     isValid = setErro("recaptcha", "Por favor confirme que você é um humano.");
    // }
    // {% endif %}

    if (!isValid) {

        swal("Atenção!\nCorrija os dados do formulário.");
    }

    return isValid;
}

function setErro(campo, valor) {

    if (campo == "recaptcha") {

        $("#" + campo).addClass('fail').text(valor);
    }
    else {

        $("#" + campo).addClass('fail');
        let texto = $("label[for='" + campo + "']").text();
        $("label[for='" + campo + "']").text(valor);
    }

    return false;
}

function validateEmail(email) {

    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePhone(phone) {

    var re = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    return re.test(phone);
}

function validateSpecialCharacters(text) {
    var re = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return re.test(text);
}