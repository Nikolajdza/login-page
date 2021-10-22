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

function getUserInfo({ username, name, email }) {
	return JSON.stringify({ username, name, email });
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
//TODO treba da bude jedan cookie
//TODO ako se cekira remember me cookiju se pridruzuje expiration date
//TODO moze dase uradi ako se korisnik vrati u toku expiration date produziti mu cookie na taj period
//TODO ne moze da se dobije expiration date iz cookija, zahteva dva cookija
//TODO dodati jos jedan parametar expires parametar u create cookie koji ce biti pozvao ako je remember cekiran
//TODO srediti malo UI , iskoristiti i biblioteku za animacije
