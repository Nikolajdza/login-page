import * as cookiejs from './cookies.js';

let username = cookiejs.getCookie('username');

if (!username) {
	location.href = 'login.html';
}
const user = JSON.parse(cookiejs.getCookie('user info'));

const msg = document.getElementById('hello-user');
msg.textContent = `Welcome ${user.name}`;

const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', (e) => {
	e.preventDefault();

	cookiejs.removeCookie('username');
	cookiejs.removeCookie('user info');
	location.href = 'login.html';
});
