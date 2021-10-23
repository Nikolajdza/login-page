// export function setCookie(cname, cvalue) {
// 	document.cookie = `${cname}=${cvalue}`;
// }

export function getCookie(cookieName) {
	let cookie = document.cookie
		.split('; ')
		.find((name) => name.startsWith(cookieName + '='));
	if (cookie) {
		return cookie.split('=')[1];
	}
	return '';
}

export function cookieExpiration(days) {
	let today = new Date();
	let expire = new Date();
	expire.setTime(today.getTime() + 3600000 * 24 * days);
	return expire;
}

// export function rememberMeCookie(name, value, days) {
// 	document.cookie = `${name}=${value} ;expires=${cookieExpiration(
// 		days
// 	).toUTCString()}`;
// }

export function setCookie(name, value, days) {
	document.cookie = `${name}=${value}${
		days ? `;expires=${cookieExpiration(days).toUTCString()}` : ''
	}`;
}

export function removeCookie(name) {
	document.cookie = `${name}=; expires=${yesterday().toUTCString()}`;
}

export function yesterday() {
	const date = new Date();
	date.setDate(date.getDate() - 1);
	return date;
}
