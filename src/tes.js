const axios = require('axios');

function editDataById(id, updatedData) {
  axios.put(`https://api-eeksapi-eeksapi.vercel.app/api/data/${id}`, updatedData)
    .then(response => {
      console.log(response.data.message); // Response message from the API
    })
    .catch(error => {
      console.error(error);
    });
}

const updatedData = {
  name: 'Updated Name',
  age: 25,
  username: 'new_username',
  password: 'new_password',
};

editDataById(1, updatedData);