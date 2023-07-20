import throttle from 'lodash.throttle';


const form = document.querySelector('.feedback-form');


const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');


const saveFormState = () => {
    const formState = {
        email: emailInput.value,
        message: messageInput.value,
    };

    localStorage.setItem('feedback-form-state', JSON.stringify(formState));
};


const inputHandler = throttle(saveFormState, 500);

emailInput.addEventListener('input', inputHandler);
messageInput.addEventListener('input', inputHandler);


window.addEventListener('DOMContentLoaded', () => {
    const savedFormState = localStorage.getItem('feedback-form-state');

    if (savedFormState) {
        const { email, message } = JSON.parse(savedFormState);
        emailInput.value = email;
        messageInput.value = message;
    }
});


form.addEventListener('submit', (event) => {
    event.preventDefault();

    localStorage.removeItem('feedback-form-state');

    const emailValue = emailInput.value;
    const messageValue = messageInput.value;

    emailInput.value = '';
    messageInput.value = '';

    console.log({ email: emailValue, message: messageValue });
});