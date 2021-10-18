'use strict';

let users = [
	{ username: 'nikola', password: '123' },
	{ username: 'branislav', password: '456' },
	{ username: 'aleksa', password: '333' },
	{ username: 'nenad', password: '333' },
];

function checkUser() {
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;
	let cookieName = 'username';
	let cookiePassword = 'password';
	let cookieNameValue = username;
	let cookiePasswordValue = password;
	const days = 7;
	let user = users.find((user) => user.username === username);
	const userErr = document.getElementById('user-error');
	const passwordErr = document.getElementById('password-error');
	if (user) {
		userErr.textContent = '';
		if (user.password === password) {
			createCookie(
				cookieName,
				cookieNameValue,
				days,
				cookiePassword,
				cookiePasswordValue
			);
			location.href = 'homepage.html';
		} else {
			passwordErr.style.color = 'red';
			passwordErr.textContent = 'Wrong password!';
			return false;
		}
	} else {
		userErr.style.color = 'red';
		userErr.textContent = 'User does not exist!';
		return false;
	}
	return true;
}

document.getElementById('login-form').addEventListener('submit', (e) => {
	e.preventDefault();
	checkUser();
});

let username = getCookie('username');
let password = getCookie('password');

if (username && password) {
	location.href = 'homepage.html';
}

let rememberedUsername = getCookie('remembered username');
let rememberedPassword = getCookie('remembered password');
if (rememberedUsername && rememberedPassword) {
	document.getElementById('username').value = rememberedUsername;
	document.getElementById('password').value = rememberedPassword;
}

if (username && password) {
	document.getElementById('username').value = username;
	document.getElementById('password').value = password;
}

function setCookie(cname, cvalue) {
	document.cookie = `${cname}=${cvalue}`;
}

function cookieExpiration(days) {
	let today = new Date();
	let expire = new Date();
	expire.setTime(today.getTime() + 3600000 * 24 * days);
	return expire;
}

function createCookie(
	cookieName,
	cookieNameValue,
	days,
	cookiePassword,
	cookiePasswordValue
) {
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;
	const remember = document.getElementById('remember').checked;
	if (remember) {
		rememberMeCookie(cookieName, cookieNameValue, days);
		rememberMeCookie(cookiePassword, cookiePasswordValue, days);
		rememberMeCookie('remember me', true, days);
		rememberMeCookie('remembered username', username, days);
		rememberMeCookie('remembered password', password, days);
	} else {
		removeCookie('remembered username');
		removeCookie('remembered password');
		setCookie(cookieName, cookieNameValue);
		setCookie(cookiePassword, cookiePasswordValue);
	}
}

function rememberMeCookie(name, value, days) {
	document.cookie = `${name}=${value} ;expires=${cookieExpiration(
		days
	).toUTCString()}`;
}

function getCookie(cookieName) {
	let cookie = document.cookie
		.split('; ')
		.find((name) => name.startsWith(cookieName + '='));
	if (cookie) {
		return cookie.split('=')[1];
	}
	return '';
}

function removeCookie(name) {
	document.cookie = `${name}=; expires=${yesterday().toUTCString()}`;
}

function yesterday() {
	const date = new Date();
	date.setDate(date.getDate() - 1);
	return date;
}
