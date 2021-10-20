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

//wrong username or password srediti da bude jedna poruka
//izbaciti password iz cookie
