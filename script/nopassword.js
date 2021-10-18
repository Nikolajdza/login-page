'use strict';

const noPasswordForm = document.getElementById('nopassword-form');
noPasswordForm.addEventListener('submit', (e) => {
	e.preventDefault();

	if (validationEmail()) {
		emailErr.style.color = 'red';
		emailErr.textContent = 'Wrong password!';
		return false;
	}

	location.href = 'login.html';
});

function validationEmail() {
	const email = document.getElementById('email').value;
	const emailErr = document.getElementById('email-err');

	if (email === '') {
		emailErr.style.color = 'red';
		emailErr.textContent = 'Email is required!';
		return true;
	} else if (!email.includes('@')) {
		emailErr.style.color = 'red';
		emailErr.textContent = 'Email is not valid!';
		return true;
	} else {
		return false;
	}
}
