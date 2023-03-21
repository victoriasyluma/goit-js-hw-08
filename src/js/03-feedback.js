import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
const LOCAL_KEY = 'feedback-form-state';

// restoring the data
let formData = { email: '', message: '' };

const previousDataJson = localStorage.getItem(LOCAL_KEY);

if (previousDataJson) {
  formData = JSON.parse(previousDataJson);
}

// fill the form with the form data
email.value = formData.email;
message.value = formData.message;

// store management
const throttleSetItem = throttle(() => {
  const itemToStore = JSON.stringify(formData);

  localStorage.setItem(LOCAL_KEY, itemToStore);
}, 500);

const partialUpdateFormData = (partialUpdate) => {
  formData = { ...formData, ...partialUpdate };

  throttleSetItem();
};

const onEmailInput = (event) => {
  const email = event.target.value;

  // update object
  partialUpdateFormData({ email });
};

const onTextareaInput = (event) => {
  const message = event.target.value;

  // update object
  partialUpdateFormData({ message });
};

const onFormSubmit = (event) => {
  event.preventDefault();

  console.log(formData);

  // clean form data
  event.target.reset();
  localStorage.removeItem(LOCAL_KEY);

  formData = { email: '', message: '' };
};

email.addEventListener('input', onEmailInput);
message.addEventListener('input', onTextareaInput);
form.addEventListener('submit', onFormSubmit);
