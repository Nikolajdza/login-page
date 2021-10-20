import * as userjs from './user.js';
import * as cookiejs from './cookies.js';

let username = cookiejs.getCookie('username');
if (username) {
	location.href = 'homepage.html';
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
	e.preventDefault();
	const user = await userjs.checkUser();
	if (user) {
		createCookie(user);
		location.href = 'homepage.html';
	}
});

function createCookie(user) {
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;
	let cookieName = 'username';
	let cookiePassword = 'password';
	let cookieNameValue = username;
	let cookiePasswordValue = password;
	const days = 7;
	const remember = document.getElementById('remember').checked;
	if (remember) {
		cookiejs.rememberMeCookie(cookieName, cookieNameValue, days);
		cookiejs.rememberMeCookie(cookiePassword, cookiePasswordValue, days);
		cookiejs.rememberMeCookie('user info', JSON.stringify(user), days);
	} else {
		cookiejs.setCookie(cookieName, cookieNameValue);
		cookiejs.setCookie(cookiePassword, cookiePasswordValue);
		cookiejs.setCookie('user info', JSON.stringify(user));
	}
}
