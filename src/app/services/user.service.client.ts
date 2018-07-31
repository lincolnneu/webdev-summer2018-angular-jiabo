import * as constants from '../constants';

// user service on the client. Mirror image of what lives in the server
// generate http request, waiting for http request, send a http request that one's going to send back a response.
export class UserServiceClient {
  HOST = constants.STUDENT_HOST;
  USER_API = this.HOST + '/api/user/';
  LOGIN_API = this.HOST + '/api/login';
  LOGOUT_API = this.HOST + '/api/logout';
  PROFILE_API = this.HOST + '/api/profile';
  REGISTER_API = this.HOST + '/api/register';

  // create the mirror image.
  findUserById(userId){
    return fetch(this.USER_API + userId)
      .then(response => response.json());
  }

  login(username, password){
    const credentials = {
      username : username,
      password: password
    };
    return fetch(this.LOGIN_API,{
      method: 'post',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  logout(){
    return fetch(this.LOGOUT_API,{
      method: 'post',
      credentials: 'include'
    });

  }

  // create another endpoint.
  profile(){
    return fetch(this.PROFILE_API,{
      credentials: 'include'
    })
      .then(res => res);
  }

  createUser(username, password){
    const user = {
      username: username,
      password: password
    };
    return fetch(this.REGISTER_API, { // fetch returns a promise
      body: JSON.stringify(user),
      credentials: 'include',
      method: 'post',
      headers: {
        'content-type': 'application/json'
      } // include the credentials to make sure each query participate in the same session.
      // force it to send cookies even if you are in different domains.
      // if in the same domain only works on the same origin
    })
      .then(response => response.json());
  }

  updateUser(user){
    return fetch(this.PROFILE_API, {
      body: JSON.stringify(user),
      credentials: 'include',
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());

  }

  deleteProfile(user){
    return fetch(this.PROFILE_API, {
      body: JSON.stringify(user),
      credentials: 'include',
      method: 'delete',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

}
