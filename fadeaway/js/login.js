function goBack() {
    const from = new URLSearchParams(location.search).get('from');
    location.href = from === 'cart' ? 'cart.html' : 'index.html';
}

function checkLoginForm() {
    const username = $('#loginName');
    const password = $('#loginPassword');
    let isOk = true;

    if (username.val().trim().length < 3) {
        setFieldError(username, 'Username must have at least 3 characters.');
        isOk = false;
    } else {
        setFieldOk(username);
    }

    if (password.val().length < 6) {
        setFieldError(password, 'Password must have at least 6 characters.');
        isOk = false;
    } else {
        setFieldOk(password);
    }

    return isOk;
}

function checkRegisterForm() {
    const username = $('#registerName');
    const email = $('#registerEmail');
    const password = $('#registerPassword');
    const confirm = $('#registerConfirm');
    let isOk = true;

    if (username.val().trim().length < 3) {
        setFieldError(username, 'Username must have at least 3 characters.');
        isOk = false;
    } else {
        setFieldOk(username);
    }

    if (!isEmail(email.val().trim())) {
        setFieldError(email, 'Please enter a valid email, for example name@mail.com.');
        isOk = false;
    } else {
        setFieldOk(email);
    }

    if (password.val().length < 6) {
        setFieldError(password, 'Password must have at least 6 characters.');
        isOk = false;
    } else {
        setFieldOk(password);
    }

    if (confirm.val() === '' || confirm.val() !== password.val()) {
        setFieldError(confirm, 'Passwords do not match.');
        isOk = false;
    } else {
        setFieldOk(confirm);
    }

    return isOk;
}

function showFormFromLink() {
    const isRegister = location.hash === '#register';
    $('#registerBox').toggle(isRegister);
    $('#loginBox').toggle(!isRegister);
    $(window).scrollTop(0);
}

$(document).ready(function () {
    showFormFromLink();
    $(window).on('hashchange', showFormFromLink);

    $('#showRegister').click(function (event) {
        event.preventDefault();
        $('#loginBox').fadeOut(150, function () {
            $('#registerBox').fadeIn(200);
        });
    });

    $('#showLogin').click(function (event) {
        event.preventDefault();
        $('#registerBox').fadeOut(150, function () {
            $('#loginBox').fadeIn(200);
        });
    });

    $('#loginForm').on('submit', function (event) {
        event.preventDefault();

        if (checkLoginForm()) {
            localStorage.setItem(USER_KEY, $('#loginName').val().trim());
            goBack();
        }
    });

    $('#registerForm').on('submit', function (event) {
        event.preventDefault();

        if (checkRegisterForm()) {
            localStorage.setItem(USER_KEY, $('#registerName').val().trim());
            goBack();
        }
    });
});
