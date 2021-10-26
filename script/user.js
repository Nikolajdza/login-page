export async function getUsers() {
	const response = await fetch('../users.json');
	const data = await response.json();
	return data;
}

export async function checkUser(username, password) {
	let data = await getUsers();
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
