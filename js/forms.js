const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

function checkPasswords() {
    const same = confirmPassword.value === password.value;
    confirmPassword.setCustomValidity(same ? '' : 'Passwords do not match.');
}

function showValidation(form) {
    form.querySelectorAll('input, select, textarea').forEach((field) => {
        field.classList.toggle('is-valid', field.validity.valid);
        field.classList.toggle('is-invalid', !field.validity.valid);
    });
}

password.addEventListener('input', checkPasswords);
confirmPassword.addEventListener('input', checkPasswords);

['contactForm', 'registerForm'].forEach((id) => {
    const form = document.getElementById(id);
    const success = document.getElementById(id + 'Success');

    form.addEventListener('invalid', () => showValidation(form), true);

    form.addEventListener('input', () => {
        if (form.querySelector('.is-valid, .is-invalid')) showValidation(form);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.reset();
        success.classList.remove('d-none');
    });

    form.addEventListener('reset', () => {
        form.querySelectorAll('.is-valid, .is-invalid').forEach((field) => field.classList.remove('is-valid', 'is-invalid'));
        success.classList.add('d-none');
    });
});
