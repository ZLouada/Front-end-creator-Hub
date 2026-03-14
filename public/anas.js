async function fetchUsers() {
  const apiUrl = 'https://api-creators-hub.vercel.app/api/v1/users/all';

  const response = await fetch(apiUrl);
  const users = await response.json();

  return users;
}

fetchUsers()
  .then((users) => {
    console.log('List of users:', users);
  })
  .catch((error) => {
    console.error('Failed to retrieve users:', error);
  });