function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch('/users/authenticate', requestOptions).then(response => {
    localStorage.setItem('user', response.json().username);
    return handleResponse(response);
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };
  return fetch('/users/register', requestOptions).then(response =>
    handleResponse(response)
  );
}

const handleResponse = response => {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
};

export const userService = {
  login,
  logout,
  register
};
