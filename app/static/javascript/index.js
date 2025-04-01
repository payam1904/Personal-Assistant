document.addEventListener('DOMContentLoaded', function () {
    // Replace your current form submit listener with the following:
    const form = document.querySelector('.profile-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            // Force each input field to trigger its blur event so that validation fires.
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => input.dispatchEvent(new Event('blur')));

            // Now check if any field has the error class.
            const errorElements = form.querySelectorAll('.error');
            if (errorElements.length > 0) {
                e.preventDefault();
                alert('Please correct all errors before submitting the form.');
            }
        });
    }

    const featureBodies = document.querySelectorAll('.feature-body-content');

    function adjustWidths() {
        let maxWidth = 0;
    
        if (window.innerWidth >= 900) {
            featureBodies.forEach(function (element) {
                const elementWidth = element.offsetWidth;
                if (elementWidth > maxWidth) {
                    maxWidth = elementWidth;
                }
            });
    
            featureBodies.forEach(function (element) {
                element.style.width = maxWidth + 'px';
            });
        } else if (window.innerWidth < 900 && window.innerWidth >= 600) {
            featureBodies.forEach(function (element) {
                element.style.width = 'fit-content' in document.body.style ? 'fit-content' : 'auto';
            });
        } else {
            // Reset width for screens smaller than 600px
            featureBodies.forEach(function (element) {
                element.style.width = '100%'; // Removes inline style to allow CSS to take over
            });
        }
    }
    
    adjustWidths();
    window.addEventListener('resize', adjustWidths);
    
    // featureBodies.forEach(function (element) {
    //     const elementWidth = element.offsetWidth;
    //     if (elementWidth > maxWidth) {
    //         maxWidth = elementWidth;
    //     }
    // });
    // featureBodies.forEach(function (element) {
    //     element.style.width = maxWidth + 'px';
    // });
    
    const validNamePattern = /^[a-zA-Z\s]+$/;
    const validPhonePattern = /^(\+|0)\d{6,14}$/;
    const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    const validDateOfBirth = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    function addValidation(inputId, pattern) {
        const inputField = document.getElementById(inputId);
        if (inputField) {
            inputField.addEventListener('input', function () {
                const value = inputField.value.trim();
                if (value === '') {
                    inputField.classList.remove('error');
                }
            });
            inputField.addEventListener('blur', function () {
                const value = inputField.value.trim();
                if (!pattern.test(value) && value !== '') {
                    inputField.classList.add('error');
                } else {
                    inputField.classList.remove('error');
                }
            });
        }
    }

    function addDateValidation(inputId, pattern) {
        const inputField = document.getElementById(inputId);
        if (inputField) {
            inputField.addEventListener('input', function () {
                const value = inputField.value.trim();
                if (value === '') {
                    inputField.classList.remove('error');
                    return;
                }
            });
            inputField.addEventListener('blur', function () {
                const value = inputField.value.trim();
                if (!pattern.test(value)) {
                    inputField.classList.add('error');
                    return;
                }
                const birthDate = new Date(value);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (age > 80 || birthDate > today) {
                    inputField.classList.add('error');
                } else {
                    inputField.classList.remove('error');
                }
            });
        }
    }

    addDateValidation('date_of_birth-input', validDateOfBirth);
    addValidation('first_name-input', validNamePattern);
    addValidation('last_name-input', validNamePattern);
    addValidation('email-input', validEmailPattern);
    addValidation('phone_number-input', validPhonePattern);

    const passwordField = document.getElementById('password-input');
    const confirmPasswordField = document.getElementById('confirm_password-input');
    const passwordValidationList = document.getElementById('password-validation-list');

    if (passwordField) {
        passwordField.addEventListener('focus', function () {
            passwordValidationList.style.display = 'block';
        });
    }

    if (passwordField) {
        passwordField.addEventListener('input', function () {
            const passValue = passwordField.value;

            const criteria1 = document.getElementById('password-validation-list-item-1');
            const criteria2 = document.getElementById('password-validation-list-item-2');
            const criteria3 = document.getElementById('password-validation-list-item-3');
            const criteria4 = document.getElementById('password-validation-list-item-4');
            const criteria5 = document.getElementById('password-validation-list-item-5');

            if (criteria1) {
                if (passValue.length >= 8) {
                    criteria1.classList.add('valid');
                } else {
                    criteria1.classList.remove('valid');
                }
            }
            if (criteria2) {
                if (/[A-Z]/.test(passValue)) {
                    criteria2.classList.add('valid');
                } else {
                    criteria2.classList.remove('valid');
                }
            }
            if (criteria3) {
                if (/[a-z]/.test(passValue)) {
                    criteria3.classList.add('valid');
                } else {
                    criteria3.classList.remove('valid');
                }
            }
            if (criteria4) {
                if (/\d/.test(passValue)) {
                    criteria4.classList.add('valid');
                } else {
                    criteria4.classList.remove('valid');
                }
            }
            if (criteria5) {
                if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passValue)) {
                    criteria5.classList.add('valid');
                } else {
                    criteria5.classList.remove('valid');
                }
            }
        });
    }

    const passwordConfirmationElem = document.getElementById('password-confirmation-match');
    if (passwordConfirmationElem) {
        passwordConfirmationElem.style.display = 'none';
    }

    function validatePasswordMatch() {
        const passwordVal = passwordField.value;
        const confirmVal = confirmPasswordField.value;
        if (passwordVal.length > 0 && confirmVal.length > 0) {
            if (passwordVal !== confirmVal) {
                passwordConfirmationElem.style.display = 'block';
                passwordConfirmationElem.classList.add('password-match-error');
            } else {
                passwordConfirmationElem.style.display = 'none';
                passwordConfirmationElem.classList.remove('password-match-error');
            }
        } else {
            passwordConfirmationElem.style.display = 'none';
            passwordConfirmationElem.classList.remove('password-match-error');
        }
    }
    if (passwordField) {
        passwordField.addEventListener('input', validatePasswordMatch);
    }
    if (confirmPasswordField) {
        confirmPasswordField.addEventListener('input', validatePasswordMatch);
    }

    // Flash message control with slide down and slide up
    const flashMessages = document.querySelectorAll('.flash');
    flashMessages.forEach(flashMessage => {
        flashMessage.style.display = 'none'; 
        $(flashMessage).slideDown(500);
        setTimeout(() => {
            $(flashMessage).slideUp(500, () => flashMessage.remove());
        }, 3000);
    });
    // End of flash message control
});