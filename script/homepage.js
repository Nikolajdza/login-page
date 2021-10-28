import * as cookiejs from './cookies.js';
import { redirect } from './redirection.js';

const username = cookiejs.getCookie('user info');
const link = 'login.html';
if (!username) {
	redirect(link);
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
	redirect(link);
});
