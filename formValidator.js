const name1 = document.getElementById('name')
const lastName1 = document.getElementById('lastName')
const phone1 = document.getElementById('number')
const mail1 = document.getElementById('mail')

const form = document.querySelector('#form')

const checkName = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const name = name1.value.trim();

    if (!isRequired(name)) {
        showError(name1, 'Imię nie może być puste.');
    } else if (!isBetween(name.length, min, max)) {
        showError(name1, `Imię powinno mieć pomiędzy ${min}, a ${max} znaków.`)
    } else {
        showSuccess(name1);
        valid = true;
    }
    return valid;
};

const check2Name = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const lastName = lastName1.value.trim();

    if (!isRequired(lastName)) {
        showError(lastName1, 'Nazwisko nie może być puste.');
    } else if (!isBetween(lastName.length, min, max)) {
        showError(lastName1, `Nazwisko powinno mieć pomiędzy ${min}, a ${max} znaków.`)
    } else {
        showSuccess(lastName1);
        valid = true;
    }
    return valid;
};

const checkNumber = () => {

    let valid = false;

    const dlugosc = 9;

    const phone = phone1.value.trim();

    if (!isRequired(phone)) {
        showError(phone1, 'Pole numer telefonu nie może być puste.');
    } else if (phone.length != dlugosc) {
        showError(phone1, `Numer telefonu powinien mieć ${dlugosc} znaków.`)
    } else {
        showSuccess(phone1);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = mail1.value.trim();
    if (!isRequired(email)) {
        showError(mail1, 'Pole e-mail nie może być puste.');
    } else if (!isEmailValid(email)) {
        showError(mail1, 'Adres e-mail nieprawidłowy.')
    } else {
        showSuccess(mail1);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkName();
    let isUser2nameValid = check2Name();
    let isEmailValid = checkEmail();
    let isPhoneValid = checkNumber()

    let isFormValid = isUsernameValid
    && isEmailValid && isUser2nameValid
    && isPhoneValid;
       
    // submit to the server if the form is valid
    if (isFormValid) {

    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkName();
            break;
        case 'lastName':
            check2Name();
            break;
        case 'mail':
            checkEmail();
            break;
        case 'number':
            checkNumber();
            break;
    }
}));