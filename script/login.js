import * as userjs from './user.js';
import * as cookiejs from './cookies.js';

let username = cookiejs.getCookie('username');
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

function getUserInfo(user) {
	const userCookie = user;
	delete userCookie.password;
	//!uraditi
	//!preimenovati funkciju getuserinfo npr
	return JSON.stringify(userCookie);
}

function createCookie(user) {
	let username = document.getElementById('username').value;
	let cookieName = 'username';

	let cookieNameValue = username;

	const days = 7;
	const remember = document.getElementById('remember').checked;
	if (remember) {
		cookiejs.rememberMeCookie(cookieName, cookieNameValue, days);
		cookiejs.rememberMeCookie('user info', getUserInfo(user), days);
	} else {
		cookiejs.setCookie(cookieName, cookieNameValue);
		cookiejs.setCookie('user info', getUserInfo(user));
	}
}
//!treba da bude jedan cookie
