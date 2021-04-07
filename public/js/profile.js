const searchFormHandler = async (event) => {
  event.preventDefault();

  const search = document.querySelector('#search').value.trim();
  console.log(search);

  //   if (username && password) {
  //     const response = await fetch('/api/users/login', {
  //       method: 'POST',
  //       body: JSON.stringify({ username, password }),
  //       headers: { 'Content-Type': 'application/json' },
  //     });

  //     if (response.ok) {
  //       document.location.replace('/chat');
  //     } else {
  //       alert('Failed to log in');
  //     }
  //   }
};

document
  .querySelector('#search-btn')
  .addEventListener('click', searchFormHandler);
