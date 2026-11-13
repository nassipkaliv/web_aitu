function goBack() {
    const from = new URLSearchParams(location.search).get('from');
    location.href = from === 'cart' ? 'cart.html' : 'index.html';
}

function checkLoginForm() {
    const results = [
        checkField($('#loginName'), $('#loginName').val().trim().length >= 3, 'Username must have at least 3 characters.'),
        checkField($('#loginPassword'), $('#loginPassword').val().length >= 6, 'Password must have at least 6 characters.')
    ];
    return !results.includes(false);
}

function checkRegisterForm() {
    const password = $('#registerPassword').val();
    const confirm = $('#registerConfirm').val();

    const results = [
        checkField($('#registerName'), $('#registerName').val().trim().length >= 3, 'Username must have at least 3 characters.'),
        checkField($('#registerEmail'), isEmail($('#registerEmail').val().trim()), 'Please enter a valid email, for example name@mail.com.'),
        checkField($('#registerPassword'), password.length >= 6, 'Password must have at least 6 characters.'),
        checkField($('#registerConfirm'), confirm !== '' && confirm === password, 'Passwords do not match.')
    ];
    return !results.includes(false);
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
        } else {
            showToast('Please check the fields marked in red.', 'error');
        }
    });

    $('#registerForm').on('submit', function (event) {
        event.preventDefault();

        if (checkRegisterForm()) {
            localStorage.setItem(USER_KEY, $('#registerName').val().trim());
            goBack();
        } else {
            showToast('Please check the fields marked in red.', 'error');
        }
    });
});
