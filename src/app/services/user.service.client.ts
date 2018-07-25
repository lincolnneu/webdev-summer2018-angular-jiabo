// user service on the client. Mirror image of what lives in the server
// generate http request, waiting for http request, send a http request that one's going to send back a response.
export class UserServiceClient{

  // create the mirror image.
  findUserById(userId){
    return fetch('http://localhost:4000/api/user/' + userId)
      .then(response => response.json());
  }

  lougout(){
    return fetch('http://localhost:4000/api/logout',{
      method: 'post',
      credentials: 'include'
    });

  }

  // create another endpoint.
  profile(){
    return fetch('http://localhost:4000/api/profile',{
      credentials: 'include'
    })
      .then(response => response.json());
  }

  createUser(username, password){
    const user = {
      username: username,
      password: password
    };
    return fetch('http://localhost:4000/api/user',{ //fetch returns a promise
      body: JSON.stringify(user),
      credentials: 'include',
      method: 'post',
      headers: {
        'content-type': 'application/json'
      } // include the credentials to make sure each query participate in the same session.
      // force it to send cookies even if you are in different domains.
      // if in the same domain only works on the same origin
    });
  }
}
