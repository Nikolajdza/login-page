'use strict';

const noPasswordForm = document.getElementById('nopassword-form');
noPasswordForm.addEventListener('submit', (e) => {
	e.preventDefault();

	if (validEmail()) {
		location.href = 'login.html';
	}
});

function validEmail() {
	const email = document.getElementById('email').value;
	const emailErr = document.getElementById('email-err');

	if (email === '') {
		emailErr.style.color = 'red';
		emailErr.textContent = 'Email is required!';
		return false;
	} else if (!email.includes('@')) {
		emailErr.style.color = 'red';
		emailErr.textContent = 'Email is not valid!';
		return false;
	} else {
		return true;
	}
}
