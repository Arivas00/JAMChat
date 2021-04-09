const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#user-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const bio = document.querySelector('#bio').value.trim();

  if (username && password && bio) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password, bio }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
