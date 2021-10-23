import * as userjs from './user.js';
import * as cookiejs from './cookies.js';

const username = cookiejs.getCookie('username');
if (username) {
	location.href = 'homepage.html';
}

function displayError() {
	const userErr = document.getElementById('user-error');
	userErr.style.visibility = 'visible';
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
	e.preventDefault();
	const user = await userjs.checkUser();
	if (!user) {
		displayError();
	} else {
		createCookie(user);
		location.href = 'homepage.html';
	}
});

function getUserInfo({ username, name, email }) {
	return JSON.stringify({ username, name, email });
}

function createCookie(user) {
	let username = document.getElementById('username').value;

	const days = 7;
	const remember = document.getElementById('remember').checked;

	cookiejs.setCookie('username', username, remember ? days : 0);
	cookiejs.setCookie('remember me', remember, remember ? days : 0);
	cookiejs.setCookie('user info', getUserInfo(user), remember ? days : 0);
}
