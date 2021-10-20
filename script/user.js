export async function getUsers() {
	const response = await fetch('../users.json');
	const data = await response.json();
	return data;
}

export async function checkUser() {
	let data = await getUsers();
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;

	let user = data.find((user) => user.username === username);

	if (user) {
		if (user.password === password) {
			return user;
		} else {
			return false;
		}
	} else {
		return false;
	}
}
