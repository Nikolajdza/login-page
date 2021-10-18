'use strict';

let username = getCookie('username');
const msg = document.getElementById('hello-user');
msg.textContent = `Hello, ${username}`;
console.log(msg.textContent);

if (!username) {
	location.href = 'login.html';
}

const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', (e) => {
	e.preventDefault();

	removeCookie('username');
	removeCookie('password');
	removeCookie('remember me');
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
