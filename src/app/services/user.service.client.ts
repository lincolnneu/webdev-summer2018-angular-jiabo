// user service on the client. Mirror image of what lives in the server
// generate http request, waiting for http request, send a http request that one's going to send back a response.
export class UserServiceClient{
  createUser(username, password){
    const user = {
      username: username,
      password: password
    };
    return fetch('http://localhost:4000/api/user',{ //fetch returns a promise
      body: JSON.stringify(user),
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
