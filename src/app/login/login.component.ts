import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserServiceClient } from '../services/user.service.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn = false;
  username;
  password;
  login(username, password){
    this.service.login(username, password)
      .then((res) => {
        // validation if null 0 will not
        if(res != null){
          this.router.navigate(['profile']);
        } else {
          alert('Wrong user name or password. Please try again!');
        }
      });

  }

  logout() { // hey server, destroy my session
    this.service
      .logout()
      .then(() => location.reload());

  }

  constructor(private router: Router, private service: UserServiceClient) { }

  ngOnInit() {
    this.service
      .profile()
      .then(res => {
        if (res.status !== 403) {
          this.loggedIn = true;
        }});
  }

}
