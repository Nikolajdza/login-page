'use strict';

let username = getCookie('username');

if (!username) {
	location.href = 'login.html';
}
const user = JSON.parse(getCookie('user info'));

const msg = document.getElementById('hello-user');
msg.textContent = `Welcome ${user.name}`;

const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', (e) => {
	e.preventDefault();

	removeCookie('username');
	removeCookie('password');
	removeCookie('user info');
	location.href = 'login.html';
});

function getCookie(cookieName) {
	let cookie = document.cookie
		.split('; ')
		.find((name) => name.startsWith(cookieName + '='));
	if (cookie) {
		return cookie.split('=')[1];
	}
	return '';
}

console.log(getCookie('remember me'));

function yesterday() {
	const date = new Date();
	date.setDate(date.getDate() - 1);
	return date;
}

function removeCookie(name) {
	document.cookie = `${name}=; expires=${yesterday().toUTCString()}`;
}
