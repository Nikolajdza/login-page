import * as cookiejs from './cookies.js';

const username = cookiejs.getCookie('user info');

if (!username) {
	location.href = 'login.html';
}

const rememberMe = cookiejs.getCookie('remember me');

const userInfo = cookiejs.getCookie('user info');
const days = 7;

if (rememberMe === 'true') {
	cookiejs.setCookie('remember me', 'true', days);
	cookiejs.setCookie('user info', userInfo, days);
}

const user = JSON.parse(cookiejs.getCookie('user info'));

const msg = document.getElementById('hello-user');
msg.textContent = `Welcome ${user.name}`;

const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', (e) => {
	e.preventDefault();

	cookiejs.removeCookie('username');
	cookiejs.removeCookie('remember me');
	cookiejs.removeCookie('user info');
	location.href = 'login.html';
});
