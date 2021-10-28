import * as userjs from './user.js';
import * as cookiejs from './cookies.js';

const username = cookiejs.getCookie('user info');
const link = 'homepage.html';
if (username) {
	cookiejs.redirect(link);
}

function displayError() {
	const userErr = document.getElementById('user-error');
	userErr.style.visibility = 'visible';
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
	e.preventDefault();

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	const user = await userjs.checkUser(username, password);
	if (!user) {
		displayError();
	} else {
		saveUserInfo(user);
		location.href = 'homepage.html';
	}
});

function getUserInfo({ username, name, email }) {
	return JSON.stringify({ username, name, email });
}

function saveUserInfo(user) {
	const days = 7;
	const remember = document.getElementById('remember').checked;

	cookiejs.setCookie('remember me', remember, remember ? days : 0);
	cookiejs.setCookie('user info', getUserInfo(user), remember ? days : 0);
}
