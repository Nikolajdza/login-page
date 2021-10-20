'use strict';

let username = getCookie('username');
if (username) {
	location.href = 'homepage.html';
}

async function getUsers() {
	const response = await fetch('../users.json');
	const data = await response.json();
	return data;
}

async function checkUser() {
	let data = await getUsers();
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;

	let user = data.find((user) => user.username === username);
	const userErr = document.getElementById('user-error');
	const passwordErr = document.getElementById('password-error');
	if (user) {
		userErr.textContent = '';
		if (user.password === password) {
			return user;
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
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
	e.preventDefault();
	const user = await checkUser();
	if (user) {
		createCookie(user);
		location.href = 'homepage.html';
	}
});

function setCookie(cname, cvalue) {
	document.cookie = `${cname}=${cvalue}`;
}

function cookieExpiration(days) {
	let today = new Date();
	let expire = new Date();
	expire.setTime(today.getTime() + 3600000 * 24 * days);
	return expire;
}

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
		rememberMeCookie(cookieName, cookieNameValue, days);
		rememberMeCookie(cookiePassword, cookiePasswordValue, days);
		rememberMeCookie('user info', JSON.stringify(user), days);
	} else {
		setCookie(cookieName, cookieNameValue);
		setCookie(cookiePassword, cookiePasswordValue);
		setCookie('user info', JSON.stringify(user));
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
